import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  displayHeader,
  displayFooter,
  selectFaqType,
  setTokens,
  reset,
  setEmail
} from '../../../store/slices/rootSlice'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import { MenuItemCard } from '../Components/MenuItemCard'
import {
  getActiveSubscriptions,
  getDefaultProducts,
  getSubscriptionOrders,
  useUserToken
} from '../../Hooks'
import { ChevronRightMinor, ChevronLeftMinor } from '@shopify/polaris-icons'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import utc from 'dayjs/plugin/utc'
import * as dayjs from 'dayjs'
import {
  request,
  getOrderTrackingUrl,
  buildProductArrayFromVariant,
  buildProductArrayFromId,
  findWeekDayBetween,
  getCutOffDate,
  getTodayDate,
  sortDatesArray,
  uniqueArray,
  sortByDateProperty,
  sortObjectKeys
} from '../../../utils'
import { Spinner } from '../../Global'
import { clearLocalStorage } from '../../../store/store'
import {
  STATUS_LOCKED,
  STATUS_PENDING,
  STATUS_SENT
} from '../../../constants/order'

import Toast from '../../Global/Toast'
import WeekActions from '../Components/WeekActions'

dayjs.extend(isSameOrAfter)
dayjs.extend(utc)

const TOTAL_WEEKS_DISPLAY = 4
const TOTAL_WEEKS_PER_PAGE = 2

