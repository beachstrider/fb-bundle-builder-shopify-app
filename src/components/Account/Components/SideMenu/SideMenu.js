import React from 'react'
import { Link } from 'react-router-dom'
import styles from './SideMenu.module.scss'

import {
  NoteMajor,
  ProfileMajor,
  CreditCardMajor,
  ShipmentMajor
} from '@shopify/polaris-icons';

const SideMenu = (props) => {

  return (
    <div className="bundleBuilderCard">
      <div className={styles.menuWrapper}>
        <Link to="/plan-settings" className={props.active === 'plan-settings' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><NoteMajor /></span>
          Plan Settings
        </Link>
        <Link to="/account-info" className={props.active === 'account-info' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><ProfileMajor /></span>
          Account Info
        </Link>
        <Link to="/payment-method" className={props.active === 'payment-method' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><CreditCardMajor /></span>
          Payment Methods
        </Link>
        <Link to="/order-history" className={props.active === 'order-history' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><ShipmentMajor /></span>
          OrderHistory
        </Link>
      </div>
    </div>
  )
}

export default SideMenu
