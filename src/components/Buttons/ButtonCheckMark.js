import React from 'react'
import styles from './ButtonCheckMark.module.scss'
import { Icon } from '@shopify/polaris'
import { MobileAcceptMajor } from '@shopify/polaris-icons'

const ButtonCheckMark = ({
  onClick,
  isChecked,
  label = 'Add',
  labelOnClick = 'Added',
  isFromModal = false
}) => {
  const getClassnameWrapper = () => {
    return `${styles.wrapper} ${isChecked && styles.activeWrapper} ${
      isFromModal && styles.isFromModal
    } buttons`
  }

  const getClassnameButton = () => {
    return `${styles.button} ${
      isChecked && !isFromModal ? styles.primaryButton : styles.bigPrimaryButton
    } ${styles.buttonWrapper}`
  }

  return (
    <div className={getClassnameWrapper()} onClick={onClick}>
      <div className={getClassnameButton()}>
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
