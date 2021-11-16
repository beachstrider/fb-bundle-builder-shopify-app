import React from 'react'
import { FrequencyWeeklyPrice } from '.'
import { CardCheckMark } from '../../Cards'
import styles from './Frequency.module.scss'

const FrequencyMainEntree = ({ data, isSelected, onClick }) => {
  return (
    <CardCheckMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.mainEntreeWrapper}>
        <div className={styles.entree}>
          <div
            className={`${styles.title} ${styles.fontBold} ${
              isSelected ? styles.isSelected : styles.isUnselected
            }`}
          >
            {data.name}
          </div>
          <div className={styles.xSmallFont}>{data.description}</div>
        </div>
        <div className={styles.centerRow}>
          <div className={`${styles.mediumFont} ${styles.fontBold}`}>
            ${Number.parseFloat(data.price).toFixed(2)}
          </div>
          <div className={styles.xSmallFont}>Per Entree</div>
        </div>
        <div className={styles.centerRow}>
          <div className={styles.xSmallFont}>Total Per Week</div>
          <FrequencyWeeklyPrice price={data.weeklyPrice} />
        </div>
      </div>
    </CardCheckMark>
  )
}

export default FrequencyMainEntree
