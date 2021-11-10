import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep } from '../../store/slices/rootSlice'

const withActiveStep = (WrappedComponent, stepId) => {
  const VerifyCurrentStep = (props) => {
    const dispatch = useDispatch()
    const state = useSelector((state) => state)

    const currentStep = state.steps.find((step) => step.id === stepId)
    if (!currentStep.isActive) {
      dispatch(setActiveStep(stepId))
    }

    return <WrappedComponent {...props} />
  }

  return VerifyCurrentStep
}

export default withActiveStep
