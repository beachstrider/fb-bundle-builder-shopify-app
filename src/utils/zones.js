import dayjs from 'dayjs'
import weekday from 'dayjs/plugin/weekday'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

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

const getConfigurationContent = async (
  date,
  getBundleConfiguration,
  state,
  bundleId,
  configurationId
) => {
  const bundleConfiguration = await getBundleConfiguration(
    state.tokens.guestToken,
    bundleId,
    configurationId
  )

  let result = null

  if (bundleConfiguration) {
    bundleConfiguration.data?.data.contents.forEach((content) => {
      const dateNow = new Date(date)
      const displayAfter = new Date(content.display_after)
      const displayBefore = new Date(content.display_before)

      if (dateNow > displayAfter && dateNow < displayBefore) {
        result = { ...content }
      }
    })
  }
  return result
}

export {
  availableDeliveryDays,
  findZipCode,
  getConfigurationContent,
  mapDeliveryDays
}
