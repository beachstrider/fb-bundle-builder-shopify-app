import React from 'react'
import styles from './PlanSettings.module.scss'
import { Link, Redirect } from 'react-router-dom'
import { SideMenu } from '../Components/SideMenu'
import { MenuItemCard } from '../Components/MenuItemCard'
import {
    ChevronRightMinor
  } from '@shopify/polaris-icons';
  

  const menuItems = [
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    },
    {
      title: 'Buffalo Mozzarella Chicken',
      quantity: 1,
      type: 'Regular'
    }
  
  ]

const PlanSettings = () => {

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
                        <h2>Plan Settings</h2>
                    </div>
                </div>
            </div>
            <div className="bundleRow">
                <div className="bundleOneThird">
                    <SideMenu active="plan-settings" />
                </div>
                <div className="bundleTwoThirds">
                    <div className="bundleBuilderCard">
                        <div className={styles.contentCardWrapper}>
                            <div className={styles.contentCardNavigation}>
                                <h3>Current Order</h3>
                                <Link to="/account" className="secondaryButton">Edit Order</Link>
                            </div>
                            <div className={styles.currentOrderMenu}>
                                {menuItems.map((item, index) => (
                                    index < 3 ? <MenuItemCard item={item} width="27%" /> : ''
                                ))}
                                <Link to="/account" className={styles.seeAllMenu}>
                                    See All <ChevronRightMinor />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="bundleBuilderCard">
                        <div className={styles.contentCardWrapper}>
                            <div className={styles.contentCardNavigation}>
                                <h3 className={styles.underlinedHeader}>Current Order Date</h3>
                                <Link to="/dashboard" className="secondaryButton">Edit Order</Link>
                            </div>
                            <div className={styles.currentOrderMenu}>
                                <p>Delivery Day: Monday</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlanSettings