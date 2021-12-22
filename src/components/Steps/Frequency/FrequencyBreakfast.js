import React from 'react'
import { FrequencyWeeklyPrice } from '.'
import { CardCheckMark } from '../../Cards'
import { Icon } from '@shopify/polaris'
import { CircleDisabledMajor } from '@shopify/polaris-icons'
import styles from './Frequency.module.scss'

const FrequencyBreakfast = ({ data, quantity, isSelected, onClick }) => {
  const isNone = data.name === 'none'

  return (
    <CardCheckMark isSelected={isSelected} onClick={onClick}>
      <div className={`defaultWrapper ${styles.breakfast}`}>
        <div className={`${styles.centerRow} textCenter`}>
          <div className={`${styles.title} ${styles.fontBold}`}>
            {isNone ? (
              <div
                className={`${styles.noneIcon} ${
                  isSelected && styles.selectedIcon
                }`}
              >
                <Icon source={CircleDisabledMajor} color="base" />
              </div>
            ) : (
              data.name
            )}
          </div>
          <div className={styles.subtitle}>
            {isNone ? <div>&nbsp;</div> : 'Breakfasts'}
          </div>
          <FrequencyWeeklyPrice
            price={isNaN(data.price) ? data.price : data.price * quantity}
          />
        </div>
      </div>
    </CardCheckMark>
  )
}

export default FrequencyBreakfast
