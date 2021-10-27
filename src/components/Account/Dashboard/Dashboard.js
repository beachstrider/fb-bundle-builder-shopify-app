import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
  const state = useSelector((state) => state)

  return (
    <div className="defaultWrapper">
      <div className={styles.header}>
        <div className={styles.nameHeader}>
            <h1 className={styles.userName}>
                Hi Ashton!
            </h1>
        </div>
        <div className={styles.weekMenu}>
            <p className={styles.weekMenuLabel}>Select Week</p>
            <div className={styles.weekMenuItems}>
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
