import React from 'react'
import { Link } from 'react-router-dom'
import styles from './OrderHistory.module.scss'
import {SideMenu} from '../Components/SideMenu'
import {MenuItemCard} from '../Components/MenuItemCard'
import {
    ChevronRightMinor
  } from '@shopify/polaris-icons';

const OrderHistory = () => {
  console.log(shopUser)
  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
                <p></p>
            </div>
            <div className="bundleTwoThirds">
                <div className="headerOffset">
                    <h1>Order History</h1>
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
                            <MenuItemCard width="27%" />
                            <MenuItemCard width="27%" />
                            <MenuItemCard width="27%" />
                            <Link to="/account" className={styles.seeAllMenu}>
                                See All <ChevronRightMinor />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
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
                                <tr>
                                    <td>11/11/2021</td>
                                    <td>$154.00</td>
                                    <td>Keto</td>
                                    <td className={styles.orderMealNames}>
                                        <p className={styles.orderMealNamesText}>Pink Peppercorn Sirloin, Barbados Sirlion, Another Meal Name and Another to make it long enough.</p>
                                        <Link to="#" className={styles.orderMealNamesLink}>See All Meals</Link>
                                    </td>
                                </tr>
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
