import React from 'react'
import styles from './ButtonCheckMark.module.scss'
import { Icon } from '@shopify/polaris'
import { MobileAcceptMajor } from '@shopify/polaris-icons'

const ButtonCheckMark = ({
  onClick,
  isChecked,
  label = 'Add',
  labelOnClick = 'Added',
  isFromModal = false,
  disableAdd = false
}) => {
  const getClassNameWrapper = () => {
    return `${styles.wrapper} ${isChecked && styles.activeWrapper} ${
      isFromModal && styles.isFromModal
    } buttons`
  }

  const getClassNameButton = () => {
    const showPrimaryButton =
      isChecked && !isFromModal ? styles.primaryButton : styles.bigPrimaryButton
    const showDisabledButton =
      !isChecked && disableAdd ? styles.bigPrimaryButtonDisabled : ''

    return `${styles.button} ${showPrimaryButton} ${showDisabledButton} ${styles.buttonWrapper}`
  }

  return (
    <div className={getClassNameWrapper()} onClick={onClick}>
      <div className={getClassNameButton()}>
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
