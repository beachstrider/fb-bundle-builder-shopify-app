import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType
  } from '../../../store/slices/rootSlice'
import { Link, Redirect } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import { MenuItemCard } from '../Components/MenuItemCard'
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
  
  React.useEffect(async () => {
      dispatch(displayHeader(false))
      dispatch(displayFooter(false))
      dispatch(selectFaqType(null))
      console.log('customer object: ', shopCustomer);
      let newWeeksArr = []
      const activeWeeksArr = []
      const activeWeeksLimit = []
      const weeksMenu = []
      // const subApi = await request('https://justins-dev-api.ngrok.io/api/customers/1/subscriptions', {
      //     method: 'GET', // *GET, POST, PUT, DELETE, etc.
      //     mode: 'cors', // no-cors, *cors, same-origin
      //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      //     credentials: 'same-origin', // include, *same-origin, omit
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoic3VwZXIiLCJpYXQiOjE2MzgyMDg0NTAsImV4cCI6MTYzODI5NDg1MH0.rQogSi9R1lUp7O8PurC4RwL4uLtu1--cZSDrSnTLm9A',
      //     },
      //     redirect: 'follow', // manual, *follow, error
      //     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // })

      // console.log('customer subscription: ', subApi);

      subscriptionFromDB.data.forEach((sub) =>{
        const thisLoopSubList = [];
        sub.orders.forEach((order, index) => {
          const lastOrder = shopCustomer.orders.filter( ord => ord.id == order.platform_order_id )[0];
          console.log('shopCustomer: ', shopCustomer)
          const lastOrderItems = [];
          const nextSunday = dayjs().day(0).add((7 * index), 'day')
          console.log('order: ', order)
          console.log('lastOrder: ', lastOrder)
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
            const itemList = subscriptionOrders.data.filter( s => s.bundle_configuration_content_id === order.bundle_configuration_content_id)[0];
            console.log('item: ', itemList)
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
                console.log('no items need default')
                bundleConfig.data.products.forEach((item) => {
                  // const itemFromStore = shopifyProducts.filter(sI => item.platform_product_variant_id === sI.variant.id)
                  lastOrderItems.push({
                    title: 'default product',
                    platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
                    quantity: item.quantity
                  })
                })
              }
            } else {
              // call bundle default
              console.log('no order need default', bundleConfig.products)
              bundleConfig.data.products.forEach(item => {
                // const itemFromStore = shopifyProducts.filter(sI => item.platform_product_variant_id === sI.variant.id)
                lastOrderItems.push({
                  title: 'default product',
                  platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
                  quantity: item.quantity
                })
              })
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

        if(thisLoopSubList.length < 4){
          for(let j = thisLoopSubList.length; thisLoopSubList.length < 4; j++){
            const pendingItems = []
            for(let i = 0; i < 15; i++){
              pendingItems.push({
                title: 'Pending Item Name',
                platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
                quantity: 0
              })
            }
            const nextSunday = dayjs().day(0).add((7 * j), 'day');
            thisLoopSubList.push({
              items: pendingItems,
              status: 'pending',
              subscriptionDate: nextSunday.format('MMM DD')
            })

            if(!weeksMenu.includes(nextSunday.format('MMM DD'))){ weeksMenu.push(nextSunday.format('MMM DD')); }
          }
        }

        newWeeksArr = newWeeksArr.concat(thisLoopSubList);
      })

      newWeeksArr.forEach((sub, index) => {
        const today = dayjs(new Date()).day(0).add(14, 'day').startOf('day');
        const thisYear = dayjs().year();
        const pastDate = dayjs(new Date(`${sub.subscriptionDate} ${thisYear}`)).startOf('day');
        console.log('pastDate: ', pastDate);
        console.log('today: ', today);
        console.log('Date check: ', pastDate.isSameOrAfter(today));

        if(!pastDate.isSameOrAfter(today)){
          activeWeeksArr.push(sub);
          activeWeeksLimit.push(5)
        }
      })

      console.log('Set subscriptions: ', newWeeksArr);

      setSubscriptions(newWeeksArr);
      setWeeksMenu(weeksMenu)
      setActive(activeWeeksArr)
      setLimit(activeWeeksLimit)
  }, []);

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
              {sub.status === 'sent' ? <Link to="/order-history" className="secondaryButton">Order Summary</Link>  : <Link to={`/edit-order/${sub.id}`} className="secondaryButton">Edit Order</Link>}
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
