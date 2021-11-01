import React from 'react'
import { Link } from 'react-router-dom'
import styles from './AccountInfo.module.scss'
import { SideMenu } from '../Components/SideMenu'

const AccountInfo = () => {

    return (
        <div className="contentWrapper">
            <div className="bundleRow">
                <div className="bundleOneThird">
                    <p></p>
                </div>
                <div className="bundleTwoThirds">
                    <div className="headerOffset">
                        <h2>Account Info</h2>
                    </div>
                </div>
            </div>
            <div className="bundleRow">
                <div className="bundleOneThird">
                    <SideMenu active="account-info" />
                </div>
                <div className="bundleTwoThirds">
                    <div className="bundleBuilderCard">
                        <div className={styles.contentCardWrapper}>
                            <div className={styles.contentCardNavigation}>
                                <h3>Personal Info</h3>
                                <a href="/tools/recurring/login/customer/5410281652409?" className="secondaryButton">Edit Info</a>
                            </div>
                            <div>
                                <p><span className={styles.boldTextField}>Name:</span>Ashton Grover</p>
                                <p><span className={styles.boldTextField}>Email:</span>ashton@quickfreshmeals.com</p>
                                <p><span className={styles.boldTextField}>Phone:</span>555-123-4567</p>
                                <div className={styles.accountAddress}><p><span className={styles.boldTextField}>Address:</span></p><p>1234 Street Dr<br />Anytown, CA 90001</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfo