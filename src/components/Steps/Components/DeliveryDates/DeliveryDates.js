import React, { useEffect } from 'react'
import { LocationDate } from '../../Location'
import TopTitle from '../../Components/TopTitle'
import styles from './DeliveryDates.module.scss'
import { smoothScrollingToId } from '../../../../utils'
import { useSelector } from 'react-redux'

const DeliveryDates = ({
  dates,
  onClick,
  selectedDate,
  className = null,
  autoScrollDown = false
}) => {
  console.log('DeliveryDates', dates)
  const isQF =  process.env.STORE_SETTINGS_KEY === 'quickfresh';
  const state = useSelector((state) => state)

  useEffect(() => {
    if (autoScrollDown) {
      setTimeout(() => {
        smoothScrollingToId('deliveryDateSection')
      }, 500)
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
            {dates.map((date) =>
              {
                if (isQF && state.entreeType.name === 'low-carb'){
                  if (new Date(date.date).getDay() === 4){
                    return (
                      <div key={date.id}>
                        <LocationDate
                          date={date}
                          selectedDate={selectedDate}
                          onClick={() => onClick(date)}
                        />
                      </div>
                    )
                  }else {
                    return '';
                  }
                }else{
                  return (
                    <div key={date.id}>
                      <LocationDate
                        date={date}
                        selectedDate={selectedDate}
                        onClick={() => onClick(date)}
                      />
                    </div>
                  )
                }

              }
            )}
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
