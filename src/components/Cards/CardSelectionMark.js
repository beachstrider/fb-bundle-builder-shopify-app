import { Icon } from '@shopify/polaris'
import { MobileAcceptMajor } from '@shopify/polaris-icons'
import React from 'react'
import styles from './CardSelectionMark.module.scss'

const CardSelectionMark = ({
  children,
  isSelected,
  onClick,
  isDisabled = false
}) => {
  return (
    <div
      onClick={() => (!isDisabled ? onClick() : {})}
      className={`${styles.card} ${
        isSelected
          ? styles.isSelected
          : isDisabled
          ? styles.disabled
          : styles.unselected
      }`}
    >
      <div>
        {children}
        {isSelected && (
          <div className={styles.checkMarkWrapper}>
            <div className={styles.checkMark}>
              <div className={styles.icon}>
                <Icon source={MobileAcceptMajor} color="base" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CardSelectionMark
