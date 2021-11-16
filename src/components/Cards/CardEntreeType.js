import React from 'react'
import styles from './CardEntreeType.module.scss'

const CardEntreeType = ({
  title,
  image,
  options,
  primaryColor,
  onClick,
  isSelected
}) => {
  return (
    <div
      className={styles.card}
      style={{
        border: isSelected
          ? `4px solid ${primaryColor}`
          : `1px solid ${primaryColor}`,
        borderRadius: isSelected ? '1.5rem' : '1rem'
      }}
      onClick={onClick}
    >
      <div
        className={styles.image}
        style={{ backgroundImage: `url('${image}')` }}
      >
        &nbsp;
      </div>
      <div className={`${styles.descriptionWrapper} py-5`}>
        <div className={styles.title} style={{ color: primaryColor }}>
          {title}
        </div>
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
