import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './OrderHistory.module.scss'
import {SideMenu} from '../Components/SideMenu'
import {MenuItemCard} from '../Components/MenuItemCard'
import {
    ChevronRightMinor
  } from '@shopify/polaris-icons';

const menuItems = [
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    }
  
  ]

const OrderHistory = () => {

    if(shopCustomer.id === 0){
        return <Redirect push to="/" />
    }
    
    const dateFormat = (date) => {
        const dateArr = date.split(' ');
        const newDate = dateArr[0];
        const reformatArr = newDate.split('-');
        return `${reformatArr[1]}/${reformatArr[2]}/${reformatArr[0]}`;
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
                <div className="bundleBuilderCard">
                    <div className={styles.contentCardWrapper}>
                        <div className={styles.contentCardNavigation}>
                            <h3>Current Order</h3>
                            <Link to="/account" className="secondaryButton">Edit Order</Link>
                        </div>
                        <div className={styles.currentOrderMenu}>
                            {menuItems.map((item, index) => (
                                index < 3 ? <MenuItemCard item={item} width="27%" /> : ''
                            ))}
                            <Link to="/account" className={styles.seeAllMenu}>
                                See All <ChevronRightMinor />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bundleBuilderCard">
                    <div className={styles.contentCardWrapper}>
                        <div className={styles.contentCardNavigation}>
                            <h3>Past Orders</h3>
                            <p></p>
                        </div>
                        <table className={styles.orderHistoryTable}>
                            <thead className={styles.orderHistoryTableHeaders}>
                                <th>Order Date</th>
                                <th>Order Total</th>
                                <th>Meal Type</th>
                                <th>Meals Names</th>
                            </thead>
                            <tbody>
                            {shopCustomer.orders.map( (order, index) => (
                                    index < 5 ? (
                                        <tr key={index}>
                                            <td>{dateFormat(order.orderDate)}</td>
                                            <td>{order.orderTotal}</td>
                                            <td>Keto</td>
                                            <td className={styles.orderMealNames}>
                                                <p className={styles.orderMealNamesText}>{order.orderItems.map( item => ( item ))}</p>
                                                <a to={order.orderLink} className={styles.orderMealNamesLink}>See All Meals</a>
                                            </td>
                                        </tr>  
                                    ) : ''
                                ))}
                            </tbody>
                        </table>
                        <Link to="#" className={styles.orderHistoryMoreLink}>See More </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderHistory
