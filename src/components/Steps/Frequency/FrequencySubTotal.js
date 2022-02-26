import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FrequencySubTotalItem } from '.'
import { cart } from '../../../utils'
import styles from './Frequency.module.scss'

const FrequencySubTotal = ({
  entreePrice,
  breakfastPrice,
  entreesQuantity,
  breakfastsQuantity
}) => {
  const [total, setTotal] = useState(0)
  const state = useSelector((state) => state)
  const cartUtility = cart(state)

  useEffect(() => {
    const subTotal = cartUtility.calculateSubTotal(
      entreePrice,
      breakfastPrice,
      entreesQuantity,
      breakfastsQuantity
    )

    setTotal(subTotal)
  }, [entreePrice, breakfastPrice])

  return (
    <div className={styles.column}>
      <div>
        <FrequencySubTotalItem
          label="Entrees"
          price={entreePrice * entreesQuantity}
        />
        <FrequencySubTotalItem
          label="Breakfasts"
          price={
            isNaN(breakfastPrice)
              ? breakfastPrice
              : breakfastPrice * breakfastsQuantity
          }
        />
        <div className={styles.priceDivider}>&nbsp;</div>
        <div className={styles.prices}>
          <div className={styles.smallFont}>Weekly Total</div>
          <div className={`${styles.smallFont} ${styles.fontBold}`}>
            ${Number.parseFloat(total).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrequencySubTotal
