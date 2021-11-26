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
import * as dayjs from 'dayjs';
import { request } from '../../../utils';


const subscriptionFromDB = {
  "data": [
      {
          "id": 1,
          "customer_id": 1,
          "bundle_id": 3,
          "platform_subscription_id": 953490813366,
          "delivery_day": 6,
          "subscription_type": null,
          "subscription_sub_type": null,
          "is_active": null,
          "createdAt": "2021-11-25T01:34:47.000Z",
          "updatedAt": "2021-11-25T01:34:47.000Z",
          "customer": {
              "id": 1,
              "account_id": 1,
              "email": "justin@sunriseintegration.com",
              "platform_customer_id": 5410281652409,
              "createdAt": "2021-11-25T01:34:47.000Z",
              "updatedAt": "2021-11-25T01:34:47.000Z"
          },
          "orders": [
              {
                  "id": 1,
                  "customer_subscription_id": 1,
                  "bundle_configuration_content_id": 1,
                  "platform_order_id": 4118949462201,
                  "createdAt": "2021-11-25T01:34:47.000Z",
                  "updatedAt": "2021-11-25T01:34:47.000Z"
              },
              {
                  "id": 2,
                  "customer_subscription_id": 1,
                  "bundle_configuration_content_id": 2,
                  "platform_order_id": 4115445350585,
                  "createdAt": "2021-11-25T01:34:47.000Z",
                  "updatedAt": "2021-11-25T01:34:47.000Z"
              }
          ]
      }
  ],
  "pagination": {
      "total": 2,
      "currentPage": 1,
      "lastPage": 1,
      "pageSize": 50
  }
}

const Dashboard = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [active, setActive] = React.useState([]);
  const [limit, setLimit] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([])
  
  React.useEffect(async () => {
      dispatch(displayHeader(false))
      dispatch(displayFooter(false))
      dispatch(selectFaqType(null))
      console.log('customer object: ', shopCustomer);
      const newWeeksArr = []
      const activeWeeksArr = []
      const activeWeeksLimit = []

      const subApi = await request('http://localhost:8080/api/customers/1/subscriptions', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoic3VwZXIiLCJpYXQiOjE2Mzc5NTYyODEsImV4cCI6MTYzODA0MjY4MX0.BEsjZjTgx4niP16ljzQUKxmkHS4AM8sbbW_aofDQ1d4',
        },
      })

      console.log('customer subscription: ', subApi);

      subscriptionFromDB.data.forEach((sub, index) =>{
          const lastOrder = shopCustomer.orders.filter( order => order.id == sub.orders[0].platform_order_id )[0];
          const lastOrderItems = []
          lastOrder.line_items.forEach(item => {
            lastOrderItems.push({
              title: item.title,
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
              quantity: item.quantity
            })
          })
        
        const nextSunday = dayjs().day(0).add((7 * index), 'day');

        newWeeksArr.push({
          items: lastOrderItems,
          status: 'sent',
          subscriptionDate: nextSunday.format('MMM DD')
        });
      })


      for(let j = 1; j < 4; j++){
        const pendingItems = []
        for(let i = 0; i < 15; i++){
          pendingItems.push({
            title: 'Pending Item Name',
            platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
            quantity: 0
          })
        }
        const nextSunday = dayjs().day(0).add((7 * j), 'day');
        newWeeksArr.push({
          items: pendingItems,
          status: 'pending',
          subscriptionDate: nextSunday.format('MMM DD')
        })
      }

      newWeeksArr.forEach((sub, index) => {
        if(index < 2){
          activeWeeksArr.push(sub);
          activeWeeksLimit.push(5)
        }
      })

      console.log('Set subscriptions: ', newWeeksArr);
      setSubscriptions(newWeeksArr);
      setActive(activeWeeksArr)
      setLimit(activeWeeksLimit)
  }, []);

  const handleChange = (week) => {
    if(!active.includes(week)){
      setActive([week])
      setLimit([5])
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
              {subscriptions.map( (sub, index) => {
                return ( <button key={index} onClick={() => handleChange(sub)} className={ active.includes(sub) ? "primaryButton largeButton" : "secondaryButton largeButton"}>{sub.subscriptionDate}</button> )
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
