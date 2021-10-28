import React from 'react'
import styles from './PlanSettings.module.scss'
import {SideMenu} from '../Components/SideMenu'

const PlanSettings = () => {

  return (
    <div className="contentWrapper">
        <div className="bundleRow">
            <div className="bundleOneThird">
            </div>
            <div className="bundleTwoThirds">
                <div>
                    <h1>Plan Settings</h1>
                </div>
            </div>
        </div>
        <div className="bundleRow">
            <div className="bundleOneThird">
                <SideMenu active="plan-settings" />
            </div>
            <div className="bundleTwoThirds">
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
                        <h3>Current Order</h3>
                    </div>
                </div>
                <div className="bundleBuilderCard">
                    <div className={styles.currentOrderWrapper}>
                        <h3>Current Order Date</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlanSettings