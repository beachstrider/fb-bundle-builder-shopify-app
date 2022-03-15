import { DEFAULT_SETTINGS_KEY } from '../constants/defaults'
import storeSettings from '../store/settings/settings'

const settings = () => {
  const settingsKey = process.env.STORE_SETTINGS_KEY || DEFAULT_SETTINGS_KEY
  const values = () => storeSettings[settingsKey]
  const bundles = () => values().bundles
  const bundleOptions = () => bundles().options
  const bundleImages = () => bundles().images
  const icons = () => bundles().icons

  return { bundleOptions, bundleImages, bundles, values, icons }
}

export default settings
