import React from 'react'
import styles from './Frequency.module.scss'

const FrequencyWeeklyPrice = ({ price }) => {
  return (
    <div
      className={`${styles.xSmallFont} defaultWrapper ${styles.weeklyPrice}`}
    >
      {isNaN(price) ? (
        <div className={`${styles.mediumFont} ${styles.fontBold}`}>{price}</div>
      ) : (
        <>
          <div className={`${styles.dollarSign} textItalic`}>$</div>
          <div className={`${styles.price} textItalic`}>
            {Number.parseFloat(price).toFixed(2)}
          </div>
        </>
      )}
    </div>
  )
}

export default FrequencyWeeklyPrice
