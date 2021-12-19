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
import styles from './PlanSettings.module.scss'
import { MenuItemCard } from '../Components/MenuItemCard'
import { useUserToken } from '../../Hooks';
import {
  ChevronRightMinor
} from '@shopify/polaris-icons';
import * as dayjs from 'dayjs';
import { request } from '../../../utils';
import { Spinner } from '../../Global';
import { DeliveryDayModal } from '../Components/DeliveryDayModal';

const PlanSettings = () => {

  if(shopCustomer.id === 0){
    return <Redirect push to="/" />
  }

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

  const updateDelivery = (day) => {
    console.log('the day: ', dayjs().day(day).format('dddd'))
  }

  const getOrdersToShow = async (token) => {
    const newWeeksArr = []
    const subApi = await request(`${process.env.PROXY_APP_URL}/bundle-api/subscriptions`, { method: 'get', data: '', headers: { authorization: token }}, 3)
    console.log('customer subscription: ', subApi);
    const thisWeek = dayjs().day(0).add((7), 'day');
    console.log('this weeks: ', thisWeek.format('YYYY-MM-DD'));


    

    for (const sub of subApi.data.data) {
      const thisLoopSubList = [];
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
                        <h2>Plan Settings</h2>
                    </div>
                </div>
            </div>
            <div className="bundleRow">
                <div className="bundleOneThird">
                    <SideMenu active="plan-settings" />
                </div>
                <div className="bundleTwoThirds">
                  {subscriptions.map( (subscription, idx) => (
                    <div key={idx} className="bundleBuilderCard">
                        <div className={styles.contentCardWrapper}>
                            <div className={styles.contentCardNavigation}>
                              <div>
                                <h3>Current Order</h3>
                                <p>{subscription.subscriptionType} {subscription.subscriptionSubType}</p>
                              </div>
                              {/* <Link to={`/edit-order/${subscription.subId}?date=${subscription.date}`} className="secondaryButton">Edit Order</Link> */}
                            </div>
                            <div className={styles.currentOrderMenu}>
                                {subscription.items.map((item, index) => (
                                    index < 3 ? <MenuItemCard key={index} title={item.title} image={item.platform_img} quantity={item.quantity} type={item.type}  width="27%" /> : ''
                                ))}
                                <Link to="/account" className={styles.seeAllMenu}>
                                    See All <ChevronRightMinor />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.contentCardWrapper}>
                            <div className={styles.contentCardNavigation}>
                                <h3 className={styles.underlinedHeader}>Current Order Date</h3>
                                <DeliveryDayModal label="Edit" deliveryDay={subscription.deliveryDay} onChange={updateDelivery} />
                            </div>
                            <div className={styles.currentOrderMenu}>
                                <p>Delivery Day: {dayjs().day(subscription.deliveryDay).format('dddd')}</p>
                            </div>
                        </div>
                    </div>
                  ))}
                </div>
            </div>
        </div>
    )
}

export default PlanSettings