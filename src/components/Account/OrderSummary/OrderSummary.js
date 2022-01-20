import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardQuantities from '../../Cards/CardQuantities'
import {
  getContents,
  getBundle,
  useUserToken,
  getSubscriptionOrders
} from '../../Hooks'
import {
  displayHeader,
  displayFooter,
  selectFaqType,
  cartClear,
  setTokens,
  cartUpdate
} from '../../../store/slices/rootSlice'
import styles from './OrderSummary.module.scss'
import menuItemStyles from '../MenuItems.module.scss'
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import Loading from '../../Steps/Components/Loading'
import {
  cart,
  filterShopifyProducts,
  filterShopifyVariants
} from '../../../utils'
import Toast from '../../Global/Toast'

dayjs.extend(utc)
dayjs.extend(weekday)

const useQuery = () => {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const OrderSummary = () => {
  const { orderId } = useParams()
  const query = useQuery()
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()
  const cartUtility = cart(state)
  const currentDate = query.get('date')

  const [bundles, setBundles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [weekDate, setWeekDate] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [error, setError] = useState({
    open: false,
    status: 'Success',
    message: ''
  })

  useEffect(() => {
    dispatch(cartClear())
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    getCurrentMenuItems()
  }, [])

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
            if (savedProduct && savedProduct.quantity > 0) {
              quantity = savedProduct.quantity

              mappedProducts.push({
                ...product,
                quantity
              })
            }
          })

          newItems.push({
            id: configuration.id,
            title: configuration.title,
            products: [...mappedProducts]
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

      setMenuItems(newItems)
      setIsLoading(false)
    } catch (error) {
      setError({
        open: true,
        status: 'Danger',
        message: 'Failed to retrieve menu items'
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

    if (response.data?.data && response.data?.data.length > 0) {
      setWeekDate(
        dayjs.utc(response.data.data[0].deliver_after).format('MMM DD')
      )
      const filteredProducts = await filterShopifyProducts(
        response.data.data[0].products,
        shopProducts
      )

      const subscriptionOrder = await getSubscriptionOrders(
        state.tokens.userToken,
        orderId
      )

      let hasPlatformId = false
      subscriptionOrder.data.data.forEach((subscription) => {
        if (
          subscription.bundle_configuration_content?.deliver_after ===
            currentDate &&
          subscription.platform_order_id
        ) {
          if (!hasPlatformId) {
            hasPlatformId = true
          }
        }
      })

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

  const closeAlert = () => {
    setError({
      open: false,
      status: 'Success',
      message: ''
    })
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="contentWrapper">
        <div className={menuItemStyles.wrapper}>
          <div className={`${menuItemStyles.title} mb-7`}>
            Order Summary Week of {weekDate}
          </div>

          {menuItems.map((content) => (
            <div key={content.id}>
              <div className={menuItemStyles.listHeader}>
                <div className={menuItemStyles.title}>{content.title}</div>
              </div>
              <div className={`${menuItemStyles.cards} mb-10`}>
                {content.products.length > 0 ? (
                  content.products.map((item) => (
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
                      onClick={() => {}}
                      onAdd={() => {}}
                      onRemove={() => {}}
                      disableAdd
                      disableRemove
                    />
                  ))
                ) : (
                  <div className="mt-2">No menu items were found...</div>
                )}
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

      <div className={`${menuItemStyles.buttonsRow} mt-5`}>
        <div className="buttons">
          <div className="button lightButton" onClick={() => history.goBack()}>
            Back
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
