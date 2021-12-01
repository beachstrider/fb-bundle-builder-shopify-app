import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType,
    getTokens
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
import { 
  bundleConfig,
  subscriptionFromDB,
  subscriptionOrders
} from '../../../../dummyObjects';

dayjs.extend(isSameOrAfter);

const Dashboard = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [active, setActive] = React.useState([]);
  const [limit, setLimit] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([])
  const [weeksMenu, setWeeksMenu] = React.useState([])

  const getToken = async () => {
    const tokenResponse = await useUserToken()
    if (tokenResponse.token) {
      dispatch(
        setTokens({
          ...state.tokens,
          userToken: tokenResponse.token
        })
      )
    }
  }

  const retrieveDeafultBundle = () => {
    const lastOrderItems = [];
    bundleConfig.data.products.forEach(item => {
      // const itemFromStore = shopifyProducts.filter(sI => item.platform_product_variant_id === sI.variant.id)
      lastOrderItems.push({
        title: 'default product',
        platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
        quantity: item.quantity
      })
    })
    return lastOrderItems
  }

  const getMissingConfigurations = async (token) => {
    const subContents = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/1/configurations/1/contents`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    console.log('customer subscription items: ', subContents);
    const pendingItems = []
    
    subContents.data.data.forEach( configuration => {
      configuration.products.forEach( product => {
        pendingItems.push({
          title: 'Pending Item Name',
          platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
          quantity: product.quantity
        })
      })  
    })

    return pendingItems
  }

  const getOrdersToShow = React.useCallback(async (token) => {

    // make call for subscription
    // get next three weeks of item and j
    const activeWeeksArr = []
    const activeWeeksLimit = []
    const weeksMenu = []
    let newWeeksArr = []
    const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/customers/1/subscriptions`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    console.log('customer subscription: ', subApi);

    const asrraoss = await subApi.data.data.forEach(async (sub) =>{
      const thisLoopSubList = [];
      const bundleId = sub.bundle_id;
      const configurationId = sub.orders[0].bundle_configuration_content_id;
      
      sub.orders.forEach(async (order, index) => {
        const lastOrder = shopCustomer.orders.filter( ord => ord.id == order.platform_order_id )[0];

        let lastOrderItems = [];
        const nextSunday = dayjs().day(0).add((7 * index), 'day')
        if(lastOrder){
          lastOrder.lineItems.forEach(item => {
            lastOrderItems.push({
              title: item.title,
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
              quantity: item.quantity
            })
          })

          thisLoopSubList.push({
            items: lastOrderItems,
            sub_id: sub.id,
            status: 'sent',
            subscriptionDate: nextSunday.format('MMM DD')
          });
        }
        
        if(!order.platform_order_id){
          // call for bundle
          // const itemList = subscriptionOrders.data.filter( s => s.bundle_configuration_content_id === order.bundle_configuration_content_id)[0];
          const itemList = await request(`${process.env.PROXY_APP_URL}/bundle-api/customers/1/subscriptions/1/orders`, { method: 'get', data: '', headers: { authorization: token }}, 3)
          console.log('requesting the selected items: ', itemList)
          if(itemList){
            if(itemList.items){
              itemList.items.forEach(item => {
                // const itemFromStore = shopifyProducts.filter(sI => item.platform_product_variant_id === sI.variant.id)

                lastOrderItems.push({
                  title: 'default product',
                  platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
                  quantity: item.quantity
                })
              })
            } else {
              // call bundle default
              lastOrderItems = lastOrderItems.concat(retrieveDeafultBundle());
            }
          } else {
            // call bundle default
            lastOrderItems = lastOrderItems.concat(retrieveDeafultBundle());
          }

          thisLoopSubList.push({
            items: lastOrderItems,
            status: 'pending',
            subscriptionDate: nextSunday.format('MMM DD')
          });
        } else {
          console.log('order.platform_order_id: ', order.platform_order_id)

        }

        if(!weeksMenu.includes(nextSunday.format('MMM DD'))){ weeksMenu.push(nextSunday.format('MMM DD')); }
      })
        
      for(let j = thisLoopSubList.length; thisLoopSubList.length < 4; j++){
        const nextSunday = dayjs().day(0).add((7 * j), 'day');
        //${nextSunday.format('YYYY-MM-DD')}T00:00:00.000Z

        await getMissingConfigurations(token).then( data => {
          thisLoopSubList.push({
            items: data,
            status: 'pending',
            subscriptionDate: nextSunday.format('MMM DD')
          })
        });

        if(!weeksMenu.includes(nextSunday.format('MMM DD'))){ weeksMenu.push(nextSunday.format('MMM DD')); }
      }
      newWeeksArr = newWeeksArr.concat(thisLoopSubList)

      return thisLoopSubList
    })

    setTimeout(() => {
        newWeeksArr.forEach((sub, index) => {
          const today = dayjs(new Date()).day(0).add(14, 'day').startOf('day');
          const thisYear = dayjs().year();
          const pastDate = dayjs(new Date(`${sub.subscriptionDate} ${thisYear}`)).startOf('day');
    
          if(!pastDate.isSameOrAfter(today)){
            activeWeeksArr.push(sub);
            activeWeeksLimit.push(5)
          }
        })

        setWeeksMenu(weeksMenu)
        setActive(activeWeeksArr)
        setLimit(activeWeeksLimit)
        setSubscriptions(newWeeksArr);
    }, 6000);

  }, [])
  
  React.useEffect(async () => {

      dispatch(displayHeader(false))
      dispatch(displayFooter(false))
      dispatch(selectFaqType(null))
      const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoic3VwZXIiLCJpYXQiOjE2MzgzMDU4MjMsImV4cCI6MTYzODM5MjIyM30.ZVctOY9lyC_Lcj3a1Um7-WPZ2FPVsr38Wy5VdKueZBI'
      // if (!state.tokens.guestToken) {
      //   await getToken()
      // }
      await getOrdersToShow(token);
  }, [getOrdersToShow]);

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

  if(shopCustomer.id === 0){
    return <Redirect push to="/" />
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
                {sub.status === 'sent' ? <Link to="#" className={styles.primaryLink}>Track Package</Link> : ''}
              </div>
              {sub.status === 'sent' ? <Link to="/order-history" className="secondaryButton">Order Summary</Link>  : <Link to={`/edit-order/${idx}`} className="secondaryButton">Edit Order</Link>}
            </div>
            <div className={styles.accountMenuRow}>
              {sub.items.map((item, index) => (
                index < limit[idx] ? <MenuItemCard key={index} title={item.title} image={item.platform_img} quantity={item.quantity} type='regular' /> : ''
              ))}
              {limit[idx] === 5 ? (
                <Link onClick={() => resetLimit(idx)} className={styles.viewAllLink}>
                  See All <ChevronRightMinor />
                </Link>
              ) : (
                <Link to="#" onClick={() => closeLimit(idx)} className={styles.viewAllLink}>
                  <ChevronLeftMinor /> Close
                </Link>
              )}
            </div>
        </div>
        ))}
        

      </div>
    </div>
  )
}

export default Dashboard
