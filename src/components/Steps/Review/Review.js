import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  getSelectedBundle,
  useShopifyCart,
  saveCart,
  withActiveStep
} from '../../Hooks'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import styles from './Review.module.scss'
import Loading from '../Components/Loading'
import MenuItemCard from '../../Account/Components/MenuItemCard/MenuItemCard'
import DeliveryDateModal from '../Components/DeliveryDatesModal/DeliveryDateModal'
import { getBundleByPlatformId } from '../../Hooks/withBundleApi'
import { clearLocalStorage } from '../../../store/store'
import { cart } from '../../../utils'
import Toast from '../../Global/Toast'

dayjs.extend(advancedFormat)
dayjs.extend(weekday)

const DEFAULT_ERROR_MESSAGE = 'There was an error. Please try again later'
const STEP_ID = 5

const Review = () => {
  const [isLoading, setIsLoading] = useState(false)
  const state = useSelector((state) => state)
  const [openEditDateModal, setOpenEditDateModal] = useState(false)
  const [platformCartToken, setPlatformCartToken] = useState('')
  const shopifyCart = useShopifyCart()
  const [errorMessage, setErrorMessage] = useState(false)
  const [showError, setShowError] = useState(false)
  const cartUtility = cart(state)

  useEffect(() => {
    getShopifyCartToken()
  }, [])

  useEffect(() => {
    if (state.triggerLastStep) {
      handleSubmit()
    }
  }, [state.triggerLastStep])

  const getDay = (weekDay) => dayjs().add(1, 'week').weekday(weekDay)

  const getShopifyCartToken = async () => {
    const token = await shopifyCart.getToken()
    setPlatformCartToken(token)
  }

  const getTotal = () => {
    return cartUtility.calculateSubTotal(
      state.bundle.price,
      state.bundle.breakfast.price,
      state.bundle.entreesQuantity,
      state.bundle.breakfastsQuantity
    )
  }

  const addShopifyCartItems = async () => {
    await shopifyCart.clearCart()

    try {
      const shopifyBundleProduct = getSelectedBundle(state.bundle.breakfast.tag)
      console.log('shopifyBundleProduct', shopifyBundleProduct)
      if (
        shopifyBundleProduct.variants &&
        shopifyBundleProduct.variants.length > 0
      ) {
        const variant = shopifyBundleProduct.variants[0]
        const sellingPlanId = variant.selling_plan_allocations[0].selling_plan_id;
        const response = await shopifyCart.create([
          {
            id: variant.id,
            selling_plan: sellingPlanId,
            quantity: 1,
            properties: {
              'Customer Id': shopCustomer?.id,
              'Cart Token': platformCartToken,
              'Delivery_Date': dayjs().day(state.location.deliveryDate.day).format('YYYY-MM-DD')
            }
          }
        ])
        console.log('add to cart response', response)
      } else {
        setShowError(true)
        return setErrorMessage(DEFAULT_ERROR_MESSAGE)
      }
    }catch (e){
      console.error(e)
    }
  }

  const handleSubmit = async () => {
    try {
      await addShopifyCartItems()

      const shopifyProduct = getSelectedBundle(state.bundle.breakfast.tag)
      const currentBundle = await getBundleByPlatformId(
        state.tokens.guestToken,
        shopifyProduct.id
      )

      if (currentBundle.data.data.length === 0) {
        return setErrorMessage(DEFAULT_ERROR_MESSAGE)
      }

      const mappedItems = state.cart.map((item) => ({
        bundle_configuration_content_id: item.configurationContentId,
        platform_product_variant_id: item.id,
        quantity: item.quantity
      }))

      await saveCart(
        state.tokens.guestToken,
        shopCustomer.id,
        platformCartToken,
        currentBundle.data.data[0].id,
        state.location.deliveryDate.day,
        state.entreeType.title.toLowerCase(),
        state.entreeSubType.title.toLowerCase(),
        mappedItems
      )
      clearLocalStorage()
      window.location.href = '/checkout'
    } catch (error) {
      setShowError(true)
      return setErrorMessage(DEFAULT_ERROR_MESSAGE)
    }
  }

  const closeAlert = () => {
    setShowError(false)
    setErrorMessage(false)
  }

  if (Number(shopCustomer.id) === 0 || state.bundle.weeklyPrice === 0) {
    return <Redirect push to="/steps/2" />
  }

  if (state.cart.length === 0) {
    return <Redirect push to="/steps/4" />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <div className="defaultWrapper">
        <div className={styles.wrapper}>
          <div className={`${styles.title} mb-7`}>Review Order</div>
          <div className={`${styles.topBarWrapper} mb-7`}>
            <div className={`${styles.card} ${styles.columns}`}>
              <div className={styles.title}>
                Delivery Day:{' '}
                <span className={styles.day}>
                  {getDay(state.location.deliveryDate.day).format('dddd')}{' '}
                </span>
                <span
                  className={styles.edit}
                  onClick={() => setOpenEditDateModal(true)}
                >
                  Edit
                </span>
              </div>
              <div className={styles.startingDate}>
                Starting{' '}
                {getDay(state.location.deliveryDate.day)
                  .add(1, 'week')
                  .format('MMM')}{' '}
                {getDay(state.location.deliveryDate.day)
                  .add(1, 'week')
                  .format('DD')}
                <span className={styles.ordinal}>
                  {getDay(state.location.deliveryDate.day)
                    .add(1, 'week')
                    .format('Do')
                    .match(/[a-zA-Z]+/g)}
                </span>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.title}>
                Total:
                <span className={styles.price}>${getTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className={styles.menuItemsWrapper}>
            {state.cart.map((item) => (
              <MenuItemCard
                key={item.id}
                image={item.images.length > 0 && item.images[0] ? item.images[0] : process.env.EMPTY_STATE_IMAGE}
                title={item.name}
                quantity={item.quantity}
                type={item.title}
                quantityLabel=""
              />
            ))}
          </div>
        </div>
      </div>
      {showError ? <Toast open={showError} status="Danger" message={errorMessage} autoDelete handleClose={closeAlert} /> : ''}
      <DeliveryDateModal
        open={openEditDateModal}
        close={() => setOpenEditDateModal(false)}
      />
    </>
  )
}

export default withActiveStep(Review, STEP_ID)
