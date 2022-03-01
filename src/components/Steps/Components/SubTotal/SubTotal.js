import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { cart } from '../../../../utils'
import styles from './SubTotal.module.scss'

const SubTotal = ({
  entreePrice,
  breakfastPrice,
  shippingPrice,
  entreesQuantity,
  breakfastsQuantity,
  backgroundImage = null
}) => {
  const [total, setTotal] = useState(0)
  const state = useSelector((state) => state)
  const cartUtility = cart(state)

  useEffect(() => {
    const subTotal = cartUtility.calculateSubTotal(
      entreePrice,
      breakfastPrice,
      entreesQuantity,
      breakfastsQuantity,
      shippingPrice
    )

    setTotal(subTotal)
  }, [entreePrice, breakfastPrice])

  const getBreakfastsPrice = () =>
    isNaN(breakfastPrice) ? breakfastPrice : breakfastPrice
  const getMealsPrice = () => entreePrice
  const getBreakfastsQuantity = () =>
    isNaN(breakfastPrice) ? '' : `(x${Number(breakfastsQuantity)})`
  const getMealsQuantity = () => `(x${Number(entreesQuantity)})`

  const items = [
    {
      label: `Price Per Meal ${getMealsQuantity()}`,
      price: getMealsPrice()
    },
    {
      label: `Price Per Breakfast ${getBreakfastsQuantity()}`,
      price: getBreakfastsPrice()
    },
    {
      label: 'Shipping',
      price: shippingPrice
    }
  ]

  return (
    <div className={styles.wrapper}>
      {backgroundImage && (
        <div
          className={styles.image}
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          &nbsp;
        </div>
      )}
      {items.map((item, index) => (
        <div key={index} className={styles.lineItem}>
          <div className={styles.label}>{item.label}</div>
          <div className={styles.price}>
            {isNaN(item.price)
              ? String(item.price)
              : `$${Number.parseFloat(item.price).toFixed(2)}`}
          </div>
        </div>
      ))}
      <div className={styles.divider}>&nbsp;</div>
      <div className={`${styles.lineItem} ${styles.lineItemTotal}`}>
        <div className={styles.label}>Weekly Total</div>
        <div className={styles.totalPrice}>
          ${Number.parseFloat(total).toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default SubTotal
