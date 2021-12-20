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
  const [errorMessage, setErrorMessage] = useState('')

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

  const addShopifyCartItems = async () => {
    await shopifyCart.clearCart()

    const shopifyBundleProduct = getSelectedBundle(state.bundle.breakfast.tag)

    if (
      shopifyBundleProduct.variants &&
      shopifyBundleProduct.variants.length > 0
    ) {
      await shopifyCart.create([
        {
          id: shopifyBundleProduct.variants[0].id,
          quantity: 1,
          properties: {
            'Customer Id': shopCustomer?.id,
            'Cart Token': platformCartToken
          }
        }
      ])
    } else {
      return setErrorMessage(DEFAULT_ERROR_MESSAGE)
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
        mappedItems
      )

      clearLocalStorage()

      window.location.href = '/checkout'
    } catch (error) {
      return setErrorMessage(DEFAULT_ERROR_MESSAGE)
    }
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
                Starting {getDay(state.location.deliveryDate.day).format('MMM')}{' '}
                {getDay(state.location.deliveryDate.day).format('DD')}
                <span className={styles.ordinal}>
                  {getDay(state.location.deliveryDate.day)
                    .format('Do')
                    .match(/[a-zA-Z]+/g)}
                </span>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.title}>
                Total:
                <span className={styles.price}>
                  ${Number.parseFloat(state.bundle.weeklyPrice).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div className={styles.menuItemsWrapper}>
            {state.cart.map((item) => (
              <MenuItemCard
                key={item.id}
                image={item.images.length > 0 && item.images[0]}
                title={item.name}
                quantity={item.quantity}
                type={item.title}
                quantityLabel=""
              />
            ))}
          </div>
        </div>
      </div>
      <DeliveryDateModal
        open={openEditDateModal}
        close={() => setOpenEditDateModal(false)}
      />
    </>
  )
}

export default withActiveStep(Review, STEP_ID)
