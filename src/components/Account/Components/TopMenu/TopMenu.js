import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './TopMenu.module.scss'

const TopMenu = () => {
  const state = useSelector((state) => state)
  return (
      <div className={styles.header}>
        <div className={styles.nameHeader}>
            <h1 className={styles.userName}>
                Hi {shopCustomer.firstName}!
            </h1>
        </div>
        <div className={styles.weekMenu}>
            <p className={styles.weekMenuLabel}>Select Week</p>
            <div className={styles.weekMenuItems}>
                
            </div>
        </div>
      </div>
  )
}

export default TopMenu
