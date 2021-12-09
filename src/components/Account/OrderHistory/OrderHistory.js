import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    displayHeader,
    displayFooter,
    selectFaqType,
    setTokens
  } from '../../../store/slices/rootSlice'
import { Link, Redirect } from 'react-router-dom'
import { SideMenu } from '../Components/SideMenu'
import styles from './OrderHistory.module.scss'
import { MenuItemCard } from '../Components/MenuItemCard'
import { useUserToken } from '../../Hooks';
import {
  ChevronRightMinor
} from '@shopify/polaris-icons';
import * as dayjs from 'dayjs';
import { request } from '../../../utils';
import { Spinner } from '../../Global';

const OrderHistory = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()
  const [subscriptions, setSubscriptions] = React.useState([])
  const [loading, setLoading] = React.useState(true);

  React.useEffect( () => {
    console.log('The shopify customer: ', shopCustomer)
    dispatch(displayHeader(false))
    dispatch(displayFooter(false))
    dispatch(selectFaqType(null))

    if (!state.tokens.userToken) {
      const thisToken = getToken();
      getOrdersToShow(thisToken);
    }else {
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

  const dateFormat = (date) => {
      const dateArr = date.split(' ');
      const newDate = dateArr[0];
      const reformatArr = newDate.split('-');
      return `${reformatArr[1]}/${reformatArr[2]}/${reformatArr[0]}`;
  }
  
  const getOrdersToShow = async (token) => {
    // setting customer id temporarily
    // TODO make login call to get customer id from database
    const customerId = 1;

    const newWeeksArr = []
    const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    console.log('customer subscription: ', subApi);
    const thisWeek = dayjs().day(0).add((7), 'day');
    console.log('this weeks: ', thisWeek.format('YYYY-MM-DD'));


    

    for (const sub of subApi.data.data) {
      const thisLoopSubList = [];
      const subscriptionId = sub.id;
      const bundleId = sub.bundle_id;
      let configurationId = sub.orders[0].bundle_configuration_content_id;

      sub.orders.forEach( order => {
        if(!order.platform_order_id && order.bundle_configuration_content_id <= configurationId){
          configurationId = order.bundle_configuration_content_id;
          if(order.items.length > 0){
            order.items.forEach( product => {
              // TODO need to filter for variant to get info
              const shopProd = shopProducts.filter( p => p.id === product.platform_product_variant_id)[0]
              thisLoopSubList.push({
                title:  shopProd ? shopProd.title : 'Missing Title',
                platform_img: shopProd && shopProd.images.length > 0 ? shopProd.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
                quantity: item.quantity,
                type: order.subscription.subscription_sub_type
              })
            })
          }
        }
      })

      if(thisLoopSubList.length === 0){
        const subscriptionConfigContents = await request(`${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundleId}/configurations/${configurationId}/contents?display_after=${thisWeek.format('YYYY-MM-DD')}T00:00:00.000Z`, { method: 'get', data: '', headers: { authorization: token }}, 3)
        if(subscriptionConfigContents.data.data[0].products.length){
          subscriptionConfigContents.data.data[0].products.forEach( product => {
            if(product.is_default === 1){
              // TODO Need to filter down to variant based on subscription sub type
              const shopProd = shopProducts.filter( p => p.id === product.platform_product_id)[0]
              thisLoopSubList.push({
                title:  shopProd ? shopProd.title : 'Missing Title',
                platform_img: shopProd && shopProd.images.length > 0 ? shopProd.images[0]: '//cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c_750x.gif',
                quantity: product.default_quantity,
                type: sub.subscription_sub_type
              })
            }
          })
        }
      }
      
      const subItem = {
        subId: sub.id,
        subscriptionType: sub.subscription_type,
        subscriptionSubType: sub.subscription_sub_type,
        deliveryDay: sub.delivery_day,
        customerId: sub.customer_id,
        date: thisWeek.format('YYYY-MM-DD'),
        items: thisLoopSubList
      }
      console.log('subscription orders: ', subItem);
      newWeeksArr.push(subItem)
    }

    setSubscriptions(newWeeksArr);
    console.log('newWeeksArr: ', newWeeksArr);
    setLoading(false)
  }

  if(shopCustomer.id === 0){
    return <Redirect push to="/" />
  }
  
  if (loading) {

    return (
      <Spinner label="Loading..." />
    )
  }

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
                <p></p>
            </div>
            <div className="bundleTwoThirds">
                <div className="headerOffset">
                    <h2>Order History</h2>
                </div>
            </div>
        </div>
        <div className="bundleRow">
            <div className="bundleOneThird">
                <SideMenu active="order-history" />
            </div>
            <div className="bundleTwoThirds">
              {subscriptions.length > 0 ? (
                <div className="bundleBuilderCard">
                  {subscriptions.map( (subscription, index) => (
                    <div key={index} className={styles.contentCardWrapper}>
                        <div className={styles.contentCardNavigation}>
                          <div>
                            <h3>Current Order</h3>
                            <p>{subscription.subscriptionType} {subscription.subscriptionSubType}</p>
                          </div>
                          <Link to={`/edit-order/${subscription.subId}?date=${subscription.date}`} className="secondaryButton">Edit Order</Link>
                        </div>
                        {subscription.items ? (
                        <div className={styles.currentOrderMenu}>
                            {subscription.items.map((item, idx) => (
                                idx < 3 ? <MenuItemCard key={idx} title={item.title} image={item.platform_img} quantity={item.quantity} type={item.type} />  : ''
                            ))}
                            <Link to={`/edit-order/${subscription.subId}?date=${subscription.date}`} className={styles.seeAllMenu}>
                                See All <ChevronRightMinor />
                            </Link>
                        </div>
                        ) : ''}
                    </div>
                  ))}
                </div>
                 ) : ''}
                <div className="bundleBuilderCard">
                    <div className={styles.contentCardWrapper}>
                        <div className={styles.contentCardNavigation}>
                            <h3>Past Orders</h3>
                            <p></p>
                        </div>
                        <table className={styles.orderHistoryTable}>
                            <thead className={styles.orderHistoryTableHeaders}>
                              <tr>
                                <th>Order Date</th>
                                <th>Order Total</th>
                                <th>Meal Type</th>
                                <th>Meals Names</th>
                              </tr>
                            </thead>
                            <tbody>
                            {shopCustomer.orders.map( (order, index) => (
                                    index < 5 ? (
                                        <tr key={index}>
                                            <td>{dateFormat(order.orderDate)}</td>
                                            <td>{order.orderTotal}</td>
                                            <td>Keto</td>
                                            <td className={styles.orderMealNames}>
                                                <p className={styles.orderMealNamesText}>{order.lineItems.map( item => ( `${item.title},` ))}</p>
                                                <a href={order.orderLink} className={styles.orderMealNamesLink}>See All Meals</a>
                                            </td>
                                        </tr>  
                                    ) : (
                                      <tr key={index}>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                            <td></td>
                                        </tr> 
                                    )
                                ))}
                            </tbody>
                        </table>
                        <a href={`${shopDomain}/account`} className={styles.orderHistoryMoreLink}>See More </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderHistory
