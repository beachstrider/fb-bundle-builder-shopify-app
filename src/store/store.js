import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './slices/rootSlice'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(process.env.LOCAL_STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    // TODO: track error somewhere
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem(process.env.LOCAL_STORAGE_KEY)
    return stateStr ? JSON.parse(stateStr) : undefined
  } catch (e) {
    // TODO: track error somewhere
    return undefined
  }
}

const preloadedState = loadFromLocalStorage()
const store = configureStore({ reducer, preloadedState })

store.subscribe(() => {
  saveToLocalStorage(store.getState())
})

export default store
