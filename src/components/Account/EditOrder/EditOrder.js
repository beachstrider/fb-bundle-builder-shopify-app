import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Redirect, useParams } from 'react-router-dom'
import styles from './EditOrder.module.scss'
import {MenuItemCard} from '../Components/MenuItemCard'
import * as dayjs from 'dayjs';

const menu = {
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
    };

const EditOrder = () => {
    let { orderId } = useParams();
    React.useEffect(() => {

    }, []);

    if(shopCustomer.id === 0){
        return <Redirect push to="/" />
    }

    return (
        <div className="contentWrapper">
            <div>
                <h3 className={styles.header}>Choose Meal Items</h3>
                <div className={styles.subHeaderRow}>
                    <p className={styles.subHeaders}><span className={styles.greenNumbers}>4</span> Breakfasts Left</p>
                    <p className={styles.subHeaders}><span className={styles.greenNumbers}>4</span> Entrees Left</p>
                </div>
            </div>
            <div>
                <div className={styles.headerRow}>
                    <h3 className={styles.noMargin}>Breakfasts</h3>
                    <p className={styles.subHeaders}><span className={styles.greenNumbers}>4</span> Breakfasts Left</p>      
                </div>
                <div className={styles.menuRow}>
                    {menu.CustomerSubscriptionBundleContentSelections.map((item, index) => (
                        <MenuItemCard key={index} title={item.ProductVariants.title} image={item.ProductVariants.platform_img} quantity={item.quantity} type='regular' />
                    ))}
                </div>
            </div>
            <div>
                <div className={styles.headerRow}>
                    <h3 className={styles.noMargin}>Entrees</h3>
                    <p className={styles.subHeaders}><span className={styles.greenNumbers}>4</span> Entrees Left</p>
                </div>
                <div className={styles.menuRow}>
                    {menu.CustomerSubscriptionBundleContentSelections.map((item, index) => (
                        <MenuItemCard key={index} title={item.ProductVariants.title} image={item.ProductVariants.platform_img} quantity={item.quantity} type='regular' />
                    ))}
                </div>
            </div>
            <div className={styles.buttonsRow}>
                    <Link to="/account" className="secondaryButton">Cancel</Link>
                    <Link to="/account" className="primaryButton">Save</Link> 
            </div>
        </div>
    )
}
    
export default EditOrder
    