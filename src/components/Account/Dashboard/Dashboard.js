import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import {TopMenu} from '../Components/TopMenu'
import {MenuItemCard} from '../Components/MenuItemCard'
import {
  ChevronRightMinor
} from '@shopify/polaris-icons';

const Dashboard = () => {
  const state = useSelector((state) => state)

  return (
    <div className={styles.accountWrapper}>
      <TopMenu />
      <div className={styles.promoSection}>
        <p>Promo Section</p>
      </div>
      <div className="contentWrapper">
        <div className={styles.subscriptionRow}>
            <div className={styles.menuRow}>
              <div className={styles.headerWthLink}>
                <h3>Week of Oct 18th</h3>
                <Link to="#" className={styles.primaryLink}>Track Package</Link>
              </div>
              <Link to="/order-history" className="secondaryButton">Order Summary</Link>
            </div>
            <div className={styles.accountMenuRow}>
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <Link to="/order-history" className={styles.viewAllLink}>
                  See All <ChevronRightMinor />
                </Link>
            </div>
        </div>
        <div>
            <div className={styles.menuRow}>
                <h3>Week of Oct 25th</h3>
                <Link to="/order-history" className="secondaryButton">Edit Order</Link>
            </div>
            <div className={styles.accountMenuRow}>
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <Link to="/order-history" className={styles.viewAllLink}>
                  See All <ChevronRightMinor />
                </Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
