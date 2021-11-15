import React from 'react'
import styles from './CardCrossedLine.module.scss'

const CardCrossedLine = ({ children, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${
        isSelected ? styles.isSelected : styles.unselected
      }`}
    >
      <div className={styles.children}>{children}</div>
    </div>
  )
}

export default CardCrossedLine
