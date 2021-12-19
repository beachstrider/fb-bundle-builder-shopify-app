import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(weekday)
dayjs.extend(isBetween)

const DAYS_IN_WEEK = 7

const findZipCode = (zones, zipCode) => {
  let result = null
  zones.forEach((zone) => {
    const found = zone.zipCodes.find((e) => Number(e) === Number(zipCode))
    if (found) {
      result = zone
    }
  })

  return result
}

const availableDeliveryDays = (zone, todayWeekNumber = new Date().getDay()) => {
  const deliveryDays = zone.deliveryDates.map((d) => d.day)
  const deliveryProcessTime = zone.leadTime
  const deliveryDaysForToday = deliveryDays.filter((deliveryDay) => {
    if (deliveryDay >= zone.earliestAvailableDay) {
      return deliveryDay + DAYS_IN_WEEK - todayWeekNumber >= deliveryProcessTime
    }
    return null
  })

  return deliveryDaysForToday
}

const mapDeliveryDays = (availableDays, deliveryDays) => {
  return deliveryDays.map((day) => ({
    ...day,
    disabled: !availableDays.includes(day.day)
  }))
}

const getNextWeekDates = async (
  getBundleConfiguration,
  state,
  bundleId,
  configurationId,
  weekStartDay = 0,
  weekEndDay = 6
) => {
  const bundleConfiguration = await getBundleConfiguration(
    state.tokens.guestToken,
    bundleId,
    configurationId
  )
  const nextWeek = dayjs().add(1, 'week')
  let content = null

  if (bundleConfiguration) {
    content = bundleConfiguration.data?.data.contents.filter((content) => {
      const currentDate = dayjs(
        dayjs(content.display_after).add(1, 'day')
      ).format('YYYY-MM-DD')

      if (
        dayjs(currentDate).isBetween(
          nextWeek.weekday(weekStartDay).format('YYYY-MM-DD'),
          nextWeek.weekday(weekEndDay).format('YYYY-MM-DD'),
          null,
          '[]'
        )
      ) {
        return content
      }
      return null
    })
  }
  return content
}

export { availableDeliveryDays, findZipCode, getNextWeekDates, mapDeliveryDays }
