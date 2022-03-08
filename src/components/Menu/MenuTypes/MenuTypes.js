import React, { useEffect, useState } from 'react'
import { mapBundleTypeSubtype } from '../../../utils'
import { getSelectedBundleByPlatformId } from '../../Hooks'
import styles from './MenuTypes.module.scss'

const MenuTypes = ({ bundle, onClick }) => {
  const [types, setTypes] = useState([])
  const [activeType, setActiveType] = useState(0)

  useEffect(() => {
    if (bundle.id) {
      const shopifyBundleProduct = getSelectedBundleByPlatformId(
        bundle.platform_product_id
      )

      const mappedBundleTypes = mapBundleTypeSubtype(shopifyBundleProduct)
      setTypes(mappedBundleTypes)
      if (mappedBundleTypes.length > 0) {
        handleSelectType(mappedBundleTypes[0])
      }
    }
  }, [bundle])

  const handleSelectType = (type) => {
    onClick(type)
    setActiveType(type)
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Choose Your Preference</h3>
      <div className={styles.buttons}>
        {types.map((type) => (
          <div
            key={type.id}
            className={`${styles.button} ${
              activeType.id === type.id && styles.isActive
            }`}
            onClick={() => handleSelectType(type)}
          >
            {type.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuTypes
