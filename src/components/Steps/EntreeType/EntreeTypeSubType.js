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
        <div>
          {getBundleMetafield(metafields, METAFIELD_CALORIE_RANGE)?.value}
        </div>
        <div>Average Calories Per Meal</div>
        {/* TODO: change design */}
        {/* <div className={styles.description}>
          <div>
            <div>{data.netCarbs}</div>
            <div className={styles.label}>Net Carbs</div>
          </div>
          <div
            className={isSelected ? styles.selectedLine : styles.unselectedLine}
          >
            <div>{data.protein}</div>
            <div className={styles.label}>Protein</div>
          </div>
          <div
            className={isSelected ? styles.selectedLine : styles.unselectedLine}
          >
            <div>{data.fat}</div>
            <div className={styles.label}>Fat</div>
          </div>
          <div
            className={isSelected ? styles.selectedLine : styles.unselectedLine}
          >
            <div>{data.calories}</div>
            <div className={styles.label}>Calories</div>
          </div>
        </div> */}
      </div>
    </CardSelectionMark>
  )
}

export default EntreeTypeSubType
