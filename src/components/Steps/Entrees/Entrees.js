import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Redirect } from 'react-router'
import CardQuantities from '../../Cards/CardQuantities'
import {
  getMenuItems,
  getSelectedBundle,
  getBundle,
  withActiveStep
} from '../../Hooks'
import {
  cartRemoveItem,
  cartAddItem,
  setIsNextButtonActive
} from '../../../store/slices/rootSlice'
import styles from './Entrees.module.scss'
import weekday from 'dayjs/plugin/weekday'
import dayjs from 'dayjs'
import Loading from '../Components/Loading'

const FAQ_TYPE = 'entrees'
const STEP_ID = 4
const EMPTY_STATE_IMAGE =
  'https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif'

dayjs.extend(weekday)

const Entrees = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()

  const [isLoading, setIsLoading] = useState(false)
  const [menuItems, setMenuItems] = useState([])

  // total and remaining items to add
  const [quantities, setQuantities] = useState([])
  const [quantitiesCountdown, setQuantitiesCountdown] = useState([])

  const getQuantity = (id) => {
    return quantities.find((q) => q.id === id) || { id: 0, quantity: 0 }
  }

  const getQuantityCountdown = (id) => {
    return (
      quantitiesCountdown.find((q) => q.id === id) || { id: 0, quantity: 0 }
    )
  }

  const getQuantityCountdownIndex = (id) => {
    return quantitiesCountdown.findIndex((q) => q.id === id)
  }

  useEffect(() => {
    // TODO: wait to see if we will use the FAQ
    // dispatch(selectFaqType(FAQ_TYPE))
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
        const cartTotal = sumQuantity(quantity.id)
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

  const sumQuantity = (id) => {
    let total = 0
    const filteredValues = state.cart.filter((e) => e.bundleContentId === id)
    total = filteredValues
      .map((value) => value.quantity)
      .reduce((sum, number) => sum + number, 0)
    return total
  }

  const getCurrentMenuItems = async () => {
    setIsLoading(true)

    try {
      const newItems = []
      const newQuantities = []
      const newQuantitiesCountdown = []

      const shopifyProduct = getSelectedBundle(state.bundle.breakfast.tag)

      const { data } = await getBundle(
        state.tokens.guestToken,
        shopifyProduct.id
      )

      if (data.data.length === 0) {
        throw new Error('Bundle could not be found')
      }

      const currentApiBundle = data.data[0]

      for (const configuration of currentApiBundle.configurations) {
        const addItem = (items) => menuItems.concat(items)

        const response = await getProducts(configuration, addItem)

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
      return history.push('/')
    }
  }

  const getProducts = async (configuration, setContent) => {
    const nextWeekSunday = dayjs()
      .weekday(7)
      .format('YYYY-MM-DDT00:00:00.000[Z]')

    const response = await getMenuItems(
      state.tokens.guestToken,
      configuration.bundleId,
      configuration.id,
      `is_enabled=1&display_after=${nextWeekSunday}`
    )

    if (response.data?.data && response.data?.data.length > 0) {
      const filteredProducts = await filterShopifyProducts(
        response.data.data[0].products,
        shopProducts
      )

      const filteredVariants = await filterShopifyVariants(
        filteredProducts,
        configuration
      )

      let subTotal = 0
      if (state.cart.length > 0) {
        subTotal = sumQuantity(configuration.id)
      }

      const quantity = response.data.data[0].configuration.quantity

      return {
        products: filteredVariants,
        quantity: quantity,
        quantityCountdown: quantity - subTotal
      }
    }
  }

  const filterShopifyProducts = async (items, shopifyProducts) =>
    new Promise((resolve) => {
      const apiProductIds = items.map((i) => Number(i.platform_product_id))

      const filteredProducts = shopifyProducts.filter((p) =>
        apiProductIds.includes(p.id)
      )

      const mappedProducts = filteredProducts.map((product) => ({
        ...product,
        bundle_configuration_content_id: items.find(
          (i) => Number(i.platform_product_id) === Number(product.id)
        ).bundle_configuration_contents_id
      }))

      resolve(mappedProducts)
    })

  const filterShopifyVariants = async (shopifyProducts, configuration) =>
    new Promise((resolve) => {
      const filteredVariants = []

      for (const product of shopifyProducts) {
        const filtered = product.variants.filter(
          (variant) =>
            variant.options.includes(state.entreeType.title) &&
            variant.options.includes(state.entreeSubType.title)
        )

        filtered.map((f) => {
          f.images = product.images
          f.configurationBundleId = configuration.bundleId
          f.configurationContentId = product.bundle_configuration_content_id
          f.bundleContentId = configuration.id
          f.quantity = 0
          f.type = configuration.title

          if (f.name.includes('-')) {
            f.name = f.name.split('-')[0]
          }

          return f
        })

        if (filtered.length > 0) {
          filteredVariants.push(...filtered)
        }
      }

      resolve(filteredVariants)
    })

  const handleAddItem = (item, bundleContentId) => {
    const countdown = getQuantityCountdown(bundleContentId)
    if (countdown?.quantity === 0) {
      return
    }

    const countdownIndex = getQuantityCountdownIndex(bundleContentId)
    if (countdownIndex === -1) {
      return
    }

    const newItemsCountdown = [...quantitiesCountdown]
    newItemsCountdown[countdownIndex] = {
      ...newItemsCountdown[countdownIndex],
      quantity: countdown.quantity - 1
    }
    setQuantitiesCountdown([...newItemsCountdown])

    dispatch(
      cartAddItem({
        ...item
      })
    )
  }

  const handleRemoveItem = (item, bundleContentId) => {
    const countdown = getQuantityCountdown(bundleContentId)

    const countdownIndex = getQuantityCountdownIndex(bundleContentId)
    if (countdownIndex === -1) {
      return
    }

    const newItemsCountdown = [...quantitiesCountdown]
    newItemsCountdown[countdownIndex] = {
      ...newItemsCountdown[countdownIndex],
      quantity: countdown.quantity + 1
    }
    setQuantitiesCountdown([...newItemsCountdown])

    dispatch(
      cartRemoveItem({
        ...item
      })
    )
  }

  const getItemQuantity = (item) => {
    const currentItem = state.cart.find((i) => Number(i.id) === Number(item.id))

    return currentItem?.quantity || 0
  }

  const isItemSelected = (item) => {
    return !!state.cart.find((c) => c.id === item.id)
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
                  image={
                    item.feature_image
                      ? item.feature_image.src
                      : item.images.length > 0
                      ? item.images[0]
                      : EMPTY_STATE_IMAGE
                  }
                  metafields={item.metafields}
                  isChecked={isItemSelected(item)}
                  quantity={getItemQuantity(item)}
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
