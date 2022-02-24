import React from 'react'
import {
  METAFIELD_CARBS,
  METAFIELD_FAT,
  METAFIELD_KEY_POINTS,
  METAFIELD_PROTEIN
} from '../../constants/bundles'
import { getBundleMetafield } from '../../utils'
import styles from './CardEntreeType.module.scss'

const CardEntreeType = ({
  title,
  image,
  metafields,
  primaryColor,
  onClick,
  isSelected
}) => {
  return (
    <div className={styles.card} onClick={onClick}>
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
        <div className={`${styles.keyPoints} mb-2`}>
          <div>
            {getBundleMetafield(metafields, METAFIELD_KEY_POINTS)?.value}
          </div>
        </div>
        <div className="defaultWrapper">
          <div className={styles.nutrition}>
            <div className={styles.value}>
              {getBundleMetafield(metafields, METAFIELD_CARBS)?.value}
            </div>
            <div className={styles.label}>Net Carbs</div>
          </div>
          <div className={styles.nutrition}>
            <div className={styles.value}>
              {getBundleMetafield(metafields, METAFIELD_PROTEIN)?.value}
            </div>
            <div className={styles.label}>Protein</div>
          </div>
          <div className={styles.nutrition}>
            <div className={styles.value}>
              {getBundleMetafield(metafields, METAFIELD_FAT)?.value}
            </div>
            <div className={styles.label}>Fat</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardEntreeType
