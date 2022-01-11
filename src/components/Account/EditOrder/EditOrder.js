import React, { useEffect, useState } from 'react'
import {
  Link,
  Redirect,
  useParams,
  useLocation,
  useHistory
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardQuantities from '../../Cards/CardQuantities'
import {
  getContents,
  getBundle,
  useUserToken,
  getSubscriptionOrders
} from '../../Hooks'
import {
  cartRemoveItem,
  cartAddItem,
  displayHeader,
  displayFooter,
  selectFaqType,
  cartClear,
  setTokens,
  cartUpdate
} from '../../../store/slices/rootSlice'
import styles from './EditOrder.module.scss'
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import Loading from '../../Steps/Components/Loading'
import {
  cart,
  filterShopifyProducts,
  filterShopifyVariants,
  findWeekDayBetween,
  getCutOffDate
} from '../../../utils'
import {
  createSubscriptionOrder,
  updateSubscriptionOrder
} from '../../Hooks/withBundleApi'
import Toast from '../../Global/Toast'
import SpinnerIcon from '../../Global/SpinnerIcon'

dayjs.extend(utc)
dayjs.extend(weekday)

const DAYS_BEFORE_DISABLING = 5

const useQuery = () => {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const EditOrder = () => {
  const { orderId } = useParams()
  const query = useQuery()
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const cartUtility = cart(state)
  const currentDate = query.get('date')

  const [bundles, setBundles] = useState([])
  const [disabledNextButton, setDisabledNextButton] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState({
    open: false,
    status: 'Success',
    message: ''
  })
  const [disableEditing, setDisableEditing] = useState(false)
  const [hasSavedItems, setHasSavedItems] = useState(true)

  // total and remaining items to add
  const [quantities, setQuantities] = useState([])
  const [quantitiesCountdown, setQuantitiesCountdown] = useState([])

  useEffect(() => {
    dispatch(cartClear())
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    getCurrentMenuItems()
  }, [])

  useEffect(() => {
    if (reduceQuantities(quantitiesCountdown) === 0) {
      setDisabledNextButton(false)
    } else {
      setDisabledNextButton(true)
    }
  }, [quantities, quantitiesCountdown])

  const findProductFromVariant = async (variantId) =>
    new Promise((resolve) => {
      let foundProduct = {}
      for (const product of shopProducts) {
        const variant = product.variants.filter((v) => v.id === variantId)
        if (product.variants.filter((v) => v.id === variantId).length > 0) {
          foundProduct = {
            product,
            metafields: variant[0].metafields
          }
        }
      }

      resolve(foundProduct)
    })

  const getCustomerBundleItems = async (token) => {
    const subscriptionResponse = await getSubscriptionOrders(token, orderId)

    let currentBundleId = null
    const currentItems = []
    const currentBundles = []
    if (subscriptionResponse.data.data) {
      currentBundleId = subscriptionResponse.data.data[0].subscription.bundle_id

      for (const order of subscriptionResponse.data?.data) {
        const editItemsConfigArr = []
        if (
          order.bundle_configuration_content?.deliver_after &&
          order.bundle_configuration_content?.deliver_after === currentDate
        ) {
          const bundleProducts = false

          for (const product of order?.items) {
            const currentProduct = await findProductFromVariant(
              product.platform_product_variant_id
            )

            if (Object.entries(currentProduct).length > 0) {
              editItemsConfigArr.push({
                id: product.platform_product_variant_id,
                contentSelectionId: product.id,
                subscriptionContentId: order.id,
                title: currentProduct?.product?.title
                  ? currentProduct.product.title
                  : 'default product',
                image:
                  currentProduct?.product?.images &&
                  currentProduct.product?.images.length > 0
                    ? currentProduct.product.images[0]
                    : process.env.EMPTY_STATE_IMAGE,
                metafields:
                  currentProduct?.metafields?.length > 0
                    ? currentProduct.metafields
                    : [],
                quantity: product.quantity
              })
            }
          }

          currentItems.push({
            id: bundleProducts ? bundleProducts.id : order.id,
            bundleId: subscriptionResponse.data.data[0].subscription.bundle_id,
            products: editItemsConfigArr
          })

          // configuration content exists?
          if (
            order?.bundle_configuration_content?.deliver_after === currentDate
          ) {
            currentBundles.push(order)
          }
        }
      }

      setBundles(currentBundles)
    }

    return {
      currentItems,
      bundleId: currentBundleId
    }
  }

  const createNewOrder = async () => {
    const separatedConfigurations = []

    state.cart.forEach((item) => {
      if (!separatedConfigurations[`config_${item.configurationContentId}`]) {
        separatedConfigurations[`config_${item.configurationContentId}`] = []
      }

      separatedConfigurations[`config_${item.configurationContentId}`].push({
        bundle_configuration_content_id: item.configurationContentId,
        platform_product_variant_id: item.id,
        quantity: item.quantity
      })
    })

    for (const key of Object.keys(separatedConfigurations)) {
      await createSubscriptionOrder(
        state.tokens.userToken,
        orderId,
        separatedConfigurations[key][0].bundle_configuration_content_id,
        separatedConfigurations[key]
      )
    }

    return history.push(`/account`)
  }

  const handleSave = async () => {
    setIsSaving(true)
    const itemsToSave = []

    if (!hasSavedItems) {
      return createNewOrder()
    }

    const getBundleProduct = (variantId) => {
      let existingProduct = null
      bundles.forEach((bundle) => {
        const currentItem = bundle.items.find((p) => {
          return Number(p.platform_product_variant_id) === Number(variantId)
        })
        if (currentItem) {
          existingProduct = currentItem
        }
      })

      return existingProduct
    }

    for (const item of menuItems) {
      for (const product of item.products) {
        const cartItem = state.cart.find((c) => c.id === product.id)
        const currentContent = bundles.find(
          (b) =>
            Number(b.bundle_configuration_content_id) ===
            Number(product.configurationContentId)
        )

        if (cartItem) {
          if (cartItem && cartItem.quantity > 0 && product.quantity === 0) {
            itemsToSave.push({
              platform_product_variant_id: product.id,
              quantity: cartItem.quantity,
              contentId: currentContent.id,
              configurationContentId:
                currentContent.bundle_configuration_content_id
            })
          } else {
            if (cartItem.quantity !== product.quantity) {
              const currentBundleProduct = getBundleProduct(product.id)
              if (currentBundleProduct) {
                itemsToSave.push({
                  id: currentBundleProduct.id,
                  platform_product_variant_id: product.id,
                  contentId: currentContent.id,
                  configurationContentId:
                    currentContent.bundle_configuration_content_id,
                  quantity: cartItem.quantity
                })
              }
            }
          }
        } else {
          const currentBundleProduct = getBundleProduct(product.id)
          if (currentBundleProduct) {
            itemsToSave.push({
              id: currentBundleProduct.id,
              platform_product_variant_id: product.id,
              contentId: currentContent.id,
              configurationContentId:
                currentContent.bundle_configuration_content_id,
              quantity: 0
            })
          }
        }
      }
    }

    const separatedConfigurations = []

    itemsToSave.forEach((item) => {
      if (!separatedConfigurations[`config_${item.contentId}`]) {
        separatedConfigurations[`config_${item.contentId}`] = []
      }

      separatedConfigurations[`config_${item.contentId}`].push({ ...item })
    })

    for (const key of Object.keys(separatedConfigurations)) {
      await updateSubscriptionOrder(
        state.tokens.userToken,
        orderId,
        null,
        separatedConfigurations[key][0].configurationContentId,
        separatedConfigurations[key][0].contentId,
        separatedConfigurations[key]
      )
    }

    setIsSaving(false)
    return history.push(`/account`)
  }

  const getToken = async () => {
    const tokenResponse = await useUserToken()

    if (tokenResponse.token) {
      dispatch(
        setTokens({
          ...state.tokens,
          userToken: tokenResponse.token
        })
      )
      return tokenResponse.token
    }
  }

  const getCurrentMenuItems = async () => {
    setIsLoading(true)

    try {
      const newItems = []
      const newQuantities = []
      const newQuantitiesCountdown = []

      let savedItems = []
      let savedItemsResponse = null
      if (!state.tokens.userToken) {
        const thisToken = getToken()
        savedItemsResponse = await getCustomerBundleItems(thisToken)
        savedItems = savedItemsResponse.currentItems
      } else {
        savedItemsResponse = await getCustomerBundleItems(
          state.tokens.userToken
        )
        savedItems = savedItemsResponse.currentItems
      }

      let savedItemsExist = true
      const totalItems = savedItems.length
      let count = 0
      savedItems.forEach((s) => {
        if (s.products.length === 0) {
          count = count + 1
        }

        if (count === totalItems) {
          savedItemsExist = false
        }
      })
      setHasSavedItems(savedItemsExist && savedItems.length > 0)

      const bundleResponse = await getBundle(
        state.tokens.userToken,
        savedItems[0]?.bundleId || savedItemsResponse.bundleId
      )

      if (bundleResponse.data.data.length === 0) {
        throw new Error('Bundle could not be found')
      }

      const currentApiBundle = bundleResponse.data.data

      for (const configuration of currentApiBundle.configurations) {
        const mappedProducts = []
        const productsResponse = await getProducts(configuration, savedItems[0])

        if (productsResponse) {
          productsResponse.products.forEach((product) => {
            let savedProduct = null
            savedItems.forEach((item) => {
              const foundItem = item.products.find(
                (i) => Number(i.id) === Number(product.id)
              )
              if (foundItem) {
                savedProduct = foundItem
              }
            })

            let quantity = 0

            if (savedProduct) {
              quantity = savedProduct.quantity
            } else {
              // set default quantities

              const defaultContent =
                productsResponse?.contents[0]?.products.find(
                  (p) =>
                    Number(p.platform_product_id) ===
                    Number(product.productPlatformId)
                )
              console.log('defaultContent', defaultContent)
              quantity =
                (savedItemsExist && savedItems.length > 0) ||
                defaultContent.is_default === 0
                  ? 0
                  : defaultContent.default_quantity
            }

            mappedProducts.push({
              ...product,
              quantity
            })
          })

          newItems.push({
            id: configuration.id,
            title: configuration.title,
            products: [...mappedProducts]
          })

          newQuantities.push({
            id: configuration.id,
            quantity: bundles.length > 0 ? productsResponse.quantity : 0
          })

          newQuantitiesCountdown.push({
            id: configuration.id,
            quantity:
              bundles.length > 0 ? productsResponse.quantityCountdown : 0
          })
        }
      }

      const productsToCart = []
      newItems.forEach((i) => {
        i.products.forEach((p) => {
          if (p.quantity > 0) {
            productsToCart.push(p)
          }
        })
      })

      dispatch(cartUpdate([...productsToCart]))

      setQuantitiesCountdown(newQuantitiesCountdown)
      setQuantities(newQuantities)
      setMenuItems(newItems)
      setIsLoading(false)
    } catch (error) {
      setError({
        open: true,
        status: 'Danger',
        message: 'Failed to retrieve products'
      })
    }
  }

  const getProducts = async (configuration, savedItems) => {
    const nextWeekDate = currentDate

    const response = await getContents(
      state.tokens.userToken,
      configuration.bundleId,
      configuration.id,
      `is_enabled=1&deliver_after=${nextWeekDate}`
    )
    console.log('response', response)

    if (response.data?.data && response.data?.data.length > 0) {
      const filteredProducts = await filterShopifyProducts(
        response.data.data[0].products,
        shopProducts
      )

      const subscriptionBundle = response.data?.data[0]
      const subscriptionOrder = await getSubscriptionOrders(
        state.tokens.userToken,
        orderId
      )
      let currentSubscriptionData = null
      let hasPlatformId = false
      subscriptionOrder.data.data.forEach((subscription) => {
        if (
          subscription.bundle_configuration_content?.deliver_after ===
            currentDate &&
          subscription.platform_order_id
        ) {
          if (!hasPlatformId) {
            console.log('set to true: platform id', hasPlatformId)
            hasPlatformId = true
          }
        }

        if (
          subscription.bundle_configuration_content?.deliver_after ===
          subscriptionBundle.deliver_after
        ) {
          currentSubscriptionData = subscription
        }
      })

      // TODO: remove logs
      console.log('subscriptionOrder', subscriptionOrder)
      console.log('currentSubscriptionData', currentSubscriptionData)

      if (hasPlatformId) {
        setDisableEditing(true)
        console.log('01 Disable edit', hasPlatformId)
      } else {
        // format: 2022-01-15T23:00:00.000-08:00
        const forcedDate =
          query.get('forced_date') && dayjs(query.get('forced_date'))
        const today =
          process.env.ENVIRONMENT !== 'production' && forcedDate
            ? forcedDate
            : dayjs()

        console.log('today:', today)
        let cuttingOffDate = dayjs(subscriptionBundle.deliver_after).subtract(
          DAYS_BEFORE_DISABLING,
          'day'
        )

        if (currentSubscriptionData) {
          const deliveryDate = findWeekDayBetween(
            currentSubscriptionData.subscription.delivery_day,
            subscriptionBundle.deliver_after,
            subscriptionBundle.deliver_before
          )
          cuttingOffDate = getCutOffDate(deliveryDate)
          console.log('new cuttingOffDate:', cuttingOffDate)
        }

        // TODO: remove logs
        console.log('cutting off date:', cuttingOffDate)
        console.log('bundle deliver after', subscriptionBundle)
        console.log('valid?', dayjs(today).isSameOrAfter(cuttingOffDate))

        if (dayjs(today).isSameOrAfter(cuttingOffDate)) {
          console.log('02 Disable edit')
          setDisableEditing(true)
        }
      }

      // order was already placed, redirect the user
      if (subscriptionOrder.platform_order_id) {
        return history.push(`/account`)
      }

      const filteredVariants = await filterShopifyVariants(
        state,
        filteredProducts,
        subscriptionOrder.data.data[0].subscription.subscription_type,
        subscriptionOrder.data.data[0].subscription.subscription_sub_type,
        configuration
      )

      let subTotal = 0
      const quantity = response.data.data[0].configuration.quantity || 0
      if (savedItems) {
        const mappedProducts = filteredVariants.map((product) => {
          const savedProduct = savedItems.products.find(
            (i) => Number(i.id) === Number(product.id)
          )

          let quantity = 0
          if (savedProduct) {
            quantity = savedProduct.quantity
          }

          return {
            ...product,
            quantity
          }
        })

        subTotal = mappedProducts
          .map((value) => value.quantity)
          .reduce((sum, number) => sum + number, 0)
      }
      return {
        products: filteredVariants,
        quantity: quantity,
        quantityCountdown: quantity - subTotal,
        contents: response.data?.data
      }
    }
  }

  const handleAddItem = async (item, bundleContentId) => {
    if (disableEditing) {
      return
    }

    const currentItem = await cartUtility.addItem(
      item,
      bundleContentId,
      quantitiesCountdown
    )
    if (!currentItem) {
      return
    }

    if (shopCustomer.id === 0) {
      return <Redirect push to="/" />
    }

    setQuantitiesCountdown(currentItem.countdown)

    const newItem = currentItem.item
    dispatch(
      cartAddItem({
        ...newItem
      })
    )
  }

  const reduceQuantities = (items) => {
    if (items.length > 0) {
      let count = 0
      for (const item of items) {
        count = count + item.quantity
      }
      return count
    }
    return 99
  }

  const handleRemoveItem = (item, bundleContentId) => {
    if (disableEditing) {
      return
    }

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

  const getQuantityCountdown = (id) => {
    return (
      quantitiesCountdown.find((q) => q.id === id) || { id: 0, quantity: 0 }
    )
  }

  const handleCancelButton = () => {
    return history.push(`/account`)
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="contentWrapper">
        <div className={styles.wrapper}>
          <div className={`${styles.title} mb-7`}>Edit Order</div>
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
                        : process.env.EMPTY_STATE_IMAGE
                    }
                    metafields={item.metafields}
                    isChecked={cartUtility.isItemSelected(state.cart, item)}
                    quantity={cartUtility.getItemQuantity(state.cart, item)}
                    onClick={() => handleAddItem(item, content.id)}
                    onAdd={() => handleAddItem(item, content.id)}
                    onRemove={() => handleRemoveItem(item, content.id)}
                    disableAdd={
                      disableEditing ||
                      getQuantityCountdown(content.id).quantity === 0
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        {error.open ? (
          <Toast
            open={error.open}
            status={error.status}
            message={error.message}
            autoDelete
            handleClose={closeAlert}
          />
        ) : (
          ''
        )}
      </div>
      <div className={styles.buttonsRow}>
        <div className="buttons">
          <div
            className="button lightButton"
            onClick={() => handleCancelButton()}
          >
            Cancel
          </div>
          {!disableEditing && (
            <div
              className={`button ${
                disabledNextButton ? 'disabledButton' : 'primaryButton'
              }`}
              onClick={() => (disabledNextButton ? () => {} : handleSave())}
            >
              {isSaving ? <SpinnerIcon /> : 'Save'}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EditOrder
