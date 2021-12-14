import { Icon } from '@shopify/polaris'
import { MobileAcceptMajor } from '@shopify/polaris-icons'
import React from 'react'
import styles from './CardCheckmark.module.scss'

const CardCheckMark = ({ children, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${
        isSelected ? styles.isSelected : styles.unselected
      }`}
    >
      <div className={styles.children}>{children}</div>
      {isSelected && (
        <div className={styles.checkMark}>
          <Icon source={MobileAcceptMajor} color="base" />
        </div>
      )}
    </div>
  )
}

export default CardCheckMark
