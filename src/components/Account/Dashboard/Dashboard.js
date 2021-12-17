import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType,
    setTokens
  } from '../../../store/slices/rootSlice'
import { Link, Redirect } from 'react-router-dom'
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


// const lastOrderItems = [];
// const nextSunday = dayjs().day(0).add((7 * index), 'day')

// if(lastOrder){
//   lastOrder.lineItems.forEach(item => {
//     const shopProd = shopProducts.filter( p => p.id == item.productId)[0]
//     lastOrderItems.push({
//       title: item.title,
//       platform_img: shopProd && shopProd.images.length > 0 ? shopProd.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
//       quantity: item.quantity
//     })
//   })

//   thisLoopSubList.push({
//     items: lastOrderItems,
//     subId: sub.id,
//     subscriptionType: sub.subscription_type,
//     subscriptionSubType: sub.subscription_sub_type,
//     date: nextSunday.format('YYYY-MM-DD'),
//     status: 'sent',
//     trackingUrl: lastOrder.fulfillments.length > 0 ? lastOrder.fulfillments[0].trackingUrl : lastOrder.orderLink,
//     subscriptionDate: nextSunday.format('MMM DD')
//   });
// }

const Dashboard = () => {

  if(!shopCustomer || shopCustomer.id === 0){
    return <Redirect push to="/" />
  }



  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [active, setActive] = React.useState([]);
  const [limit, setLimit] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([])
  const [weeksMenu, setWeeksMenu] = React.useState([])
  const [loading, setLoading] = React.useState(true);
  // TODO make state call for user token for api


  React.useEffect( () => {
    // console.log('The shopify customer: ', shopCustomer)

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
    let newWeeksArr = []

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
        const thisLoopSubList = [];
        if(configData.data.data.length > 0){
          const subscriptionArray = {};
          for( const config of configData.data.data){
          for (const content of config.contents) {
            if(!weeksMenu.includes(content.display_after.replace('T00:00:00.000Z', 'T12:00:00.000Z')).format('MMM DD')){
              weeksMenu.push(dayjs(content.display_after.replace('T00:00:00.000Z', 'T12:00:00.000Z')).format('MMM DD'))
              subscriptionArray[content.display_after.remove('T00:00:00.000Z')] = []
            }
            // TODO check orders for items
            // TODO loop those and push
            // TODO call this for default products if missing /bundle-api/bundles/1/configurations/1/contents/1/products?is_default=1

            const configContentsData = await request(`${process.env.PROXY_APP_URL}/api/bundles/${sub.bundle_id}/configurations/1/contents/${order.bundle_configuration_content_id}`, { method: 'get', data: '', headers: { authorization: token }}, 3)
            console.log('configuration contents call: ', configContentsData);

          }
        }
        }
        

        newWeeksArr = newWeeksArr.concat(thisLoopSubList)
      }
    }

    // newWeeksArr.forEach((sub) => {
    //   const today = dayjs(new Date()).day(0).add(14, 'day').startOf('day');
    //   const pastDate = dayjs(sub.date).startOf('day');
    //   console.log(`Date is ${sub.date} same or after ${today.format('MM-DD-YYYY')}`)
    //   if(!pastDate.isSameOrAfter(today)){
    //     activeWeeksArr.push(sub);
    //     activeWeeksLimit.push(5)
    //   }
    // })

    setSubscriptions(newWeeksArr);
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

  const findProductFromVariant = async (variantId) => 
  new Promise((resolve) => {
    let foundProduct = {};
    console.log('find this variant: ', variantId);
    for (const product of shopProducts) {
      const variant = product.variants.filter( v => v.id === variantId)
      if(product.variants.filter( v => v.id === variantId).length > 0){
        foundProduct = {
          product,
          metafields: variant[0].metafields
        }
      }
    }
    console.log('found it? : ', foundProduct);
    resolve(foundProduct)
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
      <div className={styles.promoSection}>
        <p>Promo Section</p>
      </div>
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
    </div>
  )
}

export default Dashboard
