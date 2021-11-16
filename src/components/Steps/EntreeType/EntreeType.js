import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectFaqType,
  displayHeader,
  displayFooter,
  setEntreeType,
  setEntreeSubType
} from '../../../store/slices/rootSlice'
import { smoothScrollingToId } from '../../../utils'
import { withActiveStep } from '../../Hooks'
import { CardEntreeType } from '../../Cards'
import styles from './EntreeType.module.scss'
import EntreeTypeSubType from './EntreeTypeSubType'

const FAQ_TYPE = 'entreeType'
const STEP_ID = 3

// TODO: double check from where this data is coming from
const entreeTypes = [
  {
    id: 1,
    title: 'Keto',
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

const entreeSubTypes = [
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
  },
  {
    id: 3,
    title: 'High Protein',
    netCarbs: '8-9g',
    protein: '20-30g',
    fat: '30-40g',
    calories: '600-800',
    isSelected: false
  }
]

const EntreeType = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  useEffect(() => {
    dispatch(displayHeader(true))

    if (state.entreeSubType && state.entreeSubType.id !== 0) {
      dispatch(selectFaqType(FAQ_TYPE))
      dispatch(displayFooter(true))
    } else {
      dispatch(selectFaqType(null))
      dispatch(displayFooter(false))
    }
  }, [])

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
                {entreeSubTypes.map((subType) => (
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
