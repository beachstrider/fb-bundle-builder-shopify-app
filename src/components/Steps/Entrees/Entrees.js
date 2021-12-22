import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router'
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
  setIsNextButtonActive
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
  getConfigurationContent
} from '../../../utils'

dayjs.extend(weekday)
dayjs.extend(utc)

const STEP_ID = 4

const Entrees = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()

  const cartUtility = cart(state)

  const [isLoading, setIsLoading] = useState(false)
  const [menuItems, setMenuItems] = useState([])

  // total and remaining items to add
  const [quantities, setQuantities] = useState([])
  const [quantitiesCountdown, setQuantitiesCountdown] = useState([])

  useEffect(() => {
    dispatch(setIsNextButtonActive(false))

    getCurrentMenuItems()
  }, [])

  useEffect(() => {
    if (
      state.cart.length > 0 &&
      quantitiesCountdown.length > 0 &&
      quantities.length > 0
    ) {
      let canActivateButton = false
      quantities.forEach((quantity) => {
        const cartTotal = cartUtility.sumQuantity(state, quantity.id)
        if (
          cartTotal === getQuantity(quantity.id)?.quantity &&
          getQuantityCountdown(quantity.id)?.quantity === 0
        ) {
          canActivateButton = true
        } else {
          canActivateButton = false
        }
      })

      if (canActivateButton) {
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
      console.log('shopifyProduct',shopifyProduct)

      const { data } = await getBundleByPlatformId(
        state.tokens.guestToken,
        shopifyProduct.id
      )
      console.log('getBundleByPlatformId', shopifyProduct.id, data)
      if (data.data.length === 0) {
        throw new Error('Bundle could not be found')
      }
      const currentBundle = data.data[0]

      for (const configuration of currentBundle.configurations) {
        console.log('currentBundle.configurations', currentBundle.configurations)
        const addItem = (items) => menuItems.concat(items)
        console.log('currentBundle.configurations', currentBundle.configurations)
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
          quantity: response.quantityCountdown
        })
      }

      setQuantitiesCountdown(newQuantitiesCountdown)
      setQuantities(newQuantities)
      setMenuItems(newItems)
      setIsLoading(false)
    } catch (error) {
      // TODO: display error
      console.error(error)
      //return history.push('/')
    }
  }

  const getProducts = async (configuration) => {
    const getContentByDate = await getConfigurationContent(
      dayjs.utc().toISOString(),
      getBundleConfiguration,
      state,
      configuration.bundleId,
      configuration.id
    )
    console.log('getContentByDate', getContentByDate)
    const contentResponse = await getContent(
      state.tokens.guestToken,
      configuration.bundleId,
      configuration.id,
      getContentByDate.id
    )
    console.log('contentResponse', contentResponse)
    if (
      contentResponse.data?.data &&
      contentResponse.data?.data.products.length > 0
    ) {
      const filteredProducts = await filterShopifyProducts(
        contentResponse.data.data.products,
        shopProducts
      )

      const filteredVariants = await filterShopifyVariants(
        state,
        filteredProducts,
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
        quantityCountdown: quantity - subTotal
      }
    }
  }

  const handleAddItem = (item, bundleContentId) => {
    const currentItem = cartUtility.addItem(
      item,
      bundleContentId,
      quantitiesCountdown
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

  const getQuantity = (id) => {
    return quantities.find((q) => q.id === id) || { id: 0, quantity: 0 }
  }

  const getQuantityCountdown = (id) => {
    return (
      quantitiesCountdown.find((q) => q.id === id) || { id: 0, quantity: 0 }
    )
  }

  if (state.entreeType.id === 0) {
    return <Redirect push to="/steps/3" />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <div className={`${styles.title} mb-7`}>Choose Entrees</div>
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

        {menuItems.map((content) => (
          <div key={content.id}>
            <div className={styles.listHeader}>
              <div className={styles.title}>{content.title}</div>
              <div className={`px-10 ${styles.quantities}`}>
                <span className={styles.number}>
                  {getQuantityCountdown(content.id).quantity}
                </span>{' '}
                {content.title} Left
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
                  isChecked={cartUtility.isItemSelected(state.cart, item)}
                  quantity={cartUtility.getItemQuantity(state.cart, item)}
                  onClick={() => handleAddItem(item, content.id)}
                  onAdd={() => handleAddItem(item, content.id)}
                  onRemove={() => handleRemoveItem(item, content.id)}
                  disableAdd={getQuantityCountdown(content.id).quantity === 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withActiveStep(Entrees, STEP_ID)
