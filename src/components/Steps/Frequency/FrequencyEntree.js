import React from 'react'
import { CardSelectionMark } from '../../Cards'
import styles from './Frequency.module.scss'

const FrequencyEntree = ({ data, isSelected, onClick }) => {
  return (
    <CardSelectionMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.mealsWrapper}>
        <div className={styles.meal}>
          <div className={`${isSelected && styles.isSelected} textCenter`}>
            <div className={`${styles.title} ${styles.fontBold}`}>
              {data.name}
            </div>
            <div className={styles.subTitle}>Lunch/Dinner</div>
            <div className={styles.price}>${data.price}/Meal</div>
          </div>
        </div>
      </div>
    </CardSelectionMark>
  )
}

export default FrequencyEntree
