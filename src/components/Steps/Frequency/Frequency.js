import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  setBundle,
  selectFaqType,
  displayHeader,
  displayFooter,
  setIsNextButtonActive,
  reset
} from '../../../store/slices/rootSlice'
import {
  FrequencyBreakfast,
  FrequencyEntree,
  FrequencyMainEntree,
  FrequencySubTotal
} from '.'
import styles from './Frequency.module.scss'
import { withActiveStep } from '../../Hooks'
import Loading from '../Components/Loading'

const FAQ_TYPE = 'frequency'
const STEP_ID = 1

const bundles = [
  {
    id: 1,
    name: '14 Entrees',
    description: '7-Days All inclusive - (14 Entrees + 7 Breakfast)',
    price: 9.95,
    entreesQuantity: 14,
    breakfastsQuantity: 7,
    breakfasts: [
      {
        name: '7',
        price: 4.95,
        tag: '7 Day with breakfast'
      },
      {
        name: 'none',
        price: 'None',
        tag: '7 Day'
      }
    ]
  },
  {
    id: 2,
    name: '10',
    description: '',
    price: 11.95,
    entreesQuantity: 10,
    breakfastsQuantity: 5,
    breakfasts: [
      {
        name: '5',
        price: 5.95,
        tag: '5 Day with breakfast'
      },
      {
        name: 'none',
        price: 'None',
        tag: '5 Day'
      }
    ]
  },
  {
    id: 3,
    name: '6',
    description: '',
    price: 12.95,
    entreesQuantity: 6,
    breakfastsQuantity: 3,

    breakfasts: [
      {
        name: '3',
        price: 5.95,
        tag: '3 Day with breakfast'
      },
      {
        name: 'none',
        price: 'None',
        tag: '3 Day'
      }
    ]
  }
]


const Frequency = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [selectedBundle, setSelectedBundle] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    initializeApp()   
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setSelectedBundle(() => bundles.find((e) => e.id === state.bundle.id) || [])
    }
  }, [state.bundle.id])

  const clearState = () => new Promise((resolve) => {
    setTimeout(() => {
      dispatch(reset())
      
      resolve('ok');
    }, 1000);
  });

  const initializeApp = async () => {
    setIsLoading(true)
    await clearState()
    
    dispatch(selectFaqType(FAQ_TYPE))
    dispatch(displayHeader(true))
    dispatch(displayFooter(true))
    dispatch(setIsNextButtonActive(true))

    const defaultEntree = mapBundleToStore(bundles[0], bundles[0].breakfasts[0])
    dispatch(setBundle(defaultEntree))
    setIsLoading(false)
  }

  const mapBundleToStore = (bundle, breakfast = null) => {
    const defaultBreakfast = breakfast || bundle.breakfasts[0]

    const newBundle = {
      ...bundle,
      breakfast: defaultBreakfast
    }

    if (newBundle.breakfasts) {
      delete newBundle.breakfasts
    }
    return newBundle
  }

  const handleSelectBundle = (bundle) => {
    const mappedBundle = mapBundleToStore(bundle)
    dispatch(setBundle(mappedBundle))
  }

  const handleSelectBreakfast = (breakfast) => {
    const mappedBundle = mapBundleToStore(state.bundle, breakfast)
    dispatch(setBundle(mappedBundle))
  }

  if (isLoading) {
    return <Loading />
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
                data={bundles[0]}
                quantity={bundles[0].entreesQuantity}
                isSelected={bundles[0].id === state.bundle.id}
                onClick={() => handleSelectBundle(bundles[0])}
              />
            </div>
            <div className={styles.subRow}>
              {bundles.map(
                (bundle, index) =>
                  index !== 0 && (
                    <FrequencyEntree
                      key={bundle.id}
                      data={bundle}
                      quantity={bundle.entreesQuantity}
                      isSelected={bundle.id === state.bundle.id}
                      onClick={() => handleSelectBundle(bundle)}
                    />
                  )
              )}
            </div>
          </div>
          <div className="displayTablet">
            <FrequencySubTotal
              entreesQuantity={state.bundle?.entreesQuantity}
              breakfastsQuantity={state.bundle?.breakfastsQuantity}
              entreePrice={state.bundle?.price}
              breakfastPrice={state.bundle?.breakfast?.price}
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
            {selectedBundle.id && (
              <div className={`${styles.subRow} ${styles.subRowFourColumns}`}>
                {selectedBundle.breakfasts.map((breakfast, index) => (
                  <FrequencyBreakfast
                    key={index}
                    data={breakfast}
                    quantity={state.bundle?.breakfastsQuantity}
                    isSelected={breakfast.name === state.bundle.breakfast.name}
                    onClick={() => handleSelectBreakfast(breakfast)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="displayMobile">
          <FrequencySubTotal
            entreesQuantity={state.bundle?.entreesQuantity}
            breakfastsQuantity={state.bundle?.breakfastsQuantity}
            entreePrice={state.bundle?.price}
            breakfastPrice={state.bundle?.breakfast?.price}
          />
        </div>
      </div>
    </div>
  )
}

export default withActiveStep(Frequency, STEP_ID)
