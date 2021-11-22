import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep } from '../../store/slices/rootSlice'
import styles from './Footer.module.scss'

const Footer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const state = useSelector((state) => state)
  const [currentStep, setCurrentStep] = useState({ id: 0 })
  const [nextStep, setNextStep] = useState({ path: '', description: '' })
  const [previousStep, setPreviousStep] = useState({ path: '' })

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

  const handleBackButtonClick = () => {
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

  return (
    <div className={`${styles.wrapper} defaultWrapper mt-10`}>
      <div className="buttons">
        {currentStep.id !== state.steps[0].id && (
          <div className="button lightButton" onClick={handleBackButtonClick}>
            Back
          </div>
        )}
        {currentStep.id !== state.steps[state.steps.length - 1].id && (
          <div
            className={`button ${
              Object.keys(previousStep).length === 0
                ? 'primaryButton'
                : 'secondaryButton'
            }`}
            onClick={handleNextButtonClick}
          >
            {nextStep.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer
