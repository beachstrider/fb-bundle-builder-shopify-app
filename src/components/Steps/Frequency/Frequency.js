import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  setBundle,
  selectFaqType,
  displayHeader,
  displayFooter,
  setIsNextButtonActive,
  reset
} from '../../../store/slices/rootSlice'
import { FrequencyBreakfast, FrequencyEntree } from '.'
import { withActiveStep } from '../../Hooks'
import { clearLocalStorage } from '../../../store/store'
import { smoothScrollingToId } from '../../../utils'
import Loading from '../Components/Loading'
import TopTitle from '../Components/TopTitle'
import SubTotal from '../Components/SubTotal'
import styles from './Frequency.module.scss'

const FAQ_TYPE = 'frequency'
const STEP_ID = 1

const bundles = [
  {
    id: 1,
    name: '14 Meals',
    description: '7-Days All inclusive - (14 Meals + 7 Breakfasts)',
    price: 9.95,
    shippingPrice: 8.95,
    entreesQuantity: 14,
    breakfastsQuantity: 7,
    breakfasts: [
      {
        name: '7 Meals',
        price: 6.95,
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
    name: '10 Meals',
    description: '',
    price: 11.95,
    shippingPrice: 8.95,
    entreesQuantity: 10,
    breakfastsQuantity: 5,
    breakfasts: [
      {
        name: '5 Meals',
        price: 8.95,
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
    name: '6 Meals',
    description: '',
    price: 12.95,
    shippingPrice: 8.95,
    entreesQuantity: 6,
    breakfastsQuantity: 3,

    breakfasts: [
      {
        name: '3 Meals',
        price: 9.95,
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
  const history = useHistory()
  const state = useSelector((state) => state)
  const [selectedBundle, setSelectedBundle] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    initializeApp()
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setSelectedBundle(
        () => bundles.find((e) => e.id === state.bundle.id) || []
      )
    }
  }, [state.bundle.id])

  useEffect(() => {
    if (!isLoading) {
      smoothScrollingToId('breakfasts')
    }
  }, [isLoading])

  const clearState = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        clearLocalStorage()
        dispatch(reset())
        resolve('ok')
      }, 1000)
    })

  const initializeApp = async () => {
    setIsLoading(true)

    // if the customer is returning from Shopify login page
    if (state.returnToStep) {
      history.push(`/steps/${state.returnToStep}`)
      return
    }

    await clearState()
    setSelectedBundle(bundles[0])

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
      <TopTitle
        title="Select Meals Per Week"
        subTitle="Healthy, fresh and ready to eat in 2 minutes"
      />
      <div className={styles.mainWrapper}>
        <div>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.subRow3Columns}>
                  {bundles.map((bundle) => (
                    <FrequencyEntree
                      key={bundle.id}
                      data={bundle}
                      isSelected={bundle.id === state.bundle.id}
                      onClick={() => handleSelectBundle(bundle)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div id="breakfasts" />
          <div className={`${styles.wrapper} mt-8`}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.section}>
                  <div className={styles.subSection}>
                    <div className={styles.title}>Add Breakfast?</div>
                    <div className={styles.subTitle}>
                      Start your day off the right way
                    </div>
                  </div>
                  <div className="displayTablet">
                    <img
                      className={styles.image}
                      src={`${process.env.PROXY_APP_URL}/images/breakfast-sample.jpg`}
                      alt="Breakfast"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.column}>
                {selectedBundle.id && (
                  <div className={styles.subRow2Columns}>
                    {selectedBundle.breakfasts.map((breakfast, index) => (
                      <FrequencyBreakfast
                        key={index}
                        data={breakfast}
                        isSelected={
                          breakfast.name === state.bundle.breakfast.name
                        }
                        onClick={() => handleSelectBreakfast(breakfast)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="displayMobile mt-5">
              <div className="mt-10 px-4" style={{ width: '100%' }}>
                <SubTotal
                  entreesQuantity={state.bundle?.entreesQuantity}
                  breakfastsQuantity={state.bundle?.breakfastsQuantity}
                  entreePrice={state.bundle?.price}
                  breakfastPrice={state.bundle?.breakfast?.price}
                  shippingPrice={state.bundle?.shippingPrice}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={`displayTablet ${styles.subTotalWrapper}`}>
            <SubTotal
              entreesQuantity={state.bundle?.entreesQuantity}
              breakfastsQuantity={state.bundle?.breakfastsQuantity}
              entreePrice={state.bundle?.price}
              breakfastPrice={state.bundle?.breakfast?.price}
              shippingPrice={state.bundle?.shippingPrice}
              backgroundImage={`${process.env.PROXY_APP_URL}/images/frequency.jpg`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withActiveStep(Frequency, STEP_ID)
