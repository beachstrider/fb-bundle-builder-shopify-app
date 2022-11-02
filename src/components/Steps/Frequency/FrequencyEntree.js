import React from 'react'
import { CardSelectionMark } from '../../Cards'
import styles from './Frequency.module.scss'
import settings from '../../../utils/settings'

const FrequencyEntree = ({ data, isSelected, onClick }) => {
  const modifyLunchDinner = settings().display().modifyLunchDinner;

  return (
    <CardSelectionMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.mealsWrapper}>
        <div className={styles.meal}>
          <div className={`${isSelected && styles.isSelected} textCenter`}>
            <div className={`${styles.title} ${styles.fontBold}`}>
              {data.name}
            </div>
            { modifyLunchDinner === true ? '' : (
              <div className={styles.subTitle}>Lunch/Dinner</div>
            )}
            {settings().display().mealsStartingAt ? (
              <div className={styles.breakfastStartingAt}>
                <div className={styles.startingAt}>Starting at:</div>
                <div className={styles.breakFastPricing}>
                  ${data.price}/Meal
                </div>
              </div>
            ) : (
              <div className={styles.price}>${data.price}/Meal</div>
            )}
          </div>
        </div>
      </div>
    </CardSelectionMark>
  )
}

export default FrequencyEntree
