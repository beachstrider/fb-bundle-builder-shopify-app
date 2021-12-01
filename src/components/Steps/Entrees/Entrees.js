import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardQuantities from '../../Cards/CardQuantities'
import {
  getMenuItems,
  getSelectedBundle,
  getBundle,
  withActiveStep,
  useGuestToken
} from '../../Hooks'
import styles from './Entrees.module.scss'
import weekday from 'dayjs/plugin/weekday'
import dayjs from 'dayjs'
import { Spinner } from '@shopify/polaris'

const FAQ_TYPE = 'entreeType'
const STEP_ID = 4
const ENTREE_CONFIGURATION_TITLE = 'Entree'
const BREAKFAST_CONFIGURATION_TITLE = 'Breakfast'

dayjs.extend(weekday)

const Entrees = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [isLoading, setIsloading] = useState(false)
  const [entrees, setEntrees] = useState([])
  const [entreeQuantity, setEntreeQuantity] = useState(0)
  const [breakfast, setBreakfast] = useState([])
  const [breakfastQuantity, setBreakfastQuantity] = useState(0)

  useEffect(() => {
    getCurrentMenuItems()
  }, [])

  const getCurrentMenuItems = async () => {
    let currentApiBundle = null
    const shopifyProduct = getSelectedBundle(state.bundle.breakfast.tag)

    const { data } = await getBundle(state.tokens.guestToken, shopifyProduct.id)
    if (data.data.length > 0) {
      currentApiBundle = data.data[0]
    }

    const findTitle = (title, search) =>
      title.toLowerCase().includes(search.substr(1, 6))
    for (const configuration of currentApiBundle.configurations) {
      // search for part of the word ENTREE or BREAKFAST in the title
      if (findTitle(configuration.title, ENTREE_CONFIGURATION_TITLE)) {
        await getProducts(configuration, ENTREE_CONFIGURATION_TITLE, setEntrees)
      }

      if (findTitle(configuration.title, BREAKFAST_CONFIGURATION_TITLE)) {
        await getProducts(
          configuration,
          BREAKFAST_CONFIGURATION_TITLE,
          setBreakfast
        )
      }
    }
  }

  const getProducts = async (configuration, title, setContent) => {
    const nextWeekSunday = dayjs()
      .weekday(7)
      .format('YYYY-MM-DDT00:00:00.000[Z]')

    if (configuration.title.toLowerCase().includes(title.substr(1, 6))) {
      const response = await getMenuItems(
        state.tokens.guestToken,
        configuration.bundleId,
        configuration.id,
        `is_enabled=1&display_after=${nextWeekSunday}`
      )

      if (response.data?.data && response.data?.data.length > 0) {
        setContent(response.data.data[0])
        if (title === BREAKFAST_CONFIGURATION_TITLE) {
          setBreakfastQuantity(response.data.data[0].configuration.quantity)
        }
        if (title === ENTREE_CONFIGURATION_TITLE) {
          setEntreeQuantity(response.data.data[0].configuration.quantity)
        }
      }
    }
  }

  const filterShopifyVariants = () => {
    // TODO: next task
  }

  // TODO: get state from the store
  const [item, setItem] = useState({
    id: 1,
    title: 'Blackened Salmon',
    info: {
      fat: 25,
      carbs: 25,
      protein: 26,
      calories: 24
    },
    isSelected: true,
    image:
      'https://cdn.shopify.com/s/files/1/0596/3694/0985/files/keto-meal-001.png?v=1629490017',
    quantity: 0
  })

  // TODO: WIP
  const handleAddItem = () => {
    const newItem = { ...item, quantity: item.quantity + 1 }
    setItem(newItem)
  }

  const handleRemoveItem = () => {
    const newItem = { ...item, quantity: item.quantity - 1 }
    setItem(newItem)
  }

  if (isLoading) {
    // TODO: work in progress
    return (
      <div className="customSpinner">
        <Spinner accessibilityLabel="Loading page..." size="large" />
      </div>
    )
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <div className={`${styles.title} mb-7`}>Choose Entrees</div>
        <div className={`${styles.entrees} mb-10`}>
          {/* TODO: map list */}
          <CardQuantities
            title={item.title}
            image={item.image}
            info={item.info}
            isChecked={item.quantity > 0}
            quantity={item.quantity}
            onClick={handleAddItem}
            onAdd={handleAddItem}
            onRemove={handleRemoveItem}
          />
        </div>
      </div>
    </div>
  )
}

export default withActiveStep(Entrees, STEP_ID)
