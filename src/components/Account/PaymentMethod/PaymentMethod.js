import React from 'react'
import styles from './PaymentMethod.module.scss'
import {SideMenu} from '../Components/SideMenu'

const PaymentMethod = () => {

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
            </div>
            <div className="bundleTwoThirds">
                <div>
                    <h1>Payment Method</h1>
                </div>
            </div>
        </div>
        <div className="bundleRow">
            <div className="bundleOneThird">
                <SideMenu active='payment-method' />
            </div>
            <div className="bundleTwoThirds">
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
                        <h3>Default Card</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaymentMethod