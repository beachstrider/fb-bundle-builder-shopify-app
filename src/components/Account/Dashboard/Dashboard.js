import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType,
    setTokens
  } from '../../../store/slices/rootSlice'
import { Link, Redirect, useLocation } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import { MenuItemCard } from '../Components/MenuItemCard'
import { useUserToken } from '../../Hooks';
import {
  ChevronRightMinor,
  ChevronLeftMinor
} from '@shopify/polaris-icons';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as dayjs from 'dayjs';
import { request } from '../../../utils';
import { Spinner } from '../../Global';

dayjs.extend(isSameOrAfter);
const placeholderImg = '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif'

function useQuery () {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const Dashboard = () => {

  if(!shopCustomer || shopCustomer.id === 0){
    return <Redirect push to="/" />
  }



  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const query = useQuery();
  const [active, setActive] = React.useState([]);
  const [limit, setLimit] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([])
  const [weeksMenu, setWeeksMenu] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  // TODO make state call for user token for api


  React.useEffect( () => {
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    if (!state.tokens.userToken) {
      const thisToken = getToken();
      console.log('need new token')
      // TODO the token call isnt triggering the next call
      getOrdersToShow(thisToken);
    } else {
      console.log('token exists')
      getOrdersToShow(state.tokens.userToken);
    }
    
}, []);

  const getToken = async () => {
    const tokenResponse = await useUserToken();
    if (tokenResponse.token) {
      dispatch(
        setTokens({
          ...state.tokens,
          userToken: `Bearer ${tokenResponse.token}`
        })
      )
      return `Bearer ${tokenResponse.token}`
    }
  }

  const getOrdersToShow = async (token) => {
    const today = dayjs().subtract(1, 'week').day(0).format('YYYY-MM-DD');
    const activeWeeksArr = []
    const activeWeeksLimit = []
    const weeksMenu = []
    const subscriptionArray = {};

    const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions`, { method: 'get', data: '', headers: { authorization: token }}, 3)

    if(subApi.data.message && subApi.data.message !== 'Unexpected error.'){
      console.log('token is bad')
      const newToken = await getToken()
      console.log('got new token: ', newToken)
      getOrdersToShow(newToken)
    }

    if(subApi.data.data){
      for (const sub of subApi.data.data) {
        const subscriptionOrders = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${sub.bundle_id}/orders`, { method: 'get', data: '', headers: { authorization: token }}, 3)
        const configData = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${sub.bundle_id}/configurations`, { method: 'get', data: '', headers: { authorization: token }}, 3)
        if(configData.data.data.length > 0){
          for( const config of configData.data.data){
            let subCount = 0;
            for (const content of config.contents) {
              const displayDate = dayjs(content.display_after.split('T')[0]).format('YYYY-MM-DD')
              if(subCount < 4 && dayjs(displayDate).isSameOrAfter(dayjs(today))){
                const orderedItems = subscriptionOrders.data.data.filter(ord => ord.bundle_configuration_content.display_after === content.display_after);
                const subscriptionObjKey = content.display_after.split('T')[0]
                if(!weeksMenu.includes(dayjs(content.display_after.split('T')[0]).format('YYYY-MM-DD'))){
                  weeksMenu.push(dayjs(content.display_after.replace('T00:00:00.000Z', 'T12:00:00.000Z')).format('YYYY-MM-DD'))
                  subscriptionArray[subscriptionObjKey] = {}
                }
                // TODO check orders for items
                // TODO loop those and push
                // TODO call this for default products if missing /bundle-api/bundles/1/configurations/1/contents/1/products?is_default=1
                if(orderedItems.length > 0){
                  const orderFound = orderedItems[0]
                  if(subscriptionArray[subscriptionObjKey]){
                      const thisItemsArray = await buildProductArrayFromVariant(orderFound.items, sub.subscription_sub_type);
                      subscriptionArray[subscriptionObjKey].subId = sub.bundle_id;
                      subscriptionArray[subscriptionObjKey].items = thisItemsArray;
                      subscriptionArray[subscriptionObjKey].status = orderFound.platform_order_id !== null ? 'sent' : dayjs(content.deliver_after).isSameOrAfter(dayjs()) ? 'pending' : 'locked';
                      subscriptionArray[subscriptionObjKey].subscriptionDate = dayjs(subscriptionObjKey).format('YYYY-MM-DD');
                      if(orderFound.platform_order_id !== null){
                        subscriptionArray[subscriptionObjKey].trackingUrl = await getOrderTrackingUrl(orderFound.platform_order_id);
                      }
                  }
                } else {
                  const configContentsData = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${config.bundle_id}/configurations/${config.id}/contents/${content.id}/products?is_default=1`, { method: 'get', data: '', headers: { authorization: token }}, 3)
                  const thisProductsArray = await buildProductArrayFromId(configContentsData.data.data, sub.subscription_sub_type);
                  subscriptionArray[subscriptionObjKey].subId = sub.bundle_id;
                  subscriptionArray[subscriptionObjKey].items = thisProductsArray;
                  subscriptionArray[subscriptionObjKey].status = dayjs(content.deliver_after).isSameOrAfter(dayjs()) ?  'pending' : 'locked';
                  subscriptionArray[subscriptionObjKey].subscriptionDate = dayjs(subscriptionObjKey).format('YYYY-MM-DD')
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

  const getOrderTrackingUrl = async (orderId) => 
  new Promise((resolve) => {
    let orderLink = ''
    if (shopCustomer.orders.length > 0){
      const foundOrder = shopCustomer.orders.filter(ord => Number(ord.id) === orderId)
      if(foundOrder.length > 0){
        if(foundOrder[0].fulfillments.length > 0){
          orderLink = foundOrder[0].fulfillments[0].trackingUrl
        } else {
          orderLink = foundOrder[0].orderLink
        }
      }
    } 
    resolve(orderLink)
  })

  const buildProductArrayFromVariant = async (items, subType) => 
  new Promise((resolve) => {
    const foundProductArray = [];
    for( const variant of items){
      const variantId = variant.platform_product_variant_id;
      for (const product of shopProducts) {
        const variant = product.variants.filter( v => v.id === variantId)
        if(product.variants.filter( v => v.id === variantId).length > 0){
          foundProductArray.push({
            title: product.title, 
            platform_img: product.images.length > 0 ? product.images[0] : placeholderImg,
            quantity: variant.quantity,
            type: subType
          })
        }
      }
    }
    resolve(foundProductArray)
  })

  const buildProductArrayFromId = async (items, subType) => 
  new Promise((resolve) => {
    const foundProductArray = [];
    for( const item of items){
        const variant = shopProducts.filter( p => p.id === item.platform_product_id)[0]
        if(shopProducts.filter( p => p.id === item.platform_product_id).length > 0){
          foundProductArray.push({
            title: variant.title, 
            platform_img:  variant?.images.length > 0 ? variant.images[0] : placeholderImg,
            quantity: item.default_quantity,
            type: subType
          })
        }
    }
    resolve(foundProductArray)
  })

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
      <div className="contentWrapper">
        {active.map((sub, idx) => (
          <div key={idx} className={styles.subscriptionRow}>
            <div className={styles.menuRow}>
              <div className={styles.headerWthLink}>
                <h3>Week of {dayjs(sub.subscriptionDate).format('MMM DD')}</h3>
                {sub.status === 'sent' ? <a href={sub.trackingUrl} className={styles.primaryLink}>Track Package</a> : ''}
              </div>
              {sub.status === 'sent' || sub.status === 'locked' ? <Link to="/order-history" className="secondaryButton">Order Summary</Link>  : <Link to={`/edit-order/${sub.subId}?date=${sub.subscriptionDate}`} className="secondaryButton">Edit Order</Link>}
            </div>
            {sub.items.length > 0 ? (
            <div className={styles.accountMenuRow}>
              {sub.items.map((item, index) => (
                index < limit[idx] ? <MenuItemCard key={index} title={item.title} image={item.platform_img} quantity={item.quantity} type={sub.subscriptionSubType} /> : ''
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
          <h2>There are no subscriptions to show</h2>
          <p>To sign up for a subscription please purchase a subscription <Link to="/">here</Link>.</p>
        </div>
      )}
    </div>
  )
}

export default Dashboard
