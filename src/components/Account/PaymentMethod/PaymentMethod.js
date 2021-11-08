import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import styles from './PaymentMethod.module.scss'
import {SideMenu} from '../Components/SideMenu'

const PaymentMethod = () => {

    if(shopCustomer.id === 0){
        return <Redirect push to="/" />
    }

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
                <p></p>
            </div>
            <div className="bundleTwoThirds">
                <div className="headerOffset">
                    <h2>Payment Method</h2>
                </div>
            </div>
        </div>
        <div className="bundleRow">
            <div className="bundleOneThird">
                <SideMenu active='payment-method' />
            </div>
            <div className="bundleTwoThirds">
                <div className="bundleBuilderCard">
                    <div className={styles.contentCardWrapper}>
                        <div className={styles.contentCardNavigation}>
                            <h3>Default Card</h3>
                            <a href="#" className="secondaryButton">Edit Info</a>
                        </div>
                        <div>
                            <p><span className={styles.boldTextField}>Name:</span>{shopCustomer.fullName}</p>
                            <p><span className={styles.boldTextField}>Card Number:</span>***************1234</p>
                            <div className={styles.accountAddress}><p><span className={styles.boldTextField}>Billing Address:</span></p><p>{shopCustomer.address.street}<br />{shopCustomer.address.city}, {shopCustomer.address.provinceCode} {shopCustomer.address.zip}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentMethod