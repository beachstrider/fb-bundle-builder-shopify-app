import React from 'react'
import styles from './PlanSettings.module.scss'
import { Link } from 'react-router-dom'
import { SideMenu } from '../Components/SideMenu'
import { MenuItemCard } from '../Components/MenuItemCard'
import {
    ChevronRightMinor
  } from '@shopify/polaris-icons';
  
const PlanSettings = () => {

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
                        <div className={styles.contentCardWrapper}>
                            <div className={styles.contentCardNavigation}>
                                <h3 className={styles.underlinedHeader}>Current Order Date</h3>
                                <Link to="/dashboard" className="secondaryButton">Edit Order</Link>
                            </div>
                            <div className={styles.currentOrderMenu}>
                                <p>Delivery Day: Monday</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanSettings