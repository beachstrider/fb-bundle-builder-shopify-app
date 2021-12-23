import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFaqType,
  displayHeader,
  displayFooter,
  setEntreeType,
  setEntreeSubType,
  setTokens,
  setIsNextButtonActive
} from '../../../store/slices/rootSlice'
import { smoothScrollingToId } from '../../../utils'
import { useGuestToken, withActiveStep } from '../../Hooks'
import { CardEntreeType } from '../../Cards'
import styles from './EntreeType.module.scss'
import EntreeTypeSubType from './EntreeTypeSubType'
import { Redirect } from 'react-router'

const FAQ_TYPE = 'entreeType'
const STEP_ID = 3

// TODO: double check from where this data is coming from
const entreeTypes = [
  {
    id: 1,
    title: 'Keto',
    subType: 'keto',
    primaryColor: '#ec6120',
    options: [
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet'
    ],
    image:
      'https://cdn.shopify.com/s/files/1/0596/3694/0985/files/keto-meal-001.png?v=1629490017'
  },
  {
    id: 2,
    title: 'LowCal',
    subType: 'lowCal',
    primaryColor: '#3DAE2B',
    options: [
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet',
      'Lorem ipsum dolor sit amet'
    ],
    image:
      'https://cdn.shopify.com/s/files/1/0596/3694/0985/files/Chile-Con-Carne_Keto_C.jpg?v=1629490020'
  }
]

const subTypes = {
  lowCal: [
    {
      id: 1,
      title: 'Regular',
      netCarbs: '8-9g',
      protein: '20-30g',
      fat: '30-40g',
      calories: '600-800',
      isSelected: true
    },
    {
      id: 2,
      title: 'Lite',
      netCarbs: '8-9g',
      protein: '20-30g',
      fat: '30-40g',
      calories: '600-800',
      isSelected: false
    },
    {
      id: 3,
      title: 'Savory',
      netCarbs: '8-9g',
      protein: '20-30g',
      fat: '30-40g',
      calories: '600-800',
      isSelected: false
    }
  ],
  keto: [
    {
      id: 1,
      title: 'Regular',
      netCarbs: '8-9g',
      protein: '20-30g',
      fat: '30-40g',
      calories: '600-800',
      isSelected: true
    },
    {
      id: 2,
      title: 'High Protein',
      netCarbs: '8-9g',
      protein: '20-30g',
      fat: '30-40g',
      calories: '600-800',
      isSelected: false
    }
  ]
}

const EntreeType = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  useEffect(() => {
    generateToken()
    dispatch(displayHeader(true))

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

  const generateToken = async () => {
    const currentToken = await useGuestToken()
    if (currentToken) {
      dispatch(
        setTokens({
          ...state.tokens,
          guestToken: currentToken
        })
      )
    }
  }

  const handleEntreeTypeSelection = async (entree) => {
    // Added a promise here in order to scroll the page only when the dispatch is done
    const saveEntreeType = async () =>
      new Promise((resolve) => {
        dispatch(setEntreeType(entree))
        dispatch(displayFooter(true))
        dispatch(selectFaqType(FAQ_TYPE))
        resolve()
      })

    await saveEntreeType()
    smoothScrollingToId('entreeType')
  }

  if (!state.location.zipCode) {
    return <Redirect push to="/steps/2" />
  }

  return (
    <div className="defaultWrapper">
      <div className={styles.wrapper}>
        <div className={`${styles.title} mb-7`}>Choose Entree Type</div>
        <div className={`${styles.entrees} mb-10`}>
          {entreeTypes.map((entree) => (
            <CardEntreeType
              key={entree.id}
              title={entree.title}
              image={entree.image}
              options={entree.options}
              primaryColor={entree.primaryColor}
              isSelected={state.entreeType.id === entree.id}
              onClick={() => handleEntreeTypeSelection(entree)}
            />
          ))}
        </div>
        <div id="entreeType">
          {state.entreeType.id !== 0 && (
            <>
              <div className={`${styles.title} mb-7`}>Choose Entree Type</div>
              <div className={`${styles.subTypesWrapper} mb-10`}>
                {subTypes[state.entreeType.subType].map((subType) => (
                  <EntreeTypeSubType
                    data={subType}
                    isSelected={subType.id === state.entreeSubType.id}
                    key={subType.id}
                    onClick={() => dispatch(setEntreeSubType(subType))}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default withActiveStep(EntreeType, STEP_ID)
