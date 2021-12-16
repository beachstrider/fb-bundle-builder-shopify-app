import React from 'react'
import { LocationDate } from '../../Location'
import styles from './DeliveryDates.module.scss'

const DeliveryDates = ({ title, dates, onClick, className = null }) => {
  return (
    <div className={`${styles.wrapper} ${className && className}`}>
      <div className={`${styles.title} mt-10 mb-5`}>{title}</div>
      <div className={styles.rows}>
        {dates.map((data) => (
          <div key={data.id}>
            <LocationDate data={data} onClick={() => onClick(data)} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryDates
