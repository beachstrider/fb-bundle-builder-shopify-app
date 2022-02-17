import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import CardQuantities from '../../Cards/CardQuantities'
import {
  getContent,
  getSelectedBundle,
  getBundleByPlatformId,
  withActiveStep,
  getBundleConfiguration
} from '../../Hooks'
import {
  cartRemoveItem,
  cartAddItem,
  setIsNextButtonActive,
  displayFooter,
  cartClear
} from '../../../store/slices/rootSlice'
import styles from './Entrees.module.scss'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import Loading from '../Components/Loading'
import {
  cart,
  filterShopifyProducts,
  filterShopifyVariants,
  smoothScrollingToId,
  getConfigurationContent,
  getShortDate
} from '../../../utils'
import Toast from '../../Global/Toast'
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'
import { BUNDLE_MEAL_SECTION_TITLE } from '../../../constants/bundles'
import MostPopularBar from './MostPopularBar'
import TopTitle from '../Components/TopTitle'
dayjs.extend(weekday)
dayjs.extend(utc)

const STEP_ID = 4

const Entrees = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const cartUtility = cart(state)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingDefaults, setIsLoadingDefaults] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [defaultMenuItems, setDefaultMenuItems] = useState([])
  const [deliverBefore, setDeliverBefore] = useState('')
  const [deliverAfter, setDeliverAfter] = useState('')
  const [error, setError] = useState({
    open: false,
    status: 'Success',
    message: ''
  })
  // total and remaining items to add
  const [quantities, setQuantities] = useState([])
  const [quantitiesCountdown, setQuantitiesCountdown] = useState([])

  useEffect(() => {
    dispatch(setIsNextButtonActive(false))
    smoothScrollingToId('entreesTop')
    getCurrentMenuItems()
  }, [])

  useEffect(() => {
    if (
      state.cart.length > 0 &&
      quantitiesCountdown.length > 0 &&
      quantities.length > 0
    ) {
      let canActivateButton = false
      let qtyCounter = 0
      quantities.forEach((quantity) => {
        const cartTotal = cartUtility.sumQuantity(state, quantity.id)
        if (
          cartTotal === getQuantity(quantity.id)?.quantity &&
          getQuantityCountdown(quantity.id)?.quantity === 0
        ) {
          qtyCounter++
          canActivateButton = true
        } else {
          canActivateButton = false
        }
      })

      if (canActivateButton && qtyCounter === quantities.length) {
        dispatch(setIsNextButtonActive(true))
      } else {
        if (state.isNextButtonActive) {
          dispatch(setIsNextButtonActive(false))
        }
      }
    }
  }, [quantities, quantitiesCountdown])

  const getCurrentMenuItems = async () => {
    setIsLoading(true)

    try {
      const newItems = []
      const newQuantities = []
      const newQuantitiesCountdown = []

      // uses selected tag in the first step
      const shopifyProduct = getSelectedBundle(state.bundle.breakfast.tag)
      console.log('shopifyProduct', shopifyProduct)
      const { data } = await getBundleByPlatformId(
        state.tokens.guestToken,
        shopifyProduct.id
      )
      console.log('getBundleByPlatformId', shopifyProduct.id, data)
      if (data.data.length === 0) {
        throw new Error('Bundle could not be found')
      }

      const currentBundle = data.data[0]
      let defaultItems = []
      for (const configuration of currentBundle.configurations) {
        const addItem = (items) => menuItems.concat(items)
        const response = await getProducts(configuration, addItem)
        console.log('getProducts', response)
        newItems.push({
          id: configuration.id,
          title: configuration.title,
          products: [...response.products]
        })

        newQuantities.push({
          id: configuration.id,
          quantity: response.quantity
        })
        newQuantitiesCountdown.push({
          id: configuration.id,
          quantity: response.quantityCountdown,
          quantityTotal: response.quantity,
          quantitySummary: response.quantity - response.quantityCountdown
        })

        defaultItems = [...defaultItems, ...response.defaultItems]
      }

      setDefaultMenuItems(defaultItems)
      dispatch(displayFooter(true))
      setQuantitiesCountdown(newQuantitiesCountdown)
      setQuantities(newQuantities)
      setMenuItems(newItems)
      setIsLoading(false)
    } catch (error) {
      setError({
        open: true,
        status: 'Danger',
        message: DEFAULT_ERROR_MESSAGE
      })
      dispatch(displayFooter(false))
    }
  }

  const getProducts = async (configuration) => {
    const contentByDate = await getConfigurationContent(
      dayjs.utc().toISOString(),
      getBundleConfiguration,
      state,
      configuration.bundleId,
      configuration.id
    )

    const contentResponse = await getContent(
      state.tokens.guestToken,
      configuration.bundleId,
      configuration.id,
      contentByDate.id
    )

    if (
      contentResponse.data?.data &&
      contentResponse.data?.data.products.length > 0
    ) {
      setDeliverBefore(
        getShortDate(new Date(contentByDate.deliver_before), { withYear: true })
      )
      setDeliverAfter(getShortDate(new Date(contentByDate.deliver_after)))

      const defaultItems = contentResponse.data.data.products.filter(
        (item) => item.is_default
      )

      const filteredProducts = await filterShopifyProducts(
        contentResponse.data.data.products,
        shopProducts
      )

      const filteredVariants = await filterShopifyVariants(
        state,
        filteredProducts,
        state.entreeType.title,
        state.entreeSubType.title,
        configuration
      )

      let subTotal = 0
      if (state.cart.length > 0) {
        subTotal = cartUtility.sumQuantity(state, configuration.id)
      }

      const quantity = contentResponse.data.data.configuration.quantity

      return {
        products: filteredVariants,
        quantity: quantity,
        quantityCountdown: quantity - subTotal,
        defaultItems
      }
    }
  }

  const handleAddItem = (item, bundleContentId, currentQuantities = null) => {
    const currentItem = cartUtility.addItem(
      item,
      bundleContentId,
      currentQuantities || quantitiesCountdown
    )

    if (!currentItem) {
      return
    }

    setQuantitiesCountdown(currentItem.countdown)

    const newItem = currentItem.item
    dispatch(
      cartAddItem({
        ...newItem
      })
    )
  }

  const handleRemoveItem = (item, bundleContentId) => {
    const currentItem = cartUtility.removeItem(
      item,
      bundleContentId,
      quantitiesCountdown
    )
    setQuantitiesCountdown(currentItem.countdown)

    const newItem = currentItem.item
    dispatch(
      cartRemoveItem({
        ...newItem
      })
    )
  }

  const handlePopularButton = async () => {
    setIsLoadingDefaults(true)
    dispatch(cartClear())

    const findDefaultItem = (productPlatformId) =>
      defaultMenuItems.find(
        (item) => Number(item.platform_product_id) === Number(productPlatformId)
      )

    menuItems.forEach((content) => {
      content.products.forEach((product) => {
        const defaultItem = findDefaultItem(product.productPlatformId)
        if (
          defaultItem &&
          defaultItem.is_default &&
          defaultItem.default_quantity > 0
        ) {
          handleAddItem(
            { ...product, quantity: defaultItem.default_quantity },
            content.id,
            quantities
          )
        }
      })
    })

    setQuantitiesCountdown(() => {
      return quantitiesCountdown.map((section) => {
        return {
          ...section,
          quantity: 0,
          quantitySummary: section.quantityTotal
        }
      })
    })
    setIsLoadingDefaults(false)
    smoothScrollingToId('mealsSection')
  }

  const getQuantity = (id) => {
    return quantities.find((q) => q.id === id) || { id: 0, quantity: 0 }
  }

  const getQuantityCountdown = (id) => {
    return (
      quantitiesCountdown.find((q) => q.id === id) || { id: 0, quantity: 0 }
    )
  }

  const closeAlert = () => {
    setError({
      open: false,
      status: 'Success',
      message: ''
    })
  }

  if (state.entreeType.id === 0) {
    return <Redirect push to="/steps/3" />
  }

  return (
    <>
      <MostPopularBar
        isLoading={isLoadingDefaults}
        onClick={handlePopularButton}
      />

      <div className="defaultWrapper mt-10" id="entreesTop">
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.wrapper}>
            <TopTitle
              title="Select Your Meals"
              subTitle={`Menu for ${deliverAfter} - ${deliverBefore}`}
            />
            <div className={`${styles.quantitiesWrapper} mb-8`}>
              <div className={styles.topBarQuantities}>
                {menuItems.map((product) => (
                  <div key={product.id} className="px-3">
                    <span className={styles.number}>
                      {getQuantityCountdown(product.id).quantity}
                    </span>{' '}
                    {product.title} Left
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-1">
              <div id="mealsSection"></div>
              {isLoadingDefaults ? (
                <Loading />
              ) : (
                menuItems
                  .map((content) => (
                    <div key={content.id}>
                      <div className={styles.listHeader}>
                        <div className={styles.title}>
                          {content.title === 'Meals'
                            ? BUNDLE_MEAL_SECTION_TITLE
                            : content.title}{' '}
                          ({getQuantityCountdown(content.id).quantitySummary} of{' '}
                          {getQuantityCountdown(content.id).quantityTotal})
                        </div>
                      </div>
                      <div className={`${styles.cards} mb-10`}>
                        {content.products.map((item) => (
                          <CardQuantities
                            key={item.id}
                            title={item.name}
                            description={item.description}
                            image={
                              item.feature_image
                                ? item.feature_image.src
                                : item.images.length > 0
                                ? item.images[0]
                                : process.env.EMPTY_STATE_IMAGE
                            }
                            metafields={item.metafields}
                            isChecked={cartUtility.isItemSelected(
                              state.cart,
                              item
                            )}
                            quantity={cartUtility.getItemQuantity(
                              state.cart,
                              item
                            )}
                            onClick={() => handleAddItem(item, content.id)}
                            onAdd={() => handleAddItem(item, content.id)}
                            onRemove={() => handleRemoveItem(item, content.id)}
                            disableAdd={
                              getQuantityCountdown(content.id).quantity === 0
                            }
                          />
                        ))}
                      </div>
                    </div>
                  ))
                  .reverse()
              )}
            </div>
          </div>
        )}
        {error.open ? (
          <Toast
            open={error.open}
            status={error.status}
            message={error.message}
            displayTitle={false}
            handleClose={closeAlert}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default withActiveStep(Entrees, STEP_ID)
