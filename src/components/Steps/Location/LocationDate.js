import React from 'react'
import { CardCrossedLine } from '../Components/Cards'
import styles from './LocationDate.module.scss'

const LocationDate = ({ data, onClick }) => {
  return (
    <CardCrossedLine isSelected={data.isSelected} onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={styles.weekDay}>{data.weekDay}</div>
        <div className={styles.month}>{data.month}</div>
        <div>
          <div className={styles.dateWrapper}>
            <div className={styles.dateNumber}>{data.day}</div>
            <div className={styles.ordinal}>{data.ordinal}</div>
          </div>
        </div>
      </div>
    </CardCrossedLine>
  )
}

export default LocationDate
