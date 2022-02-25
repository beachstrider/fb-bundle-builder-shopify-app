import React from 'react'
import { LocationDate } from '../../Location'
import TopTitle from '../../Components/TopTitle'
import styles from './DeliveryDates.module.scss'

const DeliveryDates = ({ dates, onClick, todayDate, className = null }) => {
  return (
    <div className={`${styles.wrapper} ${className && className}`}>
      <TopTitle
        className="mt-9 mb-2"
        title="Select a Delivery Date"
        subTitle="We can deliver fresh to you within one week!"
      />
      <div className={styles.rows}>
        {dates.map((data) => (
          <div key={data.id}>
            <LocationDate
              data={data}
              todayDate={todayDate}
              onClick={() => onClick(data)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryDates
