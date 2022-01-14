import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType,
    setTokens
  } from '../../../store/slices/rootSlice'
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import { MenuItemCard } from '../Components/MenuItemCard'
import { useUserToken } from '../../Hooks';
import {
  ChevronRightMinor,
  ChevronLeftMinor
} from '@shopify/polaris-icons';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import utc from 'dayjs/plugin/utc'
import * as dayjs from 'dayjs';
import { 
  request,
  getOrderTrackingUrl,
  buildProductArrayFromVariant,
  buildProductArrayFromId,
  findWeekDayBetween, 
  getCutOffDate
} from '../../../utils';
import { Spinner } from '../../Global';

import Toast from '../../Global/Toast';

dayjs.extend(isSameOrAfter)
dayjs.extend(utc)

const TOTAL_WEEKS_DISPLAY = 3
const STATUS_PENDING = 'pending'
const STATUS_LOCKED = 'locked'
const STATUS_SENT = 'sent'

function useQuery () {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const Dashboard = () => {

  if(!shopCustomer || shopCustomer.id === 0){
    window.location = `https://${shopDomain}/account`
  }

  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const query = useQuery()
  const [active, setActive] = React.useState([]);
  const [limit, setLimit] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([])
  const [weeksMenu, setWeeksMenu] = React.useState([])
  const [loading, setLoading] = React.useState(true);

  React.useEffect( () => {
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    getData()    
}, []);


const getData = async () => {
  if (!state.tokens.userToken) {
    const thisToken = await getToken();    
    await getOrdersToShow(thisToken)
  } else {
    await getOrdersToShow(state.tokens.userToken);
  }
}

  const getToken = async () => {
    const tokenResponse = await useUserToken();
    if (tokenResponse.token) {
      dispatch(
        setTokens({
          ...state.tokens,
          userToken: tokenResponse.token
        })
      )
      return tokenResponse.token
    }
  }

  const getOrdersToShow = async (token) => {
    const activeWeeksArr = []
    const activeWeeksLimit = []
    const weeksMenu = []
    const subscriptionArray = {};

    const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions`, { method: 'get', data: '', headers: { authorization: `Bearer ${token}` }}, 3)

    if(subApi.data.data){
      // format: 2022-01-15T23:00:00.000-08:00
      const forcedDate = query.get('forced_date') && dayjs(query.get('forced_date'))
      const todayDate = process.env.ENVIRONMENT !== 'production' && forcedDate ? forcedDate : dayjs()
      // const todayDate = process.env.ENVIRONMENT !== 'production' && query.get('forced_date') ? dayjs(query.get('forced_date')) : dayjs()

      console.log('query string:', query.get('forced_date'))
      console.log('todayDate:', todayDate)
      
      for (const sub of subApi.data.data) {
        const subscriptionOrders = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${sub.id}/orders`, { method: 'get', data: '', headers: { authorization: `Bearer ${token}` }}, 3)
        const configData = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${sub.bundle_id}/configurations`, { method: 'get', data: '', headers: { authorization:`Bearer ${token}` }}, 3)
        if(configData.data.data.length > 0){
          for( const config of configData.data.data) {
            let subCount = 0;
            for (const content of config.contents) {
              const dayOfTheWeek = dayjs(content.deliver_after.split('T')[0]).day()
              const today = dayjs().day(dayOfTheWeek).format('YYYY-MM-DD')
              const displayDate = dayjs(content.deliver_after.split('T')[0]).format('YYYY-MM-DD')
              
              // find delivery date between range
              const deliveryDate = findWeekDayBetween(sub.delivery_day, content.deliver_after, content.deliver_before)
              const cutoffDate = getCutOffDate(deliveryDate)
              console.log('deliveryDate:', deliveryDate)
              console.log('Cut off date:', cutoffDate)

              if(subCount < TOTAL_WEEKS_DISPLAY && dayjs(displayDate).isSameOrAfter(dayjs(today))){
                const orderedItems = subscriptionOrders.data.data.filter(ord => ord.bundle_configuration_content.deliver_after === content.deliver_after);
                const subscriptionObjKey = content.deliver_after.split('T')[0]
                
                if (orderedItems.length !== 0 || subCount !== 0) {
                  if(!weeksMenu.includes(dayjs(content.deliver_after.split('T')[0]).format('YYYY-MM-DD'))){
                    weeksMenu.push(dayjs(content.deliver_after).utc().format('YYYY-MM-DD'))
                    subscriptionArray[subscriptionObjKey] = {}
                    subscriptionArray[subscriptionObjKey].items = []
                  }
                  
                  if(orderedItems.length > 0) {
                    const orderFound = orderedItems[0]
                    if(subscriptionArray[subscriptionObjKey]){
                      let thisItemsArray = [];
                      for(const order of orderedItems){
                        const prodArr = await buildProductArrayFromVariant(order.items, sub.subscription_sub_type, shopProducts);
                        thisItemsArray = thisItemsArray.concat(prodArr);
                      }                        
                        // TODO: remove logs
                        console.log('orderFound (if block)', orderFound)
                        console.log('subscriptionObjKey: ', subscriptionObjKey)
                        console.log('thisItemsArray: ', thisItemsArray)
                        subscriptionArray[subscriptionObjKey].subId = sub.id;
                        subscriptionArray[subscriptionObjKey].deliveryDay = sub.delivery_day;
                        subscriptionArray[subscriptionObjKey].items = thisItemsArray;
                        subscriptionArray[subscriptionObjKey].status = orderFound.platform_order_id !== null 
                          ? STATUS_SENT
                          : todayDate.isSameOrAfter(cutoffDate) ? STATUS_LOCKED : STATUS_PENDING;
                        subscriptionArray[subscriptionObjKey].subscriptionDate = dayjs(subscriptionObjKey).format('YYYY-MM-DD');
                        subscriptionArray[subscriptionObjKey].queryDate = content.deliver_after
                        if(orderFound.platform_order_id !== null){
                          subscriptionArray[subscriptionObjKey].trackingUrl = await getOrderTrackingUrl(orderFound.platform_order_id, shopCustomer);
                        }
                    }
                  } else {
                    const configContentsData = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${config.bundle_id}/configurations/${config.id}/contents/${content.id}/products?is_default=1`, { method: 'get', data: '', headers: { authorization: `Bearer ${token}` }}, 3)
                    const thisProductsArray = await buildProductArrayFromId(configContentsData.data.data, sub.subscription_sub_type, shopProducts);
                    // TODO: remove logs
                    console.log('(else block)')
                    console.log('subscriptionObjKey: ', subscriptionObjKey)
                    console.log('thisProductsArray: ', thisProductsArray)
                    
                    subscriptionArray[subscriptionObjKey].subId = sub.id;
                    subscriptionArray[subscriptionObjKey].items = subscriptionArray[subscriptionObjKey].items.concat(thisProductsArray);
                    subscriptionArray[subscriptionObjKey].status = todayDate.isSameOrAfter(cutoffDate) ?  STATUS_LOCKED : STATUS_PENDING;
                    subscriptionArray[subscriptionObjKey].subscriptionDate = dayjs(subscriptionObjKey).format('YYYY-MM-DD')
                    subscriptionArray[subscriptionObjKey].queryDate = content.deliver_after

                  }
                  
                }
                subCount++
              }
            }
          }
        }
      }
    }

    let count = 0
    for (const [key, value] of Object.entries(subscriptionArray)) {
      activeWeeksLimit.push(5)
      if(query.get("date") !== null){
        if(key === query.get("date")){
          activeWeeksArr.push(value)
        }
      } else {
        if(count < 2){
          count++
          activeWeeksArr.push(value)
        }
      }
    }
    console.log('subscriptionArray: ', subscriptionArray)
    console.log('activeWeeksArr >>>', activeWeeksArr)
    setSubscriptions(subscriptionArray);
    setWeeksMenu(weeksMenu)
    setActive(activeWeeksArr)
    setLimit(activeWeeksLimit)
    setLoading(false)
  }

  const handleChange = (week) => {
    const subDate = dayjs(week).format('YYYY-MM-DD');
    const newActive = [];
    newActive.push(subscriptions[subDate])    
    if(newActive.length > 0){
      setActive(newActive)
      const newLimitArr = [];
      for(let i = 0; i < newActive.length; i ++){
        newLimitArr.push(5)
      }
      setLimit(newLimitArr)
    }
    
  }

  const resetLimit = (spot) => {
    const newLimit = [];
    limit.forEach((i, index) => {
      if(index === spot ){
        newLimit.push(40)
      } else {
        newLimit.push(5)
      }
    });
    setLimit(newLimit);
  }

  const closeLimit = (spot) => {
    const newLimit = [];
    limit.forEach((i, index) => {
      if(index === spot ){
        newLimit.push(5)
      } else {
        newLimit.push(5)
      }
    });
    setLimit(newLimit);
  }

  if (loading) {

    return (
      <Spinner label="Loading..." />
    )
  }

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.header}>
        <div className={styles.nameHeader}>
            <h1 className={styles.userName}>
                Hi {shopCustomer.firstName}!
            </h1>
        </div>
        <div className={styles.weekMenu}>
            <p className={styles.weekMenuLabel}>Select Week</p>
              <div className={`buttons ${styles.weekMenuItems}`}>
                {weeksMenu.map((date, index) => {                
                  return ( <button key={index} onClick={() => handleChange(date)} className={ active.filter( a => a.subscriptionDate === date).length > 0 ? "primaryButton largeButton" : "secondaryButton largeButton"}>{dayjs(date).format('MMM DD')}</button> )
                })}
              </div>            
        </div>
      </div>

      {active.length > 0 ? (
      <div className="contentWrapper mt-10">
        {active.map((sub, idx) => (
          <div key={idx} className={styles.subscriptionRow}>
            <div className={styles.menuRow}>
              <div className={styles.headerWthLink}>
                <h3>Delivering Week of {dayjs(sub.subscriptionDate).format('MMM DD')}</h3>
                {sub.status === 'sent' ? <a href={sub.trackingUrl} className={styles.primaryLink}>Track Package</a> : ''}
              </div>
              {sub.status === 'sent' || sub.status === 'locked' ? <Link to={`/order-history?date=${sub.queryDate}`} className="secondaryButton">Order Summary</Link>  : <Link to={`/edit-order/${sub.subId}?date=${sub.queryDate}`} className="secondaryButton">Edit Order</Link>}
            </div>
            {sub.items.length > 0 ? (
            <div className={styles.accountMenuRow}>
              {sub.items.map((item, index) => (
                index < limit[idx] ? <MenuItemCard key={index} title={item.title} image={item.platform_img} quantity={item.quantity} type={item.type} /> : ''
              ))}

              {limit[idx] === 5 ? (
                <Link to="#" onClick={() => resetLimit(idx)} className={styles.viewAllLink}>
                  See All <ChevronRightMinor />
                </Link>
              ) : (
                <Link to="#" onClick={() => closeLimit(idx)} className={styles.viewAllLink}>
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
          <p>To sign up for a subscription please purchase a subscription <Link to="/">here</Link>.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
