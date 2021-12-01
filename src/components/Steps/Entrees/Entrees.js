import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTokens } from '../../../store/slices/rootSlice'
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

const FAQ_TYPE = 'entreeType'
const STEP_ID = 4

dayjs.extend(weekday)

const Entrees = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [entrees, setEntrees] = useState([])

  useEffect(() => {
    generateToken()
  }, [])

  const generateToken = async () => {
    const currentToken = await useGuestToken()
    if (currentToken) {
      console.log('NEW TOKEN>>>')
      dispatch(
        setTokens({
          ...state.tokens,
          guestToken: currentToken
        })
      )
    }

    getCurrentMenuItems(currentToken)
  }

  const getCurrentMenuItems = async (currentToken) => {
    let currentApiBundle = null
    const shopifyProduct = getSelectedBundle(state.bundle.breakfast.tag)
    // TODO: remove line
    console.log('current bundle')
    console.log(shopifyProduct)

    const { data } = await getBundle(currentToken, shopifyProduct.id)
    if (data.data.length > 0) {
      currentApiBundle = data.data[0]
    }

    const nextWeekSunday = dayjs()
      .weekday(7)
      .format('YYYY-MM-DDT00:00:00.000[Z]')
    const items = await getMenuItems(
      currentToken,
      currentApiBundle.id,
      nextWeekSunday
    )
    console.log('items>>>', items)
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
