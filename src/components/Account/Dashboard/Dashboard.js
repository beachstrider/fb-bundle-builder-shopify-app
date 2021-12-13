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
    console.log('The shopify customer: ', shopCustomer)

    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    if (!state.tokens.userToken) {
      console.log('call for token')
      const thisToken = getToken();
      getOrdersToShow(thisToken);
    } else {
      console.log('token already there')
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

  const getMissingConfigurations = async (date, token, bundle, config) => {
    const subContents = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundle}/configurations/${config}/contents?display_after=${date}T00:00:00.000Z`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    const pendingItems = []
    
    subContents.data.data.forEach( configuration => {
      configuration.products.forEach( product => {
        const shopProd = shopProducts.filter( p => p.id === product.platform_product_id)[0]

        if(product.is_default === 1){
          pendingItems.push({
            title: shopProd ? shopProd.title : 'Missing Title',
            platform_img: shopProd && shopProd.images.length > 0 ? shopProd.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
            quantity: product.default_quantity
          })
        }
      })  
    })

    return pendingItems
  }

  const getOrdersToShow = async (token) => {
    console.log('shopifyProducts: ', shopProducts[0]);

    const activeWeeksArr = []
    const activeWeeksLimit = []
    const weeksMenu = []
    let newWeeksArr = []
    const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    console.log('subApi response: ', subApi);
    if(subApi.data.message && subApi.data.message !== 'Unexpected error.'){
      getToken().then(token => getOrdersToShow(token))
    }
    // if(subApi.data.data){
    //   for (const sub of subApi.data.data) {
    //     const thisLoopSubList = [];
    //     const subscriptionId = sub.id;

    //     for (const [ index, order ] of sub.orders.entries()) {
    //       const lastOrder = shopCustomer.orders.filter( ord => ord.id == order.platform_order_id )[0];

    //       const lastOrderItems = [];
    //       const nextSunday = dayjs().day(0).add((7 * index), 'day')
    //       if(lastOrder){
    //         lastOrder.lineItems.forEach(item => {
    //           const shopProd = shopProducts.filter( p => p.id == item.productId)[0]
    //           lastOrderItems.push({
    //             title: item.title,
    //             platform_img: shopProd && shopProd.images.length > 0 ? shopProd.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
    //             quantity: item.quantity
    //           })
    //         })

    //         thisLoopSubList.push({
    //           items: lastOrderItems,
    //           subId: sub.id,
    //           subscriptionType: sub.subscription_type,
    //           subscriptionSubType: sub.subscription_sub_type,
    //           date: nextSunday.format('YYYY-MM-DD'),
    //           status: 'sent',
    //           trackingUrl: lastOrder.fulfillments.length > 0 ? lastOrder.fulfillments[0].trackingUrl : lastOrder.orderLink,
    //           subscriptionDate: nextSunday.format('MMM DD')
    //         });
    //       }
          
    //       if(!order.platform_order_id){
    //         // call for bundle and look for selected menu's
    //         const itemList = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${subscriptionId}/orders`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    //         console.log('requesting the selected items: ', itemList)
    //         if(itemList){
    //           if(itemList.items){
    //             itemList.items.forEach(item => {
    //               // TODO drill down to the variant
    //               // const itemFromStore = shopifyProducts.filter(sI => item.platform_product_variant_id === sI.variant.id)
    //               const shopItem = shopifyProducts.map(p => p.variants.filter(e => e.id === item.platform_variant_id))[0];
    //               lastOrderItems.push({
    //                 title: shopItem ? shopItem.title : 'default product',
    //                 platform_img: shopItem && shopItem.images.length > 0 ? shopItem.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
    //                 quantity: item.quantity,
    //                 type: sub.subscription_sub_type
    //               })
    //             })
    //           }
    //         } 
    //       }

    //       if(!weeksMenu.includes(nextSunday.format('MMM DD'))){ weeksMenu.push(nextSunday.format('MMM DD')); }
    //     }

    //     if(thisLoopSubList.length < 4){
    //       for(let j = thisLoopSubList.length; thisLoopSubList.length < 4; j++){
    //         const nextSunday = dayjs().day(0).add((7 * j), 'day');

    //         await getMissingConfigurations(nextSunday.format('YYYY-MM-DD'), token, 1, 1).then( data => {
    //           thisLoopSubList.push({
    //             items: data,
    //             subId: sub.id,
    //             subscriptionType: sub.subscription_type,
    //             subscriptionSubType: sub.subscription_sub_type,
    //             date: nextSunday.format('YYYY-MM-DD'),
    //             status: 'pending',
    //             subscriptionDate: nextSunday.format('MMM DD')
    //           })
    //         });

    //         if(!weeksMenu.includes(nextSunday.format('MMM DD'))){ weeksMenu.push(nextSunday.format('MMM DD')); }
    //       }
    //     }

    //     newWeeksArr = newWeeksArr.concat(thisLoopSubList)
    //   }
    // }

    // newWeeksArr.forEach((sub) => {
    //   const today = dayjs(new Date()).day(0).add(14, 'day').startOf('day');
    //   const thisYear = dayjs().year();
    //   const pastDate = dayjs(new Date(`${sub.subscriptionDate} ${thisYear}`)).startOf('day');

    //   if(!pastDate.isSameOrAfter(today)){
    //     activeWeeksArr.push(sub);
    //     activeWeeksLimit.push(5)
    //   }
    // })

    // setSubscriptions(newWeeksArr);
    // setWeeksMenu(weeksMenu)
    // setActive(activeWeeksArr)
    // setLimit(activeWeeksLimit)
    // setLoading(false)
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
