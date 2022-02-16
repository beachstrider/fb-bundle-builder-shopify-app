import React from 'react'
import { ButtonSmall } from '../../Buttons'
import styles from './MostPopularBar.module.scss'

const MostPopularBar = ({ isLoading, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Can’t Decide What to Order?</div>
      <div className={styles.text}>
        Simply click the button below and we’ll select our most popular meals
        for you!
      </div>
      <div className="px-5">
        <ButtonSmall
          className={styles.bannerButton}
          onClick={onClick}
          usePrimaryColor
          label="Select For Me"
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default MostPopularBar