function useQuery() {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const Dashboard = () => {
  if (!shopCustomer || shopCustomer.id === 0) {
    window.location = `https://${shopDomain}/account`
  }

  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const query = useQuery()
  const [active, setActive] = React.useState([])
  const [limit, setLimit] = React.useState([])
  const [subscriptions, setSubscriptions] = React.useState([])
  const [weeksMenu, setWeeksMenu] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  const todayDate = getTodayDate()
  console.log('todayDate:', todayDate)

  React.useEffect(() => {
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    getData()
  }, [])

  const clearState = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        clearLocalStorage()
        dispatch(reset())
        resolve('ok')
      }, 1000)
    })

  const getData = async () => {
    console.log('-----getData-----')
    console.log('shopCustomer', shopCustomer, 'state', state)
    if (shopCustomer.email !== state.email || !state.tokens.userToken) {
      console.log('Enter If')
      const userToken = await getToken()
      console.log('userToken', userToken)
      console.log('----state before clearState----', state)
      await clearState()
      console.log('----state after clearState----', state)
      await getOrdersToShow(userToken)
    } else {
      console.log('enter else', state.tokens.userToken)
      await getOrdersToShow(state.tokens.userToken)
    }
    dispatch(setEmail(shopCustomer?.email || ''))
  }

  const getToken = async () => {
    const tokenResponse = await useUserToken()
    console.log('----tokenResponse----', tokenResponse)
    if (tokenResponse.token) {
      console.log('---tokenResponse inside if----')
      dispatch(
        setTokens({
          ...state.tokens,
          userToken: tokenResponse.token
        })
      )
      return tokenResponse.token
    }
  }

  const createWeekList = (weeksMenu, deliverAfterDate) => {
    if (!weeksMenu.includes(dayjs(deliverAfterDate).format('YYYY-MM-DD'))) {
      weeksMenu.push(dayjs.utc(deliverAfterDate).format('YYYY-MM-DD'))
    }

    return weeksMenu
  }

  const mapWeeksToDisplay = (subscriptions, date) => {
    let count = 0
    const items = []

    for (const [key, value] of Object.entries(subscriptions)) {
      if (date !== null) {
        if (key === date) {
          items.push(value)
        }
      } else {
        if (count < TOTAL_WEEKS_PER_PAGE) {
          items.push(value)
          count++
        }
      }
    }

    return items
  }

  const getOrdersToShow = async (token) => {
    console.log('----getOrdersToShow----')
    const activeWeeksArr = []
    const activeWeeksLimit = []
    const weeksMenu = []
    const subscriptionArray = {}

    const subApi = await getActiveSubscriptions(token)
    console.log('----subApi----', subApi)
    if (subApi.data.data) {
      for (const sub of subApi.data.data) {
        const subscriptionOrders = await getSubscriptionOrders(token, sub.id)
        console.log('----sub----', sub)
        console.log('----subscriptionOrders----', subscriptionOrders)
        const configData = await request(
          `${process.env.PROXY_APP_URL}/bundle-api/bundles/${sub.bundle_id}/configurations`,
          {
            method: 'get',
            data: '',
            headers: { authorization: `Bearer ${token}` }
          }
        )
        console.log('----configData----', configData)
        if (configData.data.data.length > 0) {
          for (const config of configData.data.data) {
            let subCount = 0
            for (const content of config.contents) {
              // find delivery date between range
              const deliveryDate = findWeekDayBetween(
                sub.delivery_day,
                content.deliver_after,
                content.deliver_before
              )
              const cutoffDate = getCutOffDate(deliveryDate)
              const firstOrder = shopCustomer.orders[0] || null
              console.log('----firstOrder----', shopCustomer.orders)
              const firstOrderDate =
                (firstOrder && dayjs(firstOrder.orderDate).utc()) ||
                dayjs().utc()

              console.log('----subCount----', subCount)
              console.log(
                '----deliverBefore day js----',
                dayjs(content.deliver_before).utc(),
                todayDate,
                dayjs(content.deliver_before).utc().isSameOrAfter(todayDate)
              )
              console.log(
                '----deliverAfter day js----',
                content.deliver_after,
                firstOrderDate,
                firstOrderDate.isSameOrBefore(content.deliver_after)
              )
              // validates the first order to avoid displaying the week where the order was placed (always show next week)
              if (
                subCount < TOTAL_WEEKS_DISPLAY &&
                dayjs(content.deliver_before).utc().isSameOrAfter(todayDate) &&
                firstOrderDate.isSameOrBefore(content.deliver_after)
              ) {
                const orderedItems = subscriptionOrders.data.data.filter(
                  (ord) =>
                    ord.bundle_configuration_content.deliver_after ===
                    content.deliver_after
                )

                const subscriptionObjKey = `${
                  content.deliver_after.split('T')[0]
                }_${sub.bundle_id}`

                // push date to weeksMenu
                console.log('----weeksMenu----', weeksMenu)
                console.log('----deliver_after----', content.deliver_after)
                createWeekList(weeksMenu, content.deliver_after)

                if (
                  !Object.keys(subscriptionArray).includes(subscriptionObjKey)
                ) {
                  subscriptionArray[subscriptionObjKey] = {}
                  subscriptionArray[subscriptionObjKey].items = []

                  if (orderedItems.length > 0) {
                    const orderFound = orderedItems[0]
                    if (subscriptionArray[subscriptionObjKey]) {
                      let thisItemsArray = []
                      for (const order of orderedItems) {
                        const prodArr = await buildProductArrayFromVariant(
                          order.items,
                          sub.subscription_sub_type,
                          shopProducts
                        )
                        thisItemsArray = thisItemsArray.concat(prodArr)
                      }
                      subscriptionArray[subscriptionObjKey].subId = sub.id
                      subscriptionArray[subscriptionObjKey].deliveryDay =
                        sub.delivery_day
                      subscriptionArray[subscriptionObjKey].items =
                        thisItemsArray
                      subscriptionArray[subscriptionObjKey].status =
                        orderFound.platform_order_id !== null
                          ? STATUS_SENT
                          : todayDate.isSameOrAfter(cutoffDate)
                          ? STATUS_LOCKED
                          : STATUS_PENDING
                      subscriptionArray[subscriptionObjKey].subscriptionDate =
                        dayjs(subscriptionObjKey.split('_')[0]).format(
                          'YYYY-MM-DD'
                        )
                      subscriptionArray[subscriptionObjKey].queryDate =
                        content.deliver_after
                      if (orderFound.platform_order_id !== null) {
                        subscriptionArray[subscriptionObjKey].trackingUrl =
                          await getOrderTrackingUrl(
                            orderFound.platform_order_id,
                            shopCustomer
                          )
                      }
                    }
                  } else {
                    const defaultProducts = await getDefaultProducts(
                      token,
                      config.bundle_id,
                      config.id,
                      content.id
                    )
                    const thisProductsArray = await buildProductArrayFromId(
                      defaultProducts.data.data,
                      sub.subscription_sub_type,
                      shopProducts
                    )
                    subscriptionArray[subscriptionObjKey].subId = sub.id
                    subscriptionArray[subscriptionObjKey].items =
                      subscriptionArray[subscriptionObjKey].items.concat(
                        thisProductsArray
                      )
                    subscriptionArray[subscriptionObjKey].status =
                      todayDate.isSameOrAfter(cutoffDate)
                        ? STATUS_LOCKED
                        : STATUS_PENDING
                    subscriptionArray[subscriptionObjKey].subscriptionDate =
                      dayjs(subscriptionObjKey.split('_')[0]).format(
                        'YYYY-MM-DD'
                      )
                    subscriptionArray[subscriptionObjKey].queryDate =
                      content.deliver_after
                  }
                }
                subCount++
              }
            }
          }
        }
      }
    }

    const itemsToDisplay = mapWeeksToDisplay(
      sortObjectKeys(subscriptionArray),
      query.get('date')
    )
    itemsToDisplay.forEach((item) => {
      activeWeeksLimit.push(5)
      activeWeeksArr.push(item)
    })

    const sortedActiveWeeks = sortByDateProperty(
      activeWeeksArr,
      'subscriptionDate'
    )
    const uniqueValues = uniqueArray([...weeksMenu])
    const sortedDates = sortDatesArray(uniqueValues)
    console.log('----subscriptionArray----', subscriptionArray)
    setSubscriptions(subscriptionArray)
    console.log('----sortedDates----', sortedDates)
    setWeeksMenu(sortedDates)
    console.log('----sortedActiveWeeks----', sortedActiveWeeks)
    setActive(sortedActiveWeeks)
    console.log('----activeWeeksLimit----', activeWeeksLimit)
    setLimit(activeWeeksLimit)
    setLoading(false)
  }

  const handleChange = (week) => {
    const subDate = dayjs(week).format('YYYY-MM-DD')
    const newActive = []

    const filteredIndexes = Object.keys(subscriptions).filter((value) =>
      value.includes(subDate)
    )

    filteredIndexes.forEach((index) => {
      newActive.push(subscriptions[index])
    })
    if (newActive.length > 0) {
      setActive(newActive)
      const newLimitArr = []
      for (let i = 0; i < newActive.length; i++) {
        newLimitArr.push(5)
      }
      setLimit(newLimitArr)
    }
  }

  const resetLimit = (spot) => {
    const newLimit = []
    limit.forEach((i, index) => {
      if (index === spot) {
        newLimit.push(40)
      } else {
        newLimit.push(5)
      }
    })
    setLimit(newLimit)
  }

  const closeLimit = (spot) => {
    const newLimit = []
    limit.forEach((i, index) => {
      if (index === spot) {
        newLimit.push(5)
      } else {
        newLimit.push(5)
      }
    })
    setLimit(newLimit)
  }

  if (loading) {
    return <Spinner label="Loading..." />
  }

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.header}>
        <div className={styles.nameHeader}>
          <h1 className={styles.userName}>Hi {shopCustomer.firstName}!</h1>
        </div>
        <div className={styles.weekMenu}>
          {weeksMenu.length > 0 && (
            <>
              <p className={styles.weekMenuLabel}>Select Week</p>
              <div className={`buttons ${styles.weekMenuItems}`}>
                {weeksMenu.map((date, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => handleChange(date)}
                      className={
                        active.filter((a) => a.subscriptionDate === date)
                          .length > 0
                          ? 'primaryButton largeButton'
                          : 'secondaryButton largeButton'
                      }
                    >
                      {dayjs.utc(date).format('MMM DD')}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>

      {active.length > 0 ? (
        <div className="contentWrapper mt-10">
          {active.map((sub, idx) => (
            <div key={idx} className={styles.subscriptionRow}>
              <div className={styles.menuRow}>
                <div className={styles.headerWthLink}>
                  <h3>
                    Delivering Week of{' '}
                    {dayjs(sub.subscriptionDate).format('MMM DD')}
                  </h3>
                  {sub.status === 'sent' ? (
                    <a href={sub.trackingUrl} className={styles.primaryLink}>
                      Track Package
                    </a>
                  ) : (
                    ''
                  )}
                </div>
                <WeekActions
                  orderId={sub.subId}
                  date={sub.queryDate}
                  status={sub.status}
                />
              </div>
              {sub.items.length > 0 ? (
                <div className={styles.accountMenuRow}>
                  {sub.items.map((item, index) =>
                    index < limit[idx] ? (
                      <MenuItemCard
                        key={index}
                        title={item.title}
                        image={item.platform_img}
                        quantity={item.quantity}
                        type={item.type}
                      />
                    ) : (
                      ''
                    )
                  )}

                  {limit[idx] === 5 ? (
                    <Link
                      to="#"
                      onClick={() => resetLimit(idx)}
                      className={styles.viewAllLink}
                    >
                      See All <ChevronRightMinor />
                    </Link>
                  ) : (
                    <Link
                      to="#"
                      onClick={() => closeLimit(idx)}
                      className={styles.viewAllLink}
                    >
                      <ChevronLeftMinor /> Close
                    </Link>
                  )}
                </div>
              ) : (
                <div className={styles.emptyStateMessage}>
                  <h2>No items to choose</h2>
                  <p>Please come back soon to choose your menu items.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="contentWrapper textCenter">
          <h2>There are no custom bundle subscriptions to show</h2>
          <p>
            To sign up for a subscription please purchase a subscription{' '}
            <Link to="/">here</Link>.
          </p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
