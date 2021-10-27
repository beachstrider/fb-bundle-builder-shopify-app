import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './slices/rootSlice'

const store = configureStore({
  reducer
})

export default store
