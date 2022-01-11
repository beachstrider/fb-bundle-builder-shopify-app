import minMax from 'dayjs/plugin/minMax'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import isBetween from 'dayjs/plugin/isBetween'
import * as dayjs from 'dayjs'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(minMax)
dayjs.extend(isBetween)

const DEFAULT_TIME_ZONE = 'America/Denver'

const findWeekDayBetween = (
  weekDay,
  startDate,
  endDate,
  tz = DEFAULT_TIME_ZONE
) => {
  let currentDate = dayjs(startDate).tz(tz)
  let date = null
  while (dayjs(currentDate).isBetween(startDate, dayjs(endDate), 'day', '[]')) {
    if (currentDate.day() === weekDay) {
      date = currentDate
    }
    currentDate = currentDate.add(1, 'day')
  }

  return date
}

const getCutOffDate = (
  deliveryDate,
  timezone = DEFAULT_TIME_ZONE,
  format = 'YYYY-MM-DDT23:59:00.000Z',
  cutOffDays = 4
) => {
  const newDate = deliveryDate.utc().subtract(cutOffDays, 'day')
  return dayjs.tz(newDate, timezone).format(format)
}

export { findWeekDayBetween, getCutOffDate }
