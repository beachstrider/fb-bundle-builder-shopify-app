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
    // console.log('The shopify customer: ', shopCustomer)
    console.log('query: ', query.get("date"))
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
    console.log('tokenResponse: ', tokenResponse)
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
    console.log('shopifyProducts: ', shopProducts[0]);
    const today = dayjs();
    const activeWeeksArr = []
    const activeWeeksLimit = []
    const weeksMenu = []
    const subscriptionArray = {};

    const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    console.log('subApi response: ', subApi);

    if(subApi.data.message && subApi.data.message !== 'Unexpected error.'){
      console.log('token is bad')
      const newToken = await getToken()
      console.log('got new token: ', newToken)
      getOrdersToShow(newToken)
    }

    if(subApi.data.data){
      for (const sub of subApi.data.data) {
        const subscriptionOrders = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${sub.bundle_id}/orders`, { method: 'get', data: '', headers: { authorization: token }}, 3)
        console.log('subscriptionOrders call: ', subscriptionOrders);
        const configData = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${sub.bundle_id}/configurations`, { method: 'get', data: '', headers: { authorization: token }}, 3)
        console.log('configuration call: ', configData);
        if(configData.data.data.length > 0){
          for( const config of configData.data.data){
            for (const content of config.contents) {
              const orderedItems = subscriptionOrders.data.data.filter(ord => ord.bundle_configuration_content.display_after === content.display_after);
              const subscriptionObjKey = content.display_after.split('T')[0]
              console.log('Found the order: ', orderedItems)
              if(!weeksMenu.includes(dayjs(content.display_after.split('T')[0]).format('MMM DD'))){
                weeksMenu.push(dayjs(content.display_after.replace('T00:00:00.000Z', 'T12:00:00.000Z')).format('MMM DD'))
                subscriptionArray[subscriptionObjKey] = {}
              }
              // TODO check orders for items
              // TODO loop those and push
              // TODO call this for default products if missing /bundle-api/bundles/1/configurations/1/contents/1/products?is_default=1
              if(orderedItems.length > 0){
                console.log('configuration call: ', orderedItems[0]);
                const orderFound = orderedItems[0]
                if(subscriptionArray[subscriptionObjKey]){
                    const thisItemsArray = await buildProductArrayFromVariant(orderFound.items, orderFound.subscription.subscription_sub_type);
                    console.log('variant array: ', thisItemsArray);
                    subscriptionArray[subscriptionObjKey].items = thisItemsArray;
                    subscriptionArray[subscriptionObjKey].status = orderFound.platform_order_id !== null ? 'sent' : 'pending';
                    subscriptionArray[subscriptionObjKey].subscriptionDate = dayjs(subscriptionObjKey).format('MMM DD')
                }
              } else {
                const configContentsData = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${config.bundle_id}/configurations/${config.id}/contents/${content.id}/products?is_default=1`, { method: 'get', data: '', headers: { authorization: token }}, 3)
                console.log('configuration contents call: ', configContentsData);
                subscriptionArray[subscriptionObjKey].items = configContentsData.data.data;
                subscriptionArray[subscriptionObjKey].status = 'pending';
                subscriptionArray[subscriptionObjKey].subscriptionDate = dayjs(subscriptionObjKey).format('MMM DD')
              }
            }
          }
        }
      }
    }
    console.log('get variant images: ', subscriptionArray);
    let count = 0
    for (const [key, value] of Object.entries(subscriptionArray)) {
      count++
      if(query.get("date") !== null){
        if(key === query.get("date")){
          activeWeeksArr.push(value)
        }
      } else {
        if(count < 2){
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
    console.log(subscriptions);
    const newActive = subscriptions.filter( a => a.subscriptionDate === week)
    console.log(newActive);
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
            image: product.images.length > 0 ? product.images[0] : placeholderImg,
            quantity: variant.quantity,
            type: subType
          })
        }
      }
    }
    resolve(foundProductArray)
  })

  if (loading) {
    // TODO: work in progress
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
                return ( <button key={index} onClick={() => handleChange(date)} className={ active.filter( a => a.subscriptionDate === date).length > 0 ? "primaryButton largeButton" : "secondaryButton largeButton"}>{date}</button> )
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
                <h3>Week of {sub.subscriptionDate}</h3>
                {sub.status === 'sent' ? <Link to={sub.trackingUrl} className={styles.primaryLink}>Track Package</Link> : ''}
              </div>
              {sub.status === 'sent' ? <Link to="/order-history" className="secondaryButton">Order Summary</Link>  : <Link to={`/edit-order/${sub.subId}?date=${sub.date}`} className="secondaryButton">Edit Order</Link>}
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
