import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFaqType,
  displayHeader,
  displayFooter,
  setEntreeType,
  setEntreeSubType,
  setTokens,
  setIsNextButtonActive,
  cartClear
} from '../../../store/slices/rootSlice'
import { CardEntreeType, CardSelectionMark } from '../../Cards'
import {
  mapBundleTypeSubtype,
  settings,
  smoothScrollingToId
} from '../../../utils'
import { getSelectedBundle, useGuestToken, withActiveStep } from '../../Hooks'
import styles from './EntreeType.module.scss'
import EntreeTypeSubType from './EntreeTypeSubType'
import { Redirect } from 'react-router'
import Toast from '../../Global/Toast'
import TopTitle from '../Components/TopTitle'
import Loading from '../Components/Loading'

const FAQ_TYPE = 'entreeType'
const skipStepMealPlan = settings().display().skipStepMealPlan
const STEP_ID = skipStepMealPlan ? 2 : 2

const EntreeType = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)
  const [isLoading, setIsLoading] = useState(false)
  const [bundleTypes, setBundleTypes] = useState([])
  const [error, setError] = useState({
    open: false,
    status: 'Success',
    message: ''
  })

  useEffect(() => {
    generateToken()
    dispatch(displayHeader(true))
    mapBundleTypes()

    if (state.entreeSubType && state.entreeSubType.id !== 0) {
      dispatch(selectFaqType(FAQ_TYPE))
      dispatch(displayFooter(true))
    } else {
      dispatch(selectFaqType(null))
    }
  }, [])

  useEffect(() => {
    if (state.entreeType.id !== 0 && state.entreeSubType.id !== 0) {
      dispatch(setIsNextButtonActive(true))
    } else {
      dispatch(setIsNextButtonActive(false))
    }
  }, [state.entreeType, state.entreeSubType])

  useEffect(() => {
    if (state.cart.length > 0) {
      dispatch(cartClear())
    }
  })

  const mapBundleTypes = () => {
    setIsLoading(true)

    const shopifyBundleProduct = getSelectedBundle(state.bundle.breakfast.tag)
    const mappedBundle = mapBundleTypeSubtype(shopifyBundleProduct)
    setBundleTypes(mappedBundle)
    setIsLoading(false)
  }

  const generateToken = async () => {
    const currentToken = await useGuestToken()
    if (currentToken) {
      dispatch(
        setTokens({
          ...state.tokens,
          guestToken: currentToken
        })
      )
    } else {
      setError({
        open: true,
        status: 'Danger',
        message: 'There was an error. Please try again'
      })
      dispatch(displayFooter(false))
    }
  }

  const selectEntreeType = (entree) => {
    handleEntreeTypeSelection(entree).then()
  }

  const handleEntreeTypeSelection = async (entree) => {
    // Added a promise here in order to scroll the page only when the dispatch is done
    const saveEntreeType = async (entree) =>
      new Promise((resolve) => {
        dispatch(setEntreeType(entree))
        dispatch(setEntreeSubType({ id: 0 }))
        dispatch(displayFooter(true))
        dispatch(selectFaqType(FAQ_TYPE))
        resolve()
      })

    await saveEntreeType(entree)
    smoothScrollingToId('entreeType')
  }

  if (state.bundle.id === 0) {
    return <Redirect push to="/" />
  }

  if (isLoading) {
    return <Loading />
  }
  const displayMealPlans = settings().display().chooseMealPlan
  const defaultType = settings().bundles().defaultType
  if (
    !displayMealPlans &&
    !!bundleTypes &&
    bundleTypes.length > 0 &&
    defaultType
  ) {
    const bundle = bundleTypes.filter((b) => b.name === defaultType)[0]
    if (state.entreeType.id !== bundle.id) {
      selectEntreeType(bundle)
    }
  }

  return (
    <div>
      <TopTitle
        title={settings().titles().step2}
        subTitle={settings().subtitles().step2}
      />
      <div className="defaultWrapper mb-10">
        <div className={styles.wrapper}>
          {displayMealPlans && (
            <div className={`${styles.entrees} mb-10`}>
              {bundleTypes.map((entree, index) => (
                <CardSelectionMark
                  key={index}
                  isSelected={state.entreeType.id === entree.id}
                  onClick={() => handleEntreeTypeSelection(entree)}
                >
                  <CardEntreeType
                    title={entree.name}
                    image={entree.featuredImage}
                    metafields={entree.options[0]?.metafields}
                    option1={entree.option1}
                  />
                </CardSelectionMark>
              ))}
            </div>
          )}
          <div id="entreeType">
            {state.entreeType.id !== 0 && (
              <>
                {displayMealPlans && (
                  <div className={`${styles.title} mb-7`}>
                    Choose Your Portion Size
                  </div>
                )}
                <div
                  className={`${
                    state.entreeType.options.length === 2
                      ? styles.subTypesWrapper_2_Columns
                      : styles.subTypesWrapper_3_Columns
                  } mb-10`}
                >
                  {state.entreeType?.options.map((subType, index) => {
                    const entryTypeCondition =
                      settings().bundlePricesPerPortion(
                        state.entreeType.name,
                        subType.name
                      )
                    return (
                      <EntreeTypeSubType
                        key={index}
                        title={subType.name}
                        metafields={subType.metafields}
                        isSelected={subType.id === state.entreeSubType.id}
                        onClick={() => dispatch(setEntreeSubType(subType))}
                        extraPricePerMeal={entryTypeCondition?.price}
                      />
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        {error.open ? (
          <Toast
            open={error.open}
            status={error.status}
            message={error.message}
            displayTitle={false}
            handleClose={() => {
              setError({
                open: false,
                status: 'Success',
                message: ''
              })
            }}
          />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

export default withActiveStep(EntreeType, STEP_ID)
