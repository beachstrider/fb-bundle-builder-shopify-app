import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setTokens } from '../../../store/slices/rootSlice'
import CardQuantities from '../../Cards/CardQuantities'
import useGuestToken from '../../Hooks/useGuestToken'
import { getMenuItems, getSelectedBundle } from '../../Hooks'
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

  const getToken = async () => {
    const tokenResponse = await useGuestToken()
    if (tokenResponse.token) {
      dispatch(
        setTokens({
          ...state.tokens,
          guestToken: tokenResponse.token
        })
      )
    }
  }

  const getCurrentMenuItems = async () => {
    const currentBundle = getSelectedBundle(state.bundle.breakfast.tag)
    console.log('current bundle')
    console.log(currentBundle)
    // TODO: handle 401 status
    if (!state.tokens.guestToken) {
      await getToken()
    }

    const nextWeekSunday = dayjs()
      .weekday(7)
      .format('YYYY-MM-DDT00:00:00.000[Z]')
    const items = await getMenuItems(state.tokens.guestToken, nextWeekSunday)
    console.log('items>>>', items)
  }

  useEffect(() => {
    getCurrentMenuItems()
  }, [])

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

export default Entrees
