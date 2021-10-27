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
        path: '/step-2',
        isActive: false
      },
      {
        id: 3,
        name: 'Step 3',
        description: 'Entree Type',
        path: '/step-3',
        isActive: false
      },
      {
        id: 4,
        name: 'Step 4',
        description: 'Entrees',
        path: '/step-4',
        isActive: false
      },
      {
        id: 5,
        name: 'Step 5',
        description: 'Review',
        path: '/step-5',
        isActive: false
      }
    ],
    entrees: 10,
    breakfast: 3
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
    chooseEntrees: (state, action) => {
      state.entrees = action.payload
    },
    chooseBreakfast: (state, action) => {
      state.breakfast = action.payload
    }
  }
})

export const reducer = rootSlice.reducer

export const { chooseEntrees, chooseBreakfast, setActiveStep } =
  rootSlice.actions
