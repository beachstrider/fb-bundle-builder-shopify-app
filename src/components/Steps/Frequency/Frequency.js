import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setEntree,
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
import { withActiveStep } from '../../Hooks'

const FAQ_TYPE = 'frequency'
const STEP_ID = 1

const entrees = [
  {
    id: 1,
    name: 'FreshStart',
    description: '7-Days All inclusive - (14 Entrees + 7 Breakfast)',
    price: 7.3,
    weeklyPrice: 153.3,
    breakfasts: [
      {
        name: '7',
        price: 'Free'
      },
      {
        name: 'none',
        price: 'None'
      }
    ]
  },
  {
    id: 2,
    name: '10',
    description: '',
    price: 10.95,
    weeklyPrice: 109.5,
    breakfasts: [
      {
        name: '5',
        price: 25
      },
      {
        name: 'none',
        price: 'None'
      }
    ]
  },
  {
    id: 3,
    name: '6',
    description: '',
    price: 11.95,
    weeklyPrice: 71.7,
    breakfasts: [
      {
        name: '3',
        price: 15
      },
      {
        name: 'none',
        price: 'None'
      }
    ]
  }
]

const Frequency = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [selectedEntree, setSelectedEntree] = useState({})

  useEffect(() => {
    dispatch(selectFaqType(FAQ_TYPE))
    dispatch(displayHeader(true))
    dispatch(displayFooter(true))

    if (!state.entree.id) {
      const defaultEntree = mapEntreeToStore(
        entrees[0],
        entrees[0].breakfasts[0]
      )
      dispatch(setEntree(defaultEntree))
    }
  }, [])

  useEffect(() => {
    setSelectedEntree(() => entrees.find((e) => e.id === state.entree.id) || [])
  }, [state.entree.id])

  const mapEntreeToStore = (entree, breakfast = null) => {
    const defaultBreakfast = breakfast || entree.breakfasts[0]

    const newEntree = {
      ...entree,
      breakfast: defaultBreakfast
    }

    if (newEntree.breakfasts) {
      delete newEntree.breakfasts
    }
    return newEntree
  }

  const handleSelectEntree = (entree) => {
    const mappedEntree = mapEntreeToStore(entree)
    dispatch(setEntree(mappedEntree))
  }

  const handleSelectBreakfast = (breakfast) => {
    const mappedEntree = mapEntreeToStore(state.entree, breakfast)
    dispatch(setEntree(mappedEntree))
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
            <FrequencySubTotal
              entreePrice={state.entree?.weeklyPrice}
              breakfastPrice={state.entree?.breakfast?.price}
            />
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
            {selectedEntree.id && (
              <div className={`${styles.subRow} ${styles.subRowFourColumns}`}>
                {selectedEntree.breakfasts.map((breakfast, index) => (
                  <FrequencyBreakfast
                    key={index}
                    data={breakfast}
                    isSelected={breakfast.name === state.entree.breakfast.name}
                    onClick={() => handleSelectBreakfast(breakfast)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="displayMobile">
          <FrequencySubTotal
            entreePrice={state.entree?.weeklyPrice}
            breakfastPrice={state.entree?.breakfast?.price}
          />
        </div>
      </div>
    </div>
  )
}

export default withActiveStep(Frequency, STEP_ID)
