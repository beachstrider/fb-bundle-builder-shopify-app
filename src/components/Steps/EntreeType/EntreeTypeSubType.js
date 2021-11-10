import React from 'react'
import { CardCheckMark } from '../Components/Cards'
import styles from './EntreeSubType.module.scss'

const EntreeTypeSubType = ({ isSelected, data, onClick }) => {
  return (
    <CardCheckMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{data.title}</div>
        <div className={styles.description}>
          <div>
            <div>{data.netCarbs}</div>
            <div>Net Carbs</div>
          </div>
          <div
            className={isSelected ? styles.selectedLine : styles.unselectedLine}
          >
            <div>{data.protein}</div>
            <div>Protein</div>
          </div>
          <div
            className={isSelected ? styles.selectedLine : styles.unselectedLine}
          >
            <div>{data.fat}</div>
            <div>Fat</div>
          </div>
          <div
            className={isSelected ? styles.selectedLine : styles.unselectedLine}
          >
            <div>{data.calories}</div>
            <div>Calories</div>
          </div>
        </div>
      </div>
    </CardCheckMark>
  )
}

export default EntreeTypeSubType
