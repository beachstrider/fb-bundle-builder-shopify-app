import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { BUNDLE_MEAL_SECTION_TITLE } from '../../../constants/bundles'
import { MealCard } from '../../Account/Components/MealCard'
import styles from './Review.module.scss'
import { getBreakfastAndMeals } from '../../../utils';

const ReviewItems = ({ items }) => {
  const isF2Meals = process.env.STORE_SETTINGS_KEY === 'f2meals'
  const isQuickfresh = process.env.STORE_SETTINGS_KEY === 'quickfresh'
  const isChow = process.env.STORE_SETTINGS_KEY === 'chow'

  const getTitle = (key) =>
    key.toLowerCase().includes('meal') ? BUNDLE_MEAL_SECTION_TITLE : key

  const state = useSelector((state) => state)
  const history = useHistory()

  return (
    <>
      {Object.keys(items.types).map((key, index) => (
        <div className={`${styles.section} mb-4`} key={index}>
          <div>
            <div className={styles.sectionTitle}>
              <div>
                {
                  isF2Meals || isQuickfresh ? 'Meals' :
                  getTitle(items.labels[key])
                } ({items.totals[key]})
              </div>
              <div
                className={styles.edit}
                onClick={() => history.push(state.steps[3].path)}
              >
                Edit
              </div>
            </div>
          {isQuickfresh ? (
            <>
            {getBreakfastAndMeals(items.types[key]).map( (itemProduct, index) => (
              <div key={index}>
                <div className={styles.sectionTitle}>
                  {itemProduct.length > 0 ? (
                    <div>
                        { index === 0 ? 'Breakfast' : BUNDLE_MEAL_SECTION_TITLE }
                    </div>
                  ) : ('')}
                </div>
                <div className={styles.sectionRow}>
                  {itemProduct.map((item, itemIndex) => (
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
            ))}
            </>
            ) : (
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
          )}
          </div>
        </div>
      ))}
    </>
  )
}

export default ReviewItems
