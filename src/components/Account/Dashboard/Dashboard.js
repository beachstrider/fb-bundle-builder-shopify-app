import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import {MenuItemCard} from '../Components/MenuItemCard'
import {
  ChevronRightMinor
} from '@shopify/polaris-icons';
import * as dayjs from 'dayjs';

const customerSubscription = 
  {
    id: 1,
    cusomter_id: 12121212,
    bundle_id: 1,
    subscription_id: '123123123',
    delivery_day: 3,
    is_Active: 1,
    created_at: '2021-11-09 21:58:39',
    updated_at: '2021-11-09 21:58:39',
    customerSubscriptionBundleContents: [
      {
        id: 1,
        customer_subscription_id: 1,
        platform_order_id: 123213,
        created_at: '2021-11-09 21:58:39',
        updated_at: '2021-11-09 21:58:39',
        CustomerSubscriptionBundleContentSelections: [
          {
            id: 1,
            customer_subscription_bundle_confirguration_id: 1,
            product_variant_id: 1,
            platform_product_variant_id: 41375600771257,
            quantity: 1,
            created_at: '2021-11-09 21:58:39',
            updated_at: '2021-11-09 21:58:39',
            ProductVariants: {
              id: 1,
              product_id: 1,
              title: 'Ancho Lime Chicken',
              sku: 'KH-121',
              platform_id: 41375600771257,
              platform_url: 'https://quickfresh-sandbox.myshopify.com/products/ancho-lime-chicken-high-protein',
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/ancho-lime-chicken-high-protein-943209.jpg?v=1631911470',
              platform_data: 'description'
            }
          },
          {
            id: 2,
            customer_subscription_bundle_confirguration_id: 1,
            product_variant_id: 2,
            platform_product_variant_id: 41432952766649,
            quantity: 1,
            created_at: '2021-11-09 21:58:39',
            updated_at: '2021-11-09 21:58:39',
            ProductVariants: {
              id: 2,
              product_id: 2,
              title: 'Andouille Fennel Salad',
              sku: 'KH-269',
              platform_id: 41432952766649,
              platform_url: 'https://quickfresh-sandbox.myshopify.com/products/andouille-fennel-salad-high-protein',
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/andouille-fennel-salad-high-protein-469235.jpg?v=1635634422',
              platform_data: 'description'
            }
          },
          {
            id: 3,
            customer_subscription_bundle_confirguration_id: 1,
            product_variant_id: 3,
            platform_product_variant_id: 41213176643769,
            quantity: 1,
            created_at: '2021-11-09 21:58:39',
            updated_at: '2021-11-09 21:58:39',
            ProductVariants: {
              id: 3,
              product_id: 3,
              title: 'Asian Slaw Salad',
              sku: 'KH-176',
              platform_id: 41213176643769,
              platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asian-slaw-salad-high-protein',
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asian-slaw-salad-high-protein-385481.jpg?v=1633122770',
              platform_data: 'description'
            }
          },
          {
            id: 4,
            customer_subscription_bundle_confirguration_id: 1,
            product_variant_id: 4,
            platform_product_variant_id: 41213176545465,
            quantity: 1,
            created_at: '2021-11-09 21:58:39',
            updated_at: '2021-11-09 21:58:39',
            ProductVariants: {
              id: 4,
              product_id: 4,
              title: 'Asparagus Mushroom Frittata',
              sku: 'KB-177',
              platform_id: 41213176545465,
              platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asparagus-mushroom-frittata-keto-breakfast',
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asparagus-mushroom-frittata-keto-breakfast-367122.jpg?v=1633122770',
              platform_data: 'description'
            }
          },
          {
            id: 5,
            customer_subscription_bundle_confirguration_id: 1,
            product_variant_id: 5,
            platform_product_variant_id: 41479168196793,
            quantity: 1,
            created_at: '2021-11-09 21:58:39',
            updated_at: '2021-11-09 21:58:39',
            ProductVariants: {
              id: 5,
              product_id: 5,
              title: 'Bacon Ranch Chicken',
              sku: 'KH-165',
              platform_id: 6995052527801,
              platform_url: 'https://quickfresh-sandbox.myshopify.com/products/bacon-ranch-chicken-high-protein-2',
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
              platform_data: 'description'
            }
          },
          {
            id: 6,
            customer_subscription_bundle_confirguration_id: 1,
            product_variant_id: 6,
            platform_product_variant_id: 40812018729145,
            quantity: 1,
            created_at: '2021-11-09 21:58:39',
            updated_at: '2021-11-09 21:58:39',
            ProductVariants: {
              id: 6,
              product_id: 6,
              title: 'Barbados Sirloin',
              sku: 'KH-100',
              platform_id: 40812018729145,
              platform_url: 'https://quickfresh-sandbox.myshopify.com/products/barbados-sirloin-high',
              platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/barbados-sirloin-high-protein-374434.jpg?v=1630652440',
              platform_data: 'description'
            }
          }
        ]
      },
{
      id: 2,
      customer_subscription_id: 1,
      platform_order_id: 123213,
      created_at: '2021-11-09 21:58:39',
      updated_at: '2021-11-09 21:58:39',
      CustomerSubscriptionBundleContentSelections: [
        {
          id: 1,
          customer_subscription_bundle_confirguration_id: 1,
          product_variant_id: 1,
          platform_product_variant_id: 41375600771257,
          quantity: 1,
          created_at: '2021-11-09 21:58:39',
          updated_at: '2021-11-09 21:58:39',
          ProductVariants: {
            id: 1,
            product_id: 1,
            title: 'Ancho Lime Chicken',
            sku: 'KH-121',
            platform_id: 41375600771257,
            platform_url: 'https://quickfresh-sandbox.myshopify.com/products/ancho-lime-chicken-high-protein',
            platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/ancho-lime-chicken-high-protein-943209.jpg?v=1631911470',
            platform_data: 'description'
          }
        },
        {
          id: 2,
          customer_subscription_bundle_confirguration_id: 1,
          product_variant_id: 2,
          platform_product_variant_id: 41432952766649,
          quantity: 1,
          created_at: '2021-11-09 21:58:39',
          updated_at: '2021-11-09 21:58:39',
          ProductVariants: {
            id: 2,
            product_id: 2,
            title: 'Andouille Fennel Salad',
            sku: 'KH-269',
            platform_id: 41432952766649,
            platform_url: 'https://quickfresh-sandbox.myshopify.com/products/andouille-fennel-salad-high-protein',
            platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/andouille-fennel-salad-high-protein-469235.jpg?v=1635634422',
            platform_data: 'description'
          }
        },
        {
          id: 3,
          customer_subscription_bundle_confirguration_id: 1,
          product_variant_id: 3,
          platform_product_variant_id: 41213176643769,
          quantity: 1,
          created_at: '2021-11-09 21:58:39',
          updated_at: '2021-11-09 21:58:39',
          ProductVariants: {
            id: 3,
            product_id: 3,
            title: 'Asian Slaw Salad',
            sku: 'KH-176',
            platform_id: 41213176643769,
            platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asian-slaw-salad-high-protein',
            platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asian-slaw-salad-high-protein-385481.jpg?v=1633122770',
            platform_data: 'description'
          }
        },
        {
          id: 4,
          customer_subscription_bundle_confirguration_id: 1,
          product_variant_id: 4,
          platform_product_variant_id: 41213176545465,
          quantity: 1,
          created_at: '2021-11-09 21:58:39',
          updated_at: '2021-11-09 21:58:39',
          ProductVariants: {
            id: 4,
            product_id: 4,
            title: 'Asparagus Mushroom Frittata',
            sku: 'KB-177',
            platform_id: 41213176545465,
            platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asparagus-mushroom-frittata-keto-breakfast',
            platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asparagus-mushroom-frittata-keto-breakfast-367122.jpg?v=1633122770',
            platform_data: 'description'
          }
        },
        {
          id: 5,
          customer_subscription_bundle_confirguration_id: 1,
          product_variant_id: 5,
          platform_product_variant_id: 41479168196793,
          quantity: 1,
          created_at: '2021-11-09 21:58:39',
          updated_at: '2021-11-09 21:58:39',
          ProductVariants: {
            id: 5,
            product_id: 5,
            title: 'Bacon Ranch Chicken',
            sku: 'KH-165',
            platform_id: 6995052527801,
            platform_url: 'https://quickfresh-sandbox.myshopify.com/products/bacon-ranch-chicken-high-protein-2',
            platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
            platform_data: 'description'
          }
        },
        {
          id: 6,
          customer_subscription_bundle_confirguration_id: 1,
          product_variant_id: 6,
          platform_product_variant_id: 40812018729145,
          quantity: 1,
          created_at: '2021-11-09 21:58:39',
          updated_at: '2021-11-09 21:58:39',
          ProductVariants: {
            id: 6,
            product_id: 6,
            title: 'Barbados Sirloin',
            sku: 'KH-100',
            platform_id: 40812018729145,
            platform_url: 'https://quickfresh-sandbox.myshopify.com/products/barbados-sirloin-high',
            platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/barbados-sirloin-high-protein-374434.jpg?v=1630652440',
            platform_data: 'description'
          }
        }
      ]
    },
{
    id: 3,
    customer_subscription_id: 1,
    platform_order_id: 123213,
    created_at: '2021-11-09 21:58:39',
    updated_at: '2021-11-09 21:58:39',
    CustomerSubscriptionBundleContentSelections: [
      {
        id: 1,
        customer_subscription_bundle_confirguration_id: 1,
        product_variant_id: 1,
        platform_product_variant_id: 41375600771257,
        quantity: 1,
        created_at: '2021-11-09 21:58:39',
        updated_at: '2021-11-09 21:58:39',
        ProductVariants: {
          id: 1,
          product_id: 1,
          title: 'Ancho Lime Chicken',
          sku: 'KH-121',
          platform_id: 41375600771257,
          platform_url: 'https://quickfresh-sandbox.myshopify.com/products/ancho-lime-chicken-high-protein',
          platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/ancho-lime-chicken-high-protein-943209.jpg?v=1631911470',
          platform_data: 'description'
        }
      },
      {
        id: 2,
        customer_subscription_bundle_confirguration_id: 1,
        product_variant_id: 2,
        platform_product_variant_id: 41432952766649,
        quantity: 1,
        created_at: '2021-11-09 21:58:39',
        updated_at: '2021-11-09 21:58:39',
        ProductVariants: {
          id: 2,
          product_id: 2,
          title: 'Andouille Fennel Salad',
          sku: 'KH-269',
          platform_id: 41432952766649,
          platform_url: 'https://quickfresh-sandbox.myshopify.com/products/andouille-fennel-salad-high-protein',
          platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/andouille-fennel-salad-high-protein-469235.jpg?v=1635634422',
          platform_data: 'description'
        }
      },
      {
        id: 3,
        customer_subscription_bundle_confirguration_id: 1,
        product_variant_id: 3,
        platform_product_variant_id: 41213176643769,
        quantity: 1,
        created_at: '2021-11-09 21:58:39',
        updated_at: '2021-11-09 21:58:39',
        ProductVariants: {
          id: 3,
          product_id: 3,
          title: 'Asian Slaw Salad',
          sku: 'KH-176',
          platform_id: 41213176643769,
          platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asian-slaw-salad-high-protein',
          platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asian-slaw-salad-high-protein-385481.jpg?v=1633122770',
          platform_data: 'description'
        }
      },
      {
        id: 4,
        customer_subscription_bundle_confirguration_id: 1,
        product_variant_id: 4,
        platform_product_variant_id: 41213176545465,
        quantity: 1,
        created_at: '2021-11-09 21:58:39',
        updated_at: '2021-11-09 21:58:39',
        ProductVariants: {
          id: 4,
          product_id: 4,
          title: 'Asparagus Mushroom Frittata',
          sku: 'KB-177',
          platform_id: 41213176545465,
          platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asparagus-mushroom-frittata-keto-breakfast',
          platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asparagus-mushroom-frittata-keto-breakfast-367122.jpg?v=1633122770',
          platform_data: 'description'
        }
      },
      {
        id: 5,
        customer_subscription_bundle_confirguration_id: 1,
        product_variant_id: 5,
        platform_product_variant_id: 41479168196793,
        quantity: 1,
        created_at: '2021-11-09 21:58:39',
        updated_at: '2021-11-09 21:58:39',
        ProductVariants: {
          id: 5,
          product_id: 5,
          title: 'Bacon Ranch Chicken',
          sku: 'KH-165',
          platform_id: 6995052527801,
          platform_url: 'https://quickfresh-sandbox.myshopify.com/products/bacon-ranch-chicken-high-protein-2',
          platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
          platform_data: 'description'
        }
      },
      {
        id: 6,
        customer_subscription_bundle_confirguration_id: 1,
        product_variant_id: 6,
        platform_product_variant_id: 40812018729145,
        quantity: 1,
        created_at: '2021-11-09 21:58:39',
        updated_at: '2021-11-09 21:58:39',
        ProductVariants: {
          id: 6,
          product_id: 6,
          title: 'Barbados Sirloin',
          sku: 'KH-100',
          platform_id: 40812018729145,
          platform_url: 'https://quickfresh-sandbox.myshopify.com/products/barbados-sirloin-high',
          platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/barbados-sirloin-high-protein-374434.jpg?v=1630652440',
          platform_data: 'description'
        }
      }
    ]
  },
{
  id: 4,
  customer_subscription_id: 1,
  platform_order_id: 123213,
  created_at: '2021-11-09 21:58:39',
  updated_at: '2021-11-09 21:58:39',
  CustomerSubscriptionBundleContentSelections: [
    {
      id: 1,
      customer_subscription_bundle_confirguration_id: 1,
      product_variant_id: 1,
      platform_product_variant_id: 41375600771257,
      quantity: 1,
      created_at: '2021-11-09 21:58:39',
      updated_at: '2021-11-09 21:58:39',
      ProductVariants: {
        id: 1,
        product_id: 1,
        title: 'Ancho Lime Chicken',
        sku: 'KH-121',
        platform_id: 41375600771257,
        platform_url: 'https://quickfresh-sandbox.myshopify.com/products/ancho-lime-chicken-high-protein',
        platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/ancho-lime-chicken-high-protein-943209.jpg?v=1631911470',
        platform_data: 'description'
      }
    },
    {
      id: 2,
      customer_subscription_bundle_confirguration_id: 1,
      product_variant_id: 2,
      platform_product_variant_id: 41432952766649,
      quantity: 1,
      created_at: '2021-11-09 21:58:39',
      updated_at: '2021-11-09 21:58:39',
      ProductVariants: {
        id: 2,
        product_id: 2,
        title: 'Andouille Fennel Salad',
        sku: 'KH-269',
        platform_id: 41432952766649,
        platform_url: 'https://quickfresh-sandbox.myshopify.com/products/andouille-fennel-salad-high-protein',
        platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/andouille-fennel-salad-high-protein-469235.jpg?v=1635634422',
        platform_data: 'description'
      }
    },
    {
      id: 3,
      customer_subscription_bundle_confirguration_id: 1,
      product_variant_id: 3,
      platform_product_variant_id: 41213176643769,
      quantity: 1,
      created_at: '2021-11-09 21:58:39',
      updated_at: '2021-11-09 21:58:39',
      ProductVariants: {
        id: 3,
        product_id: 3,
        title: 'Asian Slaw Salad',
        sku: 'KH-176',
        platform_id: 41213176643769,
        platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asian-slaw-salad-high-protein',
        platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asian-slaw-salad-high-protein-385481.jpg?v=1633122770',
        platform_data: 'description'
      }
    },
    {
      id: 4,
      customer_subscription_bundle_confirguration_id: 1,
      product_variant_id: 4,
      platform_product_variant_id: 41213176545465,
      quantity: 1,
      created_at: '2021-11-09 21:58:39',
      updated_at: '2021-11-09 21:58:39',
      ProductVariants: {
        id: 4,
        product_id: 4,
        title: 'Asparagus Mushroom Frittata',
        sku: 'KB-177',
        platform_id: 41213176545465,
        platform_url: 'https://quickfresh-sandbox.myshopify.com/products/asparagus-mushroom-frittata-keto-breakfast',
        platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/asparagus-mushroom-frittata-keto-breakfast-367122.jpg?v=1633122770',
        platform_data: 'description'
      }
    },
    {
      id: 5,
      customer_subscription_bundle_confirguration_id: 1,
      product_variant_id: 5,
      platform_product_variant_id: 41479168196793,
      quantity: 1,
      created_at: '2021-11-09 21:58:39',
      updated_at: '2021-11-09 21:58:39',
      ProductVariants: {
        id: 5,
        product_id: 5,
        title: 'Bacon Ranch Chicken',
        sku: 'KH-165',
        platform_id: 6995052527801,
        platform_url: 'https://quickfresh-sandbox.myshopify.com/products/bacon-ranch-chicken-high-protein-2',
        platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/bacon-ranch-chicken-high-protein-727471.jpg?v=1636153469',
        platform_data: 'description'
      }
    },
    {
      id: 6,
      customer_subscription_bundle_confirguration_id: 1,
      product_variant_id: 6,
      platform_product_variant_id: 40812018729145,
      quantity: 1,
      created_at: '2021-11-09 21:58:39',
      updated_at: '2021-11-09 21:58:39',
      ProductVariants: {
        id: 6,
        product_id: 6,
        title: 'Barbados Sirloin',
        sku: 'KH-100',
        platform_id: 40812018729145,
        platform_url: 'https://quickfresh-sandbox.myshopify.com/products/barbados-sirloin-high',
        platform_img: 'https://cdn.shopify.com/s/files/1/0596/3694/0985/products/barbados-sirloin-high-protein-374434.jpg?v=1630652440',
        platform_data: 'description'
      }
    }
  ]
}
    ]
  };


