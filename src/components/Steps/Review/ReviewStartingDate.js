import React from 'react'
import { formatUTCDate } from '../../../utils'

const ReviewStartingDate = ({ date }) => {
  console.log('date', date)
  return date ? <>Starting {formatUTCDate(date, 'MMMM DD, YYYY')}</> : null
}

export default ReviewStartingDate
