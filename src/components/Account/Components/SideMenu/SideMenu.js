import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styles from './SideMenu.module.scss'

import {
  NoteMajor,
  ProfileMajor,
  CreditCardMajor,
  ShipmentMajor
} from '@shopify/polaris-icons';

function useQuery () {
  const { search } = useLocation()

  return React.useMemo(() => new URLSearchParams(search), [search])
}

const SideMenu = (props) => {
  const query = useQuery()
  const currentDate = query.get('date')

  return (
    <div className="bundleBuilderCard">
      <div className={styles.menuWrapper}>
        <Link to={`/plan-settings?date=${currentDate}`} className={props.active === 'plan-settings' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><NoteMajor /></span>
          Plan Settings
        </Link>
        <Link to={`/account-info?date=${currentDate}`} className={props.active === 'account-info' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><ProfileMajor /></span>
          Account Info
        </Link>
        <Link to={`/payment-method?date=${currentDate}`} className={props.active === 'payment-method' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><CreditCardMajor /></span>
          Payment Methods
        </Link>
        <Link to={`/order-history?date=${currentDate}`} className={props.active === 'order-history' ? styles.activeLink : styles.menuLink}>
          <span className={styles.iconWrapper}><ShipmentMajor /></span>
          OrderHistory
        </Link>
      </div>
    </div>
  )
}

export default SideMenu
