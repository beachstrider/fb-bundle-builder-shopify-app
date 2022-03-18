import React from 'react'
import { CardSelectionMark } from '../../Cards'
import { Icon } from '@shopify/polaris'
import { CircleDisabledMajor } from '@shopify/polaris-icons'
import styles from './Frequency.module.scss'

const FrequencyBreakfast = ({ data, isSelected, onClick }) => {
  const isNone = data.name === 'none'

  const NoneCard = () => (
    <div
      className={`${
        isSelected ? styles.isSelected : styles.isUnselected
      } textCenter`}
    >
      <div className={`${styles.title} ${styles.fontBold}`}>
        <div
          className={`${styles.noneIcon} ${isSelected && styles.selectedIcon}`}
        >
          <Icon source={CircleDisabledMajor} color="base" />
        </div>
      </div>
      <div className={styles.noneSubTitle}>
        <div>Skip</div>
        <div>Breakfast</div>
      </div>
    </div>
  )

  const PricingCard = () => (
    <div
      className={`${
        isSelected ? styles.isSelected : styles.isUnselected
      } textCenter`}
    >
      <div className={`${styles.title} ${styles.fontBold}`}>{data.name}</div>
      <div className={styles.subTitle}>Breakfast</div>
      <div className={styles.breakfastStartingAt}>
        <div className={styles.startingAt}>Starting at:</div>
        <div className={styles.breakFastPricing}>${data.price}/Meal</div>
      </div>
    </div>
  )

  return (
    <CardSelectionMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.mealsWrapper}>
        <div className={styles.meal}>
          {isNone ? <NoneCard /> : <PricingCard />}
        </div>
      </div>
    </CardSelectionMark>
  )
}

export default FrequencyBreakfast
