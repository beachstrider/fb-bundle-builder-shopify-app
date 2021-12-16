import React from 'react'
import styles from './CardCrossedLine.module.scss'

const CardCrossedLine = ({
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
      <div className={styles.children}>{children}</div>
    </div>
  )
}

export default CardCrossedLine
