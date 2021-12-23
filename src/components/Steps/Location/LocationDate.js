import React from 'react'
import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import { CardCrossedLine } from '../../Cards'
import styles from './LocationDate.module.scss'

dayjs.extend(advancedFormat)
dayjs.extend(weekday)

const LocationDate = ({ data, onClick, todayDate = dayjs() }) => {
  const getDay = (weekDay) => dayjs(todayDate).weekday(weekDay).add(1, 'week')

  return (
    <CardCrossedLine
      isSelected={data.isSelected}
      onClick={onClick}
      isDisabled={data.disabled}
    >
      <div className={styles.wrapper}>
        <div className={styles.weekDay}>{getDay(data.day).format('dddd')}</div>
        <div className={styles.month}>{getDay(data.day).format('MMMM')}</div>
        <div>
          <div className={styles.dateWrapper}>
            <div className={styles.dateNumber}>
              {getDay(data.day).format('DD')}
            </div>
            <div className={styles.ordinal}>
              {getDay(data.day)
                .format('Do')
                .match(/[a-zA-Z]+/g)}
            </div>
          </div>
        </div>
      </div>
    </CardCrossedLine>
  )
}

export default LocationDate
