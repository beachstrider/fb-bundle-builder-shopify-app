import React from 'react'
import styles from './ButtonCheckMark.module.scss'
import { Icon } from '@shopify/polaris'
import { MobileAcceptMajor } from '@shopify/polaris-icons'

const ButtonCheckMark = ({
  onClick,
  isChecked,
  label = 'Add',
  labelOnClick = 'Added'
}) => {
  return (
    <div
      className={`${styles.wrapper} ${
        isChecked && styles.activeWrapper
      } buttons`}
      onClick={onClick}
    >
      <div
        className={`${styles.button} ${
          isChecked ? styles.primaryButton : styles.lightButton
        } ${styles.buttonWrapper}`}
      >
        {isChecked ? (
          <div className={styles.addedButton}>
            <div>{labelOnClick}</div>
            <div className={styles.checkMark}>
              <Icon source={MobileAcceptMajor} />
            </div>
          </div>
        ) : (
          <div>{label}</div>
        )}
      </div>
    </div>
  )
}

export default ButtonCheckMark
