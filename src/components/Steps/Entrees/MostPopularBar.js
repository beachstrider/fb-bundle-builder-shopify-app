import React from 'react'
import { ButtonSmall } from '../../Buttons'
import styles from './MostPopularBar.module.scss'

const MostPopularBar = ({ isLoading, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        Can't decide? Click here and we'll send you our most popular meals.
      </div>
      <div className="px-5">
        <ButtonSmall
          onClick={onClick}
          usePrimaryColor
          label="Most Popular"
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default MostPopularBar
