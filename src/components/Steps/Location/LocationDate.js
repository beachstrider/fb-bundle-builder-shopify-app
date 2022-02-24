import React from 'react'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { CardSelectionMark } from '../../Cards'
import styles from './LocationDate.module.scss'
import { getNextWeekDay } from '../../../utils'

dayjs.extend(advancedFormat)
dayjs.extend(weekday)

const LocationDate = ({ data, onClick, todayDate = dayjs() }) => {
  const getDay = (weekday) => getNextWeekDay(weekday, todayDate)

  return (
    <CardSelectionMark
      isSelected={data.isSelected}
      onClick={onClick}
      isDisabled={data.disabled}
    >
      <div className={styles.wrapper}>
        <div className={styles.weekDay}>{getDay(data.day).format('dddd')}</div>
        <div className={styles.month}>{getDay(data.day).format('MMMM')}</div>
        <div className={styles.dateNumber}>
          {getDay(data.day).format('DD')}
          {getDay(data.day)
            .format('Do')
            .match(/[a-zA-Z]+/g)}
        </div>
      </div>
    </CardSelectionMark>
  )
}

export default LocationDate
