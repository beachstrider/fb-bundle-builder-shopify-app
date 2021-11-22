import React from 'react'
import { ButtonCheckMark, ButtonQuantities } from '../Buttons'
import styles from './CardQuantities.module.scss'

const CardQuantities = ({
  title,
  image,
  info,
  quantity,
  isChecked,
  onClick,
  onAdd,
  onRemove
}) => {
  return (
    <div className={styles.card}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${image}')` }}
      >
        &nbsp;
      </div>
      <div className={`${styles.descriptionWrapper} py-5`}>
        <div className={`${styles.title} mb-3`}>{title}</div>
        <div className={styles.description}>
          <div>
            <div className={styles.subTitle}>{info.fat}</div>
            <div>Fat</div>
          </div>
          <div
            className={isChecked ? styles.selectedLine : styles.unselectedLine}
          >
            <div className={styles.subTitle}>{info.carbs}</div>
            <div>Carbs</div>
          </div>
          <div
            className={isChecked ? styles.selectedLine : styles.unselectedLine}
          >
            <div className={styles.subTitle}>{info.protein}</div>
            <div>Protein</div>
          </div>
          <div
            className={isChecked ? styles.selectedLine : styles.unselectedLine}
          >
            <div className={styles.subTitle}>{info.calories}</div>
            <div>Calories</div>
          </div>
        </div>
        <div className={`${styles.actions} mt-5`}>
          <div>
            <ButtonCheckMark isChecked={isChecked} onClick={onClick} />
          </div>
          {isChecked && (
            <div>
              <ButtonQuantities
                quantity={quantity}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CardQuantities
