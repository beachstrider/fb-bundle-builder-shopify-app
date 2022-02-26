import React from 'react'
import styles from './Frequency.module.scss'

const FrequencySubTotalItem = ({ label, price }) => (
  <div className={styles.prices}>
    <div>{label}</div>
    <div className={styles.fontBold}>
      {isNaN(price) ? String(price) : `$${Number.parseFloat(price).toFixed(2)}`}
    </div>
  </div>
)

export default FrequencySubTotalItem
