import React, { useEffect, useState } from 'react'
import { getNextWeekDay } from '../../../utils'

const ReviewStartingDay = ({ day }) => {
  const [nextWeekDate, setNextWeekDate] = useState(null)

  useEffect(() => {
    if (day) {
      setNextWeekDate(getNextWeekDay(day))
    }
  }, [])

  return (
    nextWeekDate && (
      <>
        Starting {nextWeekDate.format('MMMM')} {nextWeekDate.format('DD')},{' '}
        {nextWeekDate.format('YYYY')}
      </>
    )
  )
}

export default ReviewStartingDay
