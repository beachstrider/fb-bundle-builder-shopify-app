import React, { useEffect, useState } from 'react'
import { Redirect, useParams, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CardQuantities from '../../Cards/CardQuantities'
import {
  getContents,
  getBundle,
  useUserToken,
  getSubscriptionOrders,
  mapItems
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
import menuItemStyles from '../MenuItems.module.scss'
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'
import dayjs from 'dayjs'
import Loading from '../../Steps/Components/Loading'
import {
  cart,
  filterShopifyProducts,
  findWeekDayBetween,
  getCutOffDate,
  getTodayDate,
  settings
} from '../../../utils'
import {
  createSubscriptionOrder,
  updateSubscriptionOrder
} from '../../Hooks/withBundleApi'
import Toast from '../../Global/Toast'
import SpinnerIcon from '../../Global/SpinnerIcon'
import { DEFAULT_ERROR_MESSAGE } from '../../../constants/errors'

dayjs.extend(utc)
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
  const filterMealsEnable = settings().display().filterMealsEnable;
  const history = useHistory()
  const cartUtility = cart(state)
  const currentDate = query.get('date')

  const [bundles, setBundles] = useState([])
  const [disabledNextButton, setDisabledNextButton] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [intactMenuItems, setIntactMenuItems] = useState([])
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
  // filter by tag useState
  const [selectedCategory, setSelectedCategory] = useState({
    breakfast: false,
    balanced: false,
    lowcarb: false,
    lite: false,
  });
  const today = getTodayDate()
  console.log('today:', today)

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
    console.log('debug: subscriptionResponse', subscriptionResponse)

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
      console.log('saving...')
      return createNewOrder()
    }

    console.log('updating...')
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

    for (const item of intactMenuItems) {
      for (const product of item.products) {
        const cartItem = state.cart.find((c) => c.id === product.id)
        const currentContent = bundles.find(
          (b) =>
            Number(b.bundle_configuration_content_id) ===
            Number(product.configurationContentId)
        )

        const currentBundleProduct = getBundleProduct(product.id)
        if (cartItem) {
          if (
            cartItem &&
            cartItem.quantity > 0 &&
            product.quantity === 0 &&
            !currentBundleProduct
          ) {
            itemsToSave.push({
              platform_product_variant_id: product.id,
              quantity: cartItem.quantity,
              contentId: currentContent.id,
              configurationContentId:
                currentContent.bundle_configuration_content_id
            })
          } else {
            if (cartItem.quantity !== product.quantity) {
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

    console.log('items to save>>', itemsToSave)
    console.log('items>>>', separatedConfigurations)

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
      const userToken = !state.tokens.userToken
        ? await getToken()
        : state.tokens.userToken

      let savedItems = []
      let savedItemsResponse = null
      savedItemsResponse = await getCustomerBundleItems(userToken)
      savedItems = savedItemsResponse.currentItems

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
        userToken,
        savedItems[0]?.bundleId || savedItemsResponse.bundleId
      )

      if (bundleResponse.data.data.length === 0) {
        throw new Error('Bundle could not be found')
      }

      const currentApiBundle = bundleResponse.data.data

      for (const configuration of currentApiBundle.configurations) {
        const mappedProducts = []
        const productsResponse = await getProducts(
          userToken,
          configuration,
          savedItems[0]
        )

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

            console.log('savedProduct:', savedProduct)
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
              bundles.length > 0
                ? productsResponse.quantityCountdown
                : productsResponse.quantityCountdown !== 0
                ? productsResponse.quantity - productsResponse.quantityCountdown
                : 0
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
      // need to keep intact menu items only for filtering by tags
      setIntactMenuItems(newItems)

      setIsLoading(false)
    } catch (error) {
      setError({
        open: true,
        status: 'Danger',
        message: DEFAULT_ERROR_MESSAGE
      })
    }
  }

  const getProducts = async (userToken, configuration, savedItems) => {
    const nextWeekDate = currentDate

    const response = await getContents(
      userToken,
      configuration.bundleId,
      configuration.id,
      `is_enabled=1&deliver_after=${nextWeekDate}`
    )

    if (response.data?.data && response.data?.data.length > 0) {
      const filteredProducts = await filterShopifyProducts(
        response.data.data[0].products,
        shopProducts
      )

      const subscriptionBundle = response.data?.data[0]
      const subscriptionOrder = await getSubscriptionOrders(userToken, orderId)
      let currentSubscriptionData = null
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

        if (
          subscription.bundle_configuration_content?.deliver_after ===
          subscriptionBundle.deliver_after
        ) {
          currentSubscriptionData = subscription
        }
      })

      if (hasPlatformId) {
        setDisableEditing(true)
      } else {
        const deliveryDay = currentSubscriptionData
          ? currentSubscriptionData.subscription.delivery_day
          : subscriptionOrder?.data?.data[0].subscription.delivery_day

        const deliveryDate = findWeekDayBetween(
          deliveryDay,
          subscriptionBundle.deliver_after,
          subscriptionBundle.deliver_before
        )

        const cuttingOffDate = getCutOffDate(deliveryDate)

        if (dayjs(today).isSameOrAfter(cuttingOffDate)) {
          console.log('02 Disable edit')
          setDisableEditing(true)
        }
      }

      // order was already placed, redirect the user
      if (subscriptionOrder.platform_order_id) {
        return history.push(`/account`)
      }

      const filteredVariants = await mapItems(
        filteredProducts,
        shopBundles,
        subscriptionOrder.data.data[0].subscription,
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
        ...newItem,
        quantity: 1
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
  
  const handleResetCart = () => {
    dispatch(cartClear())

    const newQuantities = [];
    intactMenuItems.forEach((product) => {
      newQuantities.push({ 'id': product.id, 'quantity': product.products.reduce((x, item) => x + item.quantity, 0) })
    })

    setQuantitiesCountdown(newQuantities)
  }

  const getIntakeQuantity = () => {
    let intakeQuantity = 0;
    intactMenuItems.forEach( (item) => {
      intakeQuantity += item.products.reduce((x, item) => x + item.quantity, 0)
    })

    return intakeQuantity;
  }

  const getQuantityCountdown = (id) => {
    return (
      quantitiesCountdown.find((q) => q.id === id) || { id: 0, quantity: 0 }
    )
  }

  const handleCancelButton = () => {
    return history.push(`/account`)
  }
  // START: filter by tags logic
  const categoryHandleChange = async (e)=>{
    const { name } = e.target;
    const checked   = e.target.checked;
    const updatedCategories = { ...selectedCategory, [name]: checked };
    setSelectedCategory(updatedCategories)
    const newItems = []
    intactMenuItems.forEach((content) => {
      const filteredProducts = getFilteredProductByTags(content.products, updatedCategories)
      newItems.push({
        id: content.id,
        title: content.title,
        products: filteredProducts
      })
    })
    setMenuItems(newItems);
  }
  // get filtered products by tags
  const getFilterTags  = (updatedCategories) => {
    let filteringTags = [];
    const categories = Object.entries(updatedCategories)
    categories.forEach((category) => {
      if (category[1]){
        filteringTags.push(category[0])
      }
    });
    return filteringTags;
  }
  const getFilteredProductByTags = (products, updatedCategories) => {
    let newProducts = [];
    const filteringTags = getFilterTags(updatedCategories);
    if (filteringTags.length > 0){
      products.forEach((product) => {
        for (let i=0; i<product.tags.length; i++){
          let singleTag = product.tags[i];
          singleTag  = singleTag.toLowerCase().replace(' ','');
          if (filteringTags.includes(singleTag)){
            newProducts.push(product);
            break;
          }
        }
      })
    }else{
      newProducts = products;
    }
    return newProducts;
  }

  // END: filter by tags logic

  if (isLoading) {
    return <Loading />
  }

  return (
    <div>
      <div className="contentWrapper">
        <div className={menuItemStyles.wrapper}>
          <div className={`${menuItemStyles.title} mb-3`}>Edit Order</div>
          { filterMealsEnable ? (
            <div className={`${menuItemStyles.top}`}>
              <h2 className={`${menuItemStyles.topTitle}`}>Filter: </h2>
              <div className={menuItemStyles.checkboxes}>
                <div className={menuItemStyles.checkbox_label}>
                  <label><input type="checkbox" name="breakfast"  onChange={categoryHandleChange} checked={selectedCategory.breakfast}/> <span>Breakfast</span></label>
                </div>
                <div className={menuItemStyles.checkbox_label}>
                  <label><input type="checkbox" name="balanced"  onChange={categoryHandleChange} checked={selectedCategory.balanced}/> <span>Balanced</span></label>
                </div>
                <div className={menuItemStyles.checkbox_label}>
                  <label><input type="checkbox" name="lowcarb"  onChange={categoryHandleChange} checked={selectedCategory.lowcarb}/> <span>Low Carb</span></label>
                </div>
                <div className={menuItemStyles.checkbox_label}>
                  <label><input type="checkbox" name="lite"  onChange={categoryHandleChange} checked={selectedCategory.lite}/> <span>Lite</span></label>
                </div>
              </div>
            </div> )
          : ''}
          <div className={`${menuItemStyles.quantitiesWrapper} mb-8`}>
            <div className={menuItemStyles.topBarQuantities}>
              {menuItems.map((product) => (
                <div key={product.id} className={`${menuItemStyles.buttonInner} px-3`}>
                  <span className={menuItemStyles.number}>
                    {getQuantityCountdown(product.id).quantity}
                  </span>{' '}
                  {product.title} Left
                 <div>
                  {!disableEditing && (
                    <div
                      className={`button button--tertiary primaryButton ${
                        getQuantityCountdown(product.id).quantity === getIntakeQuantity() ? 'disabled' : '' 
                      }`}
                      
                      onClick={() => (getQuantityCountdown(product.id).quantity === getIntakeQuantity() ? () => {} : handleResetCart())}
                      >
                      {"Clear selections"}
                    </div>
                  )}
                 </div>
                </div>
              ))}
            </div>
          </div>

          {menuItems.map((content) => (
            <div key={content.id}>
              <div className={menuItemStyles.listHeader}>
                <div className={menuItemStyles.title}>{content.title}</div>
              </div>
              <div className={`${menuItemStyles.cards} mb-10`}>
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
      <div className={menuItemStyles.buttonsRow}>
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
