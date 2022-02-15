import React from 'react'
import styles from './CardEntreeType.module.scss'

const CardEntreeType = ({ title, image, options, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${image}')` }}
      >
        &nbsp;
      </div>
      <div className={`${styles.descriptionWrapper} py-5`}>
        <div className={styles.title}>{title}</div>
        <div className={styles.options}>
          <ul>
            {options.map((option, index) => (
              <li key={index}>{option}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CardEntreeType
