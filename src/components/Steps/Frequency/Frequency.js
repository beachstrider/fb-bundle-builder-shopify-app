import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  chooseEntree,
  chooseBreakfast,
  selectFaqType,
  displayHeader,
  displayFooter
} from '../../../store/slices/rootSlice'
import {
  FrequencyBreakfast,
  FrequencyEntree,
  FrequencyMainEntree,
  FrequencySubTotal
} from '.'
import styles from './Frequency.module.scss'

const FAQ_TYPE = 'frequency'

const Frequency = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  useEffect(() => {
    dispatch(selectFaqType(FAQ_TYPE))
    dispatch(displayHeader(true))
    dispatch(displayFooter(true))

    // TODO: fetch data from API
    if (!state.entree.id) {
      dispatch(chooseEntree(entrees[0]))
    }

    if (!state.breakfast.id) {
      dispatch(chooseBreakfast(breakfasts[0]))
    }
  }, [])

  // TODO: pull from API
  const entrees = [
    {
      id: 1,
      name: 'FreshStart',
      description: '7-Days All inclusive - (14 Entrees + 7 Breakfast)',
      price: 7.3,
      weeklyPrice: 153.3
    },
    {
      id: 2,
      name: '10',
      description: '',
      price: 10.95,
      weeklyPrice: 109.5
    },
    {
      id: 3,
      name: '6',
      description: '',
      price: 11.95,
      weeklyPrice: 71.7
    }
  ]

  // TODO: pull from API
  const prices = [
    {
      name: 'Per Entree',
      price: '$7.30'
    },
    {
      name: 'Breakfasts',
      price: 'Free'
    }
  ]

  // TODO: pull from API
  const breakfasts = [
    {
      id: 1,
      name: '7',
      price: 'Free'
    },
    {
      id: 2,
      name: '5',
      price: 'Free'
    },
    {
      id: 3,
      name: '3',
      price: 'Free'
    },
    {
      id: 4,
      name: 'none',
      price: 'None'
    }
  ]

  const handleSelectEntree = (entree) => {
    dispatch(chooseEntree(entree))
  }

  const handleSelectBreakfast = (breakfast) => {
    dispatch(chooseBreakfast(breakfast))
  }

  return (
    <div className="mb-10">
      <div className={styles.wrapper}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.section}>
              <div className={styles.title}>Entrees</div>
              <div>Every Meal is ready in 2 Mins</div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={`${styles.subRow} ${styles.subRowFullWidth}`}>
              <FrequencyMainEntree
                data={entrees[0]}
                isSelected={entrees[0].id === state.entree.id}
                onClick={() => handleSelectEntree(entrees[0])}
              />
            </div>
            <div className={styles.subRow}>
              {entrees.map(
                (entree, index) =>
                  index !== 0 && (
                    <FrequencyEntree
                      data={entree}
                      key={entree.id}
                      isSelected={entree.id === state.entree.id}
                      onClick={() => handleSelectEntree(entree)}
                    />
                  )
              )}
            </div>
          </div>
          <div className="displayTablet">
            <FrequencySubTotal />
          </div>
        </div>
      </div>

      <div className={`${styles.wrapper} mt-8`}>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={styles.section}>
              <div className={styles.title}>Breakfasts</div>
              <div>Every Meal is ready in 2 Mins</div>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.column}>
            <div className={`${styles.subRow} ${styles.subRowFourColumns}`}>
              {breakfasts.map((breakfast, index) => (
                <FrequencyBreakfast
                  data={breakfast}
                  key={breakfast.id}
                  isSelected={breakfast.id === state.breakfast.id}
                  onClick={() => handleSelectBreakfast(breakfast)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="displayMobile">
          <FrequencySubTotal />
        </div>
      </div>
    </div>
  )
}

export default Frequency
