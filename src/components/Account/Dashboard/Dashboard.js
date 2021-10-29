import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.scss'
import {TopMenu} from '../Components/TopMenu'
import {MenuItemCard} from '../Components/MenuItemCard'

const Dashboard = () => {
  const state = useSelector((state) => state)

  return (
    <div className={styles.accountWrapper}>
      <TopMenu />
      <p>Promo Section</p>
      <div className="contentWrapper">
        <div>
            <div className={styles.menuRow}>
                <h3>Week of Oct 18th</h3>
                <Link to="#" className="button">Track Package</Link>
                <Link to="/order-history" className="button">Order Summary</Link>
            </div>
            <div className={styles.accountMenuRow}>
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <div className={styles.viewAllLink}>
                    <p>See All ></p>
                </div>
            </div>
        </div>
        <div>
            <div className={styles.menuRow}>
                <h3>Week of Oct 25th</h3>
                <Link to="/order-history" className="button">Edit Order</Link>
            </div>
            <div className={styles.accountMenuRow}>
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <MenuItemCard width="20%" />
                <div className={styles.viewAllLink}>
                    <p>See All ></p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
