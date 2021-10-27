import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep } from '../../store/slices/rootSlice'
import styles from './Footer.module.scss'

const Footer = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const steps = useSelector((state) => state.steps)
  const [currentStep, setCurrentStep] = useState({})
  const [nextStep, setNextStep] = useState({})
  const [previousStep, setPreviousStep] = useState({})

  useEffect(() => {
    const step = steps.find((step) => step.isActive)
    setCurrentStep(step)

    if (step) {
      const followingStep = steps.find((item) => item.id === step.id + 1)
      const priorStep = steps.find((item) => item.id === step.id - 1)

      if (followingStep) {
        setNextStep(followingStep)
      }
      if (priorStep) {
        setPreviousStep(priorStep)
      }
    }
  }, [steps])

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
    <div className={`${styles.wrapper} defaultWrapper`}>
      <div className="buttons">
        {currentStep.id !== steps[0].id && (
          <div className="button lightButton" onClick={handleBackButtonClick}>
            Back
          </div>
        )}
        {currentStep.id !== steps[steps.length - 1].id && (
          <div className="button primaryButton" onClick={handleNextButtonClick}>
            {nextStep.description}
          </div>
        )}
      </div>
    </div>
  )
}

export default Footer
