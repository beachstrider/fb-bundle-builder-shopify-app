import React, { useEffect } from 'react'
import { LocationDate } from '../../Location'
import TopTitle from '../../Components/TopTitle'
import styles from './DeliveryDates.module.scss'
import { smoothScrollingToId } from '../../../../utils'

const DeliveryDates = ({
  dates,
  onClick,
  selectedDate,
  className = null,
  autoScrollDown = false
}) => {
  console.log('DeliveryDates', dates)

  useEffect(() => {
    if (autoScrollDown) {
      smoothScrollingToId('deliveryDateSection')
    }
  }, [])

  return (
    <div
      id="deliveryDateSection"
      className={`${styles.wrapper} ${className && className}`}
    >
      {dates.length > 0 ? (
        <div>
          <TopTitle
            className="mt-9 mb-2"
            title="Select a Delivery Date"
            subTitle="We can deliver fresh to you within one week!"
          />
          <div className={styles.rows}>
            {dates.map((date) => (
              <div key={date.id}>
                <LocationDate
                  date={date}
                  selectedDate={selectedDate}
                  onClick={() => onClick(date)}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={styles.noDatesAvailable}>
          Sorry there are no available delivery dates for your zip code
        </div>
      )}
    </div>
  )
}

export default DeliveryDates

