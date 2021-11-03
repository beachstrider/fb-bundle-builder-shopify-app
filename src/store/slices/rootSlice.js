import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    steps: [
      {
        id: 1,
        name: 'Step 1',
        description: 'Frequency',
        path: '/',
        isActive: true
      },
      {
        id: 2,
        name: 'Step 2',
        description: 'Location',
        path: '/steps/2',
        isActive: false
      },
      {
        id: 3,
        name: 'Step 3',
        description: 'Entree Type',
        path: '/steps/3',
        isActive: false
      },
      {
        id: 4,
        name: 'Step 4',
        description: 'Entrees',
        path: '/steps/4',
        isActive: false
      },
      {
        id: 5,
        name: 'Step 5',
        description: 'Review',
        path: '/steps/5',
        isActive: false
      }
    ],
    entree: {
      id: 0,
      price: 0
    },
    breakfast: {
      id: 0,
      price: 0
    },
    faqType: null
  },
  reducers: {
    setActiveStep: (state, action) => {
      const currentStepId = action.payload
      const currentSteps = state.steps.map((step) =>
        step.id === Number(currentStepId)
          ? { ...step, isActive: true }
          : { ...step, isActive: false }
      )
      state.steps = currentSteps
    },
    chooseEntree: (state, action) => {
      state.entree = action.payload
    },
    chooseBreakfast: (state, action) => {
      state.breakfast = action.payload
    },
    selectFaqType: (state, action) => {
      state.faqType = action.payload
    }
  }
})

export const reducer = rootSlice.reducer

export const { chooseEntree, chooseBreakfast, selectFaqType, setActiveStep } =
  rootSlice.actions
