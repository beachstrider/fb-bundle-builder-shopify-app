import React from 'react'
import { useSelector } from 'react-redux'
import styles from './Location.module.scss'

const Location = () => {
  const state = useSelector((state) => state)

  // TODO: example page
  return (
    <div className="defaultWrapper">
      <div>
        <div className={styles.data}>
          <h1>Step 2</h1>
        </div>
      </div>
    </div>
  )
}

export default Location
