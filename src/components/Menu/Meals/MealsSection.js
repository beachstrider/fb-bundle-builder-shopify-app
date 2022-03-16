import React from 'react'
import { BUNDLE_MEAL_SECTION_TITLE } from '../../../constants/bundles'
import CardBasic from '../../Cards/CardBasic'
import styles from './MealsSection.module.scss'

const MealsSection = ({ content }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.listHeader}>
        <div className={styles.title}>
          {content.title === 'Meals'
            ? BUNDLE_MEAL_SECTION_TITLE
            : content.title}
        </div>
      </div>
      <div className={styles.cards}>
        {content.products.map((item) => (
          <CardBasic
            key={item.id}
            title={item.name}
            description={item.description}
            image={
              item.feature_image
                ? item.feature_image.src
                : item.images.length > 0
                ? item.images[0]
                : process.env.EMPTY_STATE_IMAGE
            }
            metafields={item.metafields}
            productMetafields={item.productMetafields}
            quantity={0}
          />
        ))}
      </div>
    </div>
  )
}

export default MealsSection
