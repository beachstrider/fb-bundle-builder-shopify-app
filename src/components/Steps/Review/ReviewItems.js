import React from 'react'
import { BUNDLE_MEAL_SECTION_TITLE } from '../../../constants/bundles'
import { MealCard } from '../../Account/Components/MealCard'
import styles from './Review.module.scss'

const ReviewItems = ({ items }) => {
  const getTitle = (key) =>
    key.toLowerCase().includes('meal') ? BUNDLE_MEAL_SECTION_TITLE : key

  return (
    <>
      {Object.keys(items.types).map((key, index) => (
        <div className={`${styles.section} mb-4`} key={index}>
          <div>
            <div className={styles.sectionTitle}>
              {getTitle(items.labels[key])} ({items.totals[key]})
            </div>
            <div className={styles.sectionRow}>
              {items.types[key].map((item, itemIndex) => (
                <MealCard
                  key={itemIndex}
                  image={
                    item.images.length > 0 && item.images[0]
                      ? item.images[0]
                      : process.env.EMPTY_STATE_IMAGE
                  }
                  title={item.name}
                  quantity={item.quantity}
                  type={item.title}
                  quantityLabel=""
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default ReviewItems
