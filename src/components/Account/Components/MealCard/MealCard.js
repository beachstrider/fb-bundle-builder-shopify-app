import React from 'react'
import styles from './MealCard.module.scss'

const MealCard = ({ image, title, quantity }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <img className={styles.cardImage} src={image} alt={title} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.itemTitle}>{title}</h3>
        <div className={styles.quantityWrapper}>
          <strong className={styles.number}>{quantity}</strong>
        </div>
      </div>
    </div>
  )
}
export default MealCard
