import React from 'react'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { CardSelectionMark } from '../../Cards'
import styles from './LocationDate.module.scss'

dayjs.extend(advancedFormat)
dayjs.extend(weekday)

const LocationDate = ({ date, onClick, selectedDate }) => {
  return (
    <CardSelectionMark
      isSelected={date.isSelected || selectedDate.id === date.id}
      onClick={() => onClick(date)}
      isDisabled={date.disabled}
    >
      <div className={styles.wrapper}>
        <div className={styles.weekDay}>{dayjs(date.date).format('dddd')}</div>
        <div className={styles.month}>{dayjs(date.date).format('MMMM')}</div>
        <div className={styles.dateNumber}>
          {dayjs(date.date).format('D')}
          {dayjs(date.date)
            .format('Do')
            .match(/[a-zA-Z]+/g)}
        </div>
      </div>
    </CardSelectionMark>
  )
}

export default LocationDate
