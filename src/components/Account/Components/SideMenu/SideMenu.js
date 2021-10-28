import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './SideMenu.module.scss'

const SideMenu = (props) => {
  const state = useSelector((state) => state)

  return (
    <div className="bundleBuilderCard">
        <div className={styles.menuWrapper}>
            <a href="/plan-settings" className={props.active === 'plan-settings' ? styles.activeLink : styles.menuLink}>Plan Settings</a>
            <a href="/account-info" className={props.active === 'account-info'? styles.activeLink : styles.menuLink}>Account Info</a>
            <a href="/payment-method" className={props.active === 'payment-method' ? styles.activeLink : styles.menuLink}>Payment Methods</a>
            <a href="/order-history" className={props.active === 'order-history' ? styles.activeLink : styles.menuLink}>OrderHistory</a>
        </div>
    </div>
  )
}

export default SideMenu
