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
  saveBundle,
  updateBundle,
  getSubscriptionOrder
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
import dayjs from 'dayjs'
import Loading from '../../Steps/Components/Loading'
import {
  cart,
  filterShopifyProducts,
  filterShopifyVariants,
  request
} from '../../../utils'

dayjs.extend(weekday)

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

  const [bundle, setBundle] = useState([])
  const [disabledNextButton, setDisabledNextButton] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [menuItems, setMenuItems] = useState([])

  // total and remaining items to add
  const [quantities, setQuantities] = useState([])
  const [quantitiesCountdown, setQuantitiesCountdown] = useState([])

  useEffect(() => {
    dispatch(cartClear())
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    console.log('useEffect 01')
    getCurrentMenuItems()
    console.log('useEffect 02')
  }, [])

  useEffect(() => {
    // if (
    //   bundle.length > 0 &&
    //   quantitiesCountdown.length > 0 &&
    //   quantities.length > 0
    // ) {
    //   let canActivateButton = false
    //   quantities.forEach((quantity) => {
    //     const cartTotal = cartUtility.sumQuantity(quantity.id)
    //     if (
    //       cartTotal === getQuantity(quantity.id)?.quantity &&
    //       getQuantityCountdown(quantity.id)?.quantity === 0
    //     ) {
    //       canActivateButton = true
    //     } else {
    //       canActivateButton = false
    //     }
    //   })
    //   if (canActivateButton) {
    //     setDisabledNextButton(true)
    //   } else {
    //     if (canActivateButton) {
    //       setDisabledNextButton(false)
    //     }
    //   }
    // }
    if (reduceQuantities(quantitiesCountdown) === 0) {
      setDisabledNextButton(false)
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
    const thisWeek = dayjs(query.get('date'))

    const subApi = await getSubscriptionOrder(token, orderId)
    console.log('subApi', subApi)

    const bunQty = {}
    // TODO call bundle to get configurations
    // TODO Check display date for config and call products available
    // TODO Check customer order and add in QTY's if previously added

    const currentItems = []
    if (subApi.data.data) {
      for (const order of subApi.data?.data) {
        const editItemsConfigArr = []

        if (order.bundle_configuration_content?.display_after) {
          const bundleProducts = false // await getBundleItems(order.subscription.bundle_id, order.bundle_configuration_content_id, token)

          for (const product of order?.items) {
            // TODO filter products looking for variant
            // TODO need to combine order products into the product array and update quantities

            const currentProduct = await findProductFromVariant(
              product.platform_product_variant_id
            )

            if (Object.entries(currentProduct).length > 0) {
              editItemsConfigArr.push({
                id: product.platform_product_variant_id,
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

          // bunQty[order.bundle_configuration_content_id] = 12; // bundleProducts?.quantityCountdown
          currentItems.push({
            id: bundleProducts ? bundleProducts.id : order.id,
            bundleId: subApi.data.data[0].subscription.bundle_id,
            title: bundleProducts
              ? bundleProducts.title
              : `Config Title - ${order.id}`,
            products: editItemsConfigArr
          })
        }
      }

      // setBundle(currentItems)
    }

    return currentItems
  }

  const handleSave = () => {
    // TODO check for existing order items
    // if none just create items
    // if some exist loop and update quantities and make update call
    // if order skip making contents configuration
    saveBundle()
    updateBundle()
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

      console.log('HERE!!')
      let savedItems = []
      if (!state.tokens.userToken) {
        const thisToken = getToken()
        savedItems = await getCustomerBundleItems(thisToken)
      } else {
        savedItems = await getCustomerBundleItems(state.tokens.userToken)
      }

      // const shopifyProduct = getSelectedBundle(state.bundle.breakfast.tag)

      console.log('saved item>>', savedItems)
      const bundleResponse = await getBundle(
        state.tokens.userToken,
        savedItems[0].bundleId
      )
      console.log('bundleResponse', bundleResponse)

      if (bundleResponse.data.data.length === 0) {
        throw new Error('Bundle could not be found')
      }

      const currentApiBundle = bundleResponse.data.data

      for (const configuration of currentApiBundle.configurations) {
        const response = await getProducts(configuration, savedItems[0])

        const mappedProducts = response.products.map((product) => {
          const savedProduct = savedItems[0].products.find(
            (i) => i.id === product.id
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

        newItems.push({
          id: configuration.id,
          title: configuration.title,
          products: [...mappedProducts]
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
      // TODO: do something with the error...
      console.log('error')
      console.log(error)
    }
  }

  const getProducts = async (configuration, savedItems) => {
    const nextWeekDate = query.get('date')

    const response = await getContents(
      state.tokens.userToken,
      configuration.bundleId,
      configuration.id,
      `is_enabled=1&display_after=${nextWeekDate}`
    )

    if (response.data?.data && response.data?.data.length > 0) {
      const filteredProducts = await filterShopifyProducts(
        response.data.data[0].products,
        shopProducts
      )

      const filteredVariants = await filterShopifyVariants(
        state,
        filteredProducts,
        configuration
      )

      let subTotal = 0
      const quantity = response.data.data[0].configuration.quantity

      console.log('filter variants>>>', filteredVariants)
      const mappedProducts = filteredVariants.map((product) => {
        const savedProduct = savedItems.products.find(
          (i) => i.id === product.id
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

      return {
        products: filteredVariants,
        quantity: quantity,
        quantityCountdown: quantity - subTotal
      }
    }
  }

  const handleAddItem = async (item, bundleContentId) => {
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

  // const getQuantity = (id) => {
  //   return quantities.find((q) => q.id === id) || { id: 0, quantity: 0 }
  // }

  const getQuantityCountdown = (id) => {
    return (
      quantitiesCountdown.find((q) => q.id === id) || { id: 0, quantity: 0 }
    )
  }

  if (isLoading) {
    return <Loading />
  }

  return (
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
                  disableAdd={getQuantityCountdown(content.id).quantity === 0}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonsRow}>
        <Link to="/account" className="secondaryButton">
          Cancel
        </Link>
        <button
          disabled={disabledNextButton}
          className="primaryButton"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default EditOrder
