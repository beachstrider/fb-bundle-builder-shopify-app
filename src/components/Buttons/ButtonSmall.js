import React from 'react'
import SpinnerIcon from '../Global/SpinnerIcon'
import styles from './ButtonSmall.module.scss'

const ButtonSmall = ({
  onClick,
  usePrimaryColor,
  isLoading = false,
  label = 'Submit',
  className
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        usePrimaryColor && styles.activeWrapper
      } buttons`}
      onClick={onClick}
    >
      <div
        className={`${styles.button} ${className} ${
          usePrimaryColor ? styles.primaryButton : styles.lightButton
        } ${styles.buttonWrapper}`}
      >
        {isLoading ? <SpinnerIcon /> : <div>{label}</div>}
      </div>
    </div>
  )
}

export default ButtonSmall
