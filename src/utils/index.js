import { isValidEmail } from './stringValidation'
import request from './request'
import smoothScrollingToId from './smoothScrollingToId'
import {
  availableDeliveryDays,
  findZipCode,
  isValidZipCode,
  getConfigurationContent,
  mapDeliveryDays
} from './zones'
import {
  filterShopifyProducts,
  filterShopifyVariants,
  getOrderTrackingUrl,
  buildProductArrayFromVariant,
  buildProductArrayFromId
} from './products'
import cart from './cart'
import {
  findWeekDayBetween,
  getCutOffDate,
  getTodayDate,
  sortDatesArray,
  getNextWeekDay,
  getShortDate
} from './dates'
import uniqueArray from './uniqueArray'

export {
  availableDeliveryDays,
  cart,
  filterShopifyProducts,
  findZipCode,
  filterShopifyVariants,
  getConfigurationContent,
  isValidEmail,
  isValidZipCode,
  mapDeliveryDays,
  request,
  smoothScrollingToId,
  getOrderTrackingUrl,
  buildProductArrayFromVariant,
  buildProductArrayFromId,
  findWeekDayBetween,
  getCutOffDate,
  getTodayDate,
  sortDatesArray,
  getNextWeekDay,
  uniqueArray,
  getShortDate
}
