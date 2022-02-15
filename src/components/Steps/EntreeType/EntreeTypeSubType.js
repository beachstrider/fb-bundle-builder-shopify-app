import React from 'react'
import { CardSelectionMark } from '../../Cards'
import styles from './EntreeSubType.module.scss'

const EntreeTypeSubType = ({ isSelected, data, onClick }) => {
  return (
    <CardSelectionMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.description}>
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
        </div>
      </div>
    </CardSelectionMark>
  )
}

export default EntreeTypeSubType
