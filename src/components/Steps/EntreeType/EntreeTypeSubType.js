import React from 'react'
import { CardSelectionMark } from '../../Cards'
import {
  METAFIELD_CALORIE_RANGE,
  METAFIELD_AVERAGE_MACROS
} from '../../../constants/bundles'
import { getBundleMetafield, settings } from '../../../utils'
import styles from './EntreeSubType.module.scss'

const EntreeTypeSubType = ({
  title,
  metafields,
  isSelected,
  onClick,
  extraPricePerMeal = 0
}) => {
  const displayAverageMacros = settings().display().averageMacros
  const isF2Meals = process.env.STORE_SETTINGS_KEY === 'f2meals'

  return (
    <CardSelectionMark isSelected={isSelected} onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={styles.extraPriceWrapper}>
          {extraPricePerMeal === 0 ? (
            <div>&nbsp;</div>
          ) : (
            <span className={styles.Toplabel}>
              +${extraPricePerMeal} PER MEAL
            </span>
          )}
        </div>
        <div
          className={
            isF2Meals ? styles.extraLargerTitle :  displayAverageMacros ? styles.largerTitle : styles.title
          }
        >
          {title}
        </div>
        <div
          className={
            displayAverageMacros ? styles.valueWithMacros : styles.value
          }
        >
          {getBundleMetafield(metafields, METAFIELD_CALORIE_RANGE)?.value}
        </div>
        <div className={styles.label__italic}>
          {settings().labels().bundleCalorieRange}
        </div>
        {displayAverageMacros && (
          <>
            <div className={styles.valueWithMacros}>
              {getBundleMetafield(metafields, METAFIELD_AVERAGE_MACROS)?.value}
            </div>
            <div className={styles.label__italic}>Average Macros</div>
          </>
        )}
      </div>
    </CardSelectionMark>
  )
}

export default EntreeTypeSubType
