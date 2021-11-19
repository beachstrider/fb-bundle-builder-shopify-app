import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './slices/rootSlice'

const localStorageKey = process.env.LOCAL_STORAGE_KEY || 'bundleData'

const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem(localStorageKey, JSON.stringify(state))
  } catch (e) {
    // TODO: track error somewhere
    return null
  }
}

const loadFromLocalStorage = () => {
  try {
    const stateStr = localStorage.getItem(localStorageKey)
    return stateStr ? JSON.parse(stateStr) : undefined
  } catch (e) {
    // TODO: track error somewhere
    return null
  }
}

const preloadedState = loadFromLocalStorage()
const store = configureStore({ reducer, preloadedState })

store.subscribe(() => {
  saveToLocalStorage(store.getState())
})

export default store
