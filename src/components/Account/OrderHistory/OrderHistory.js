import React from 'react'
import styles from './OrderHistory.module.scss'
import {SideMenu} from '../Components/SideMenu'
import {MenuItemCard} from '../Components/MenuItemCard'

const OrderHistory = () => {

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
            </div>
            <div className="bundleTwoThirds">
                <div>
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
                    <div className={styles.currentOrderWrapper}>
                        <h3>Current Order</h3>
                        <div className={styles.currentOrderMenu}>
                            <MenuItemCard />
                            <MenuItemCard />
                            <MenuItemCard />
                            <div className={styles.viewMoreLink}>
                                <Link className={styles.viewMoreItemsLink} to="#">
                                    See All
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
                        <h3>Past Orders</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default OrderHistory
