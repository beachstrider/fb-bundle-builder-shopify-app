import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import {
  setActiveStep,
  setVisitedStep,
  MEAL_PLANS_ITEM
} from '../../store/slices/rootSlice'
import styles from './Header.module.scss'

const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const steps = useSelector((state) => state.steps)

  const handleGoToStep = ({ id, path }) => {
    dispatch(setActiveStep(id))
    dispatch(setVisitedStep(id))

    history.push(path)
  }

  const getClassnameByStatusStep = ({ isVisited, isActive }) => {
    return isActive ? styles.isSelected : isVisited ? styles.isVisited : ''
  }

  const getClassnameDescription = ({ id, isVisited, isActive }) => {
    const breakLineMealPlans = id === MEAL_PLANS_ITEM && styles.breakWord
    const setDisabledItemMenu = !isVisited && !isActive && styles.isNotVisited

    return `${styles.description} ${breakLineMealPlans} ${setDisabledItemMenu}`
  }

  return (
    <div className={`${styles.wrapper} defaultWrapper flexColumnDirection`}>
      <div className={styles.stepsWrapper}>
        {steps.map((step) => (
          <div className={styles.column} key={step.id}>
            <div className={getClassnameByStatusStep(step)}>
              <div
                className={getClassnameDescription(step)}
                onClick={() => {
                  step.isVisited && handleGoToStep(step)
                }}
              >
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
