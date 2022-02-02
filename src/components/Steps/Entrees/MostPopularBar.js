import React, { useState } from 'react'
import { ButtonSmall } from '../../Buttons'
import styles from './MostPopularBar.module.scss'

const MostPopularBar = () => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>
        Can't decide? Click here and we'll send you our most popular meals.
      </div>
      <div className="px-5">
        <ButtonSmall
          onClick={() => console.log('clicked...')}
          usePrimaryColor
          label="Most Popular"
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default MostPopularBar
