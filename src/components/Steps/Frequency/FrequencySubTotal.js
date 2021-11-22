import React, { useEffect, useState } from 'react'
import { FrequencySubTotalItem } from '.'
import styles from './Frequency.module.scss'

const FrequencySubTotal = ({ entreePrice, breakfastPrice }) => {
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const calculatedTotal =
      Number.parseFloat(entreePrice) +
      (isNaN(breakfastPrice) ? 0 : Number.parseFloat(breakfastPrice))

    setTotal(calculatedTotal)
  }, [entreePrice, breakfastPrice])

  return (
    <div className={styles.column}>
      <div>
        <FrequencySubTotalItem label="Per Entree" price={entreePrice} />
        <FrequencySubTotalItem label="Breakfasts" price={breakfastPrice} />
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
