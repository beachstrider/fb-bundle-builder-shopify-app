import React from 'react'
import styles from './PlanSettings.module.scss'
import { Link } from 'react-router-dom'
import {SideMenu} from '../Components/SideMenu'
import {MenuItemCard} from '../Components/MenuItemCard'

const PlanSettings = () => {

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
                <p></p>
            </div>
            <div className="bundleTwoThirds">
                <div>
                    <h1>Plan Settings</h1>
                </div>
            </div>
        </div>
        <div className="bundleRow">
            <div className="bundleOneThird">
                <SideMenu active="plan-settings" />
            </div>
            <div className="bundleTwoThirds">
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
                        <div className={styles.currentOrderNavigation}>
                            <h3>Current Order</h3>
                            <Link to="/dashboard" className="button button--secondary">Edit Order</Link>
                        </div>
                        <div className={styles.currentOrderMenu}>
                            <MenuItemCard width="30%" />
                            <MenuItemCard width="30%" />
                            <MenuItemCard width="30%" />
                            <Link to="/dashboard" className={styles.seeAllMenu}>
                                See All
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
                        <div className={styles.currentOrderNavigation}>
                            <h3 className={styles.underlinedHeader}>Current Order Date</h3>
                            <Link to="/dashboard" className="button button--secondary">Edit Order</Link>
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