const Dashboard = () => {
  const state = useSelector((state) => state)
  const [active, setActive] = React.useState([]);
  const [limit, setLimit] = React.useState([]);
  const [subscriptions, setSubscriptions] = React.useState([])
  
  React.useEffect(() => {
      const newWeeksArr = []
      const activeWeeksArr = []
      const activeWeeksLimit = []
      customerSubscription.customerSubscriptionBundleContents.forEach((sub, index) =>{
        if(index === 0){
          sub.status = 'sent';
        } else {
          sub.status = 'active';
        }
        const nextSunday = dayjs().day(0).add((7 * index), 'day');
        sub.subscriptionDate = nextSunday.format('MMM DD')
        newWeeksArr.push(sub);

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


  const formatDate = day => {

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
              {sub.CustomerSubscriptionBundleContentSelections.map((item, index) => (
                index < limit[idx] ? <MenuItemCard title={item.ProductVariants.title} image={item.ProductVariants.platform_img} quantity={item.quantity} type='regular' /> : ''
              ))}
              {limit[idx] === 5 ? (
                <Link onClick={() => resetLimit(idx)} className={styles.viewAllLink}>
                  See All <ChevronRightMinor />
                </Link>
              ) : (
                <Link onClick={() => closeLimit(idx)} className={styles.viewAllLink}>
                  Close <ChevronRightMinor />
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
