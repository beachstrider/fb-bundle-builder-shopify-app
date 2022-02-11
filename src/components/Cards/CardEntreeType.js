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
        <div className={styles.title}>{title}</div>
        <div className={styles.options}>
          {getBundleMetafield(metafields, METAFIELD_KEY_POINTS)?.value}
        </div>
        <div className="defaultWrapper">
          <div>{getBundleMetafield(metafields, METAFIELD_CARBS)?.value}</div>
          <div>{getBundleMetafield(metafields, METAFIELD_PROTEIN)?.value}</div>
          <div>{getBundleMetafield(metafields, METAFIELD_FAT)?.value}</div>
        </div>
      </div>
    </div>
  )
}

export default CardEntreeType
