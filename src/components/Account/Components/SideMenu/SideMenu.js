import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SideMenu.module.scss'

const SideMenu = (props) => {

  return (
    <div className="bundleBuilderCard">
        <div className={styles.menuWrapper}>
            <Link to="/plan-settings" className={props.active === 'plan-settings' ? styles.activeLink : styles.menuLink}>Plan Settings</Link>
            <Link to="/account-info" className={props.active === 'account-info'? styles.activeLink : styles.menuLink}>Account Info</Link>
            <Link to="/payment-method" className={props.active === 'payment-method' ? styles.activeLink : styles.menuLink}>Payment Methods</Link>
            <Link to="/order-history" className={props.active === 'order-history' ? styles.activeLink : styles.menuLink}>OrderHistory</Link>
        </div>
    </div>
  )
}

export default SideMenu
