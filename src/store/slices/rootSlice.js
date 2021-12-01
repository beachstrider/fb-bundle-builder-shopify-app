import { createSlice } from '@reduxjs/toolkit'

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    displayHeader: false,
    displayFooter: false,
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
    bundle: {
      id: 0,
      price: 0,
      breakfast: {
        id: 0
      }
    },
    entreeType: { id: 0 },
    entreeSubType: { id: 0 },
    faqType: null,
    email: '',
    location: {
      zipCode: '',
      deliveryDate: ''
    },
    tokens: {
      guestToken: '',
      userToken: ''
    }
  },
  reducers: {
    displayHeader: (state, action) => {
      state.displayHeader = action.payload
    },
    displayFooter: (state, action) => {
      state.displayFooter = action.payload
    },
    setActiveStep: (state, action) => {
      const currentStepId = action.payload
      const currentSteps = state.steps.map((step) =>
        step.id === Number(currentStepId)
          ? { ...step, isActive: true }
          : { ...step, isActive: false }
      )
      state.steps = currentSteps
    },
    setBundle: (state, action) => {
      state.bundle = action.payload
    },
    selectFaqType: (state, action) => {
      state.faqType = action.payload
    },
    setZipCode: (state, action) => {
      state.zipCode = action.payload
    },
    setEmail: (state, action) => {
      state.email = action.payload
    },
    setEntreeType: (state, action) => {
      state.entreeType = action.payload
    },
    setEntreeSubType: (state, action) => {
      state.entreeSubType = action.payload
    },
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setTokens: (state, action) => {
      state.tokens = action.payload
    }
  }
})

export const reducer = rootSlice.reducer

export const {
  displayFooter,
  displayHeader,
  selectFaqType,
  setActiveStep,
  setEmail,
  setBundle,
  setEntreeType,
  setEntreeSubType,
  setLocation,
  setTokens
} = rootSlice.actions
