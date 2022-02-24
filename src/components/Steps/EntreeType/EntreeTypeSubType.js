import React from 'react'
import { CardSelectionMark } from '../../Cards'
import { METAFIELD_CALORIE_RANGE } from '../../../constants/bundles'
import { getBundleMetafield } from '../../../utils'
import styles from './EntreeSubType.module.scss'

const EntreeTypeSubType = ({ title, metafields, isSelected, onClick }) => {
  return (
    <CardSelectionMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>
          {getBundleMetafield(metafields, METAFIELD_CALORIE_RANGE)?.value}
        </div>
        <div className={styles.label}>Average Calories Per Meal</div>
      </div>
    </CardSelectionMark>
  )
}

export default EntreeTypeSubType
