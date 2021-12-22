import { createSlice } from '@reduxjs/toolkit'
import { zone1, zone2 } from '../data/zipcodes'

const rootSlice = createSlice({
  name: 'root',
  initialState: {
    displayHeader: false,
    displayFooter: false,
    isNextButtonActive: true,
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
        description: 'Next',
        path: '/steps/5',
        isActive: false
      }
    ],
    deliveryZones: [
      {
        id: 1,
        name: 'Zone 1',
        earliestAvailableDay: 2,
        leadTime: 5,
        zipCodes: zone1,
        deliveryDates: [
          {
            id: 0,
            day: 2,
            disabled: true,
            isSelected: false
          },
          {
            id: 1,
            day: 3,
            disabled: false,
            isSelected: false
          },
          {
            id: 2,
            day: 4,
            disabled: false,
            isSelected: false
          },
          {
            id: 3,
            day: 5,
            disabled: false,
            isSelected: false
          }
        ]
      },
      {
        id: 2,
        name: 'Zone 2',
        earliestAvailableDay: 3,
        leadTime: 6,
        zipCodes: zone2,
        deliveryDates: [
          {
            id: 0,
            day: 2,
            disabled: true,
            isSelected: false
          },
          {
            id: 1,
            day: 3,
            disabled: false,
            isSelected: false
          },
          {
            id: 2,
            day: 4,
            disabled: false,
            isSelected: false
          },
          {
            id: 3,
            day: 5,
            disabled: false,
            isSelected: false
          }
        ]
      }
    ],
    bundle: {
      id: 0,
      price: 0,
      weeklyPrice: '',
      breakfast: {
        id: 0,
        tag: ''
      }
    },
    entreeType: { id: 0 },
    entreeSubType: { id: 0 },
    faqType: null,
    cart: [],
    email: '',
    location: {
      zipCode: '',
      deliveryDate: {
        id: 0
      }
    },
    tokens: {
      guestToken: '',
      userToken: ''
    },
    triggerLastStep: false
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
    },
    setIsNextButtonActive: (state, action) => {
      state.isNextButtonActive = action.payload
    },
    cartClear: (state) => {
      state.cart = []
    },
    cartUpdate: (state, action) => {
      state.cart = action.payload
    },
    cartAddItem: (state, action) => {
      const existingItem = state.cart.find(
        (i) => Number(i.id) === Number(action.payload.id)
      )

      if (!existingItem) {
        state.cart = [
          ...state.cart,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      } else {
        existingItem.quantity += 1
      }
    },
    cartRemoveItem: (state, action) => {
      const existingItem = state.cart.find(
        (i) => Number(i.id) === Number(action.payload.id)
      )

      if (existingItem) {
        existingItem.quantity -= 1
      }

      if (existingItem.quantity === 0) {
        const newCart = state.cart.filter((i) => i.id !== existingItem.id)
        state.cart = newCart
      }
    },
    triggerLastStep: (state, action) => {
      state.triggerLastStep = action.payload
    }
  }
})

export const reducer = rootSlice.reducer

export const {
  displayFooter,
  displayHeader,
  cartAddItem,
  cartRemoveItem,
  cartClear,
  cartUpdate,
  selectFaqType,
  setActiveStep,
  setEmail,
  setBundle,
  setEntreeType,
  setEntreeSubType,
  setLocation,
  setTokens,
  setIsNextButtonActive,
  triggerLastStep
} = rootSlice.actions
