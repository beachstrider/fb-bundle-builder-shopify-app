import React from 'react'
import styles from './AccountInfo.module.scss'
import { SideMenu } from '../Components/SideMenu'

const AccountInfo = () => {

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
            </div>
            <div className="bundleTwoThirds">
                <div>
                    <h1>Account Info</h1>
                </div>
            </div>
        </div>
        <div className="bundleRow">
            <div className="bundleOneThird">
                <SideMenu active="account-info" />
            </div>
            <div className="bundleTwoThirds">
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
                        <h3>Personal Info</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountInfo