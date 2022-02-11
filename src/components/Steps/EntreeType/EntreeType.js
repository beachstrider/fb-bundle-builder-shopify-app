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
import { mapBundleTypeSubtype, smoothScrollingToId } from '../../../utils'
import { getSelectedBundle, useGuestToken, withActiveStep } from '../../Hooks'
import styles from './EntreeType.module.scss'
import EntreeTypeSubType from './EntreeTypeSubType'
import { Redirect } from 'react-router'
import Toast from '../../Global/Toast'
import TopTitle from '../Components/TopTitle'

const FAQ_TYPE = 'entreeType'
const STEP_ID = 3

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

    console.log('mappedBundle >>', mappedBundle)
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

  const handleEntreeTypeSelection = async (entree) => {
    // Added a promise here in order to scroll the page only when the dispatch is done
    const saveEntreeType = async (entree) =>
      new Promise((resolve) => {
        dispatch(setEntreeType(entree))
        dispatch(displayFooter(true))
        dispatch(selectFaqType(FAQ_TYPE))
        resolve()
      })

    await saveEntreeType(entree)
    smoothScrollingToId('entreeType')
  }

  if (!state.location.zipCode) {
    return <Redirect push to="/steps/2" />
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <div className={`${styles.title} mb-7`}>Choose Meal Type</div>
        <div className={`${styles.entrees} mb-10`}>
          {bundleTypes.map((entree, index) => (
            <CardEntreeType
              key={index}
              title={entree.name}
              image={entree.featuredImage}
              metafields={entree.options[0]?.metafields}
              primaryColor={'#3DAE2B'}
              isSelected={state.entreeType.id === entree.id}
              onClick={() => handleEntreeTypeSelection(entree)}
            />
          ))}
        </div>
        <div id="entreeType">
          {state.entreeType.id !== 0 && (
            <>
              <div className={`${styles.title} mb-7`}>Choose Meal Sub Type</div>
              <div
                className={`${
                  state.entreeType.id === 1
                    ? styles.subTypesWrapper_2_Columns
                    : styles.subTypesWrapper_3_Columns
                } mb-10`}
              >
                {state.entreeType.options.map((subType) => (
                  <EntreeTypeSubType
                    key={subType.id}
                    title={subType.name}
                    metafields={subType.metafields}
                    isSelected={subType.id === state.entreeSubType.id}
                    onClick={() => dispatch(setEntreeSubType(subType))}
                  />
                ))}
              </div>
            </>
          )}
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
  )
}

export default withActiveStep(EntreeType, STEP_ID)
