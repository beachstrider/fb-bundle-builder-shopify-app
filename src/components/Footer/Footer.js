import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, triggerLastStep } from '../../store/slices/rootSlice'
import SpinnerIcon from '../Global/SpinnerIcon'
import styles from './Footer.module.scss'

const Footer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const state = useSelector((state) => state)
  const [currentStep, setCurrentStep] = useState({ id: 0 })
  const [nextStep, setNextStep] = useState({ path: '', description: '' })
  const [previousStep, setPreviousStep] = useState({ path: '' })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (currentStep.id !== state.steps[state.steps.length - 1].id) {
      dispatch(triggerLastStep(false))
    }
  }, [])

  useEffect(() => {
    const step = state.steps.find((step) => step.isActive)
    setCurrentStep(step)

    if (step) {
      const followingStep = state.steps.find((item) => item.id === step.id + 1)
      const priorStep = state.steps.find((item) => item.id === step.id - 1)

      if (followingStep) {
        setNextStep(followingStep)
      }
      if (priorStep) {
        setPreviousStep(priorStep)
      }
    }
  }, [state.steps])

  const handleBackButtonClick = (useBrowserHistory = false) => {
    if (useBrowserHistory) {
      return history.goBack()
    }

    dispatch(setActiveStep(currentStep.id - 1))
    if (nextStep) {
      history.push(previousStep.path)
    }
  }

  const handleNextButtonClick = () => {
    dispatch(setActiveStep(currentStep.id + 1))
    if (nextStep) {
      history.push(nextStep.path)
    }
  }

  const handleLastStep = () => {
    dispatch(triggerLastStep(true))
    setIsLoading(true)
  }

  return (
    <div className={`${styles.wrapper} defaultWrapper`}>
      <div className="buttons">
        <div
          className="button lightButton"
          onClick={() =>
            handleBackButtonClick(currentStep.id === state.steps[0].id)
          }
        >
          Back
        </div>

        <div
          className={`button ${
            state.isNextButtonActive ? 'primaryButton' : 'disabledButton'
          }`}
          onClick={() => {
            if (currentStep.id === state.steps[state.steps.length - 1].id) {
              return handleLastStep()
            }
            return state.isNextButtonActive && handleNextButtonClick()
          }}
        >
          {isLoading ? <SpinnerIcon /> : nextStep.description}
        </div>
      </div>
    </div>
  )
}

export default Footer
