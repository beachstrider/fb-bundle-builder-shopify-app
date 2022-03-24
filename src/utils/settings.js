import { DEFAULT_SETTINGS_KEY } from '../constants/defaults'
import storeSettings from '../store/settings/settings'

const settings = () => {
  const settingsKey = process.env.STORE_SETTINGS_KEY || DEFAULT_SETTINGS_KEY
  const values = () => storeSettings[settingsKey]
  const bundles = () => values().bundles
  const bundleOptions = () => bundles().options
  const bundleImages = () => bundles().images
  const icons = () => bundles().icons
  const labels = () => values().labels
  const display = () => values().settings.display
  const bundlePricesPerPortion = (entreeType, entreeSubType) =>
    entreeType
      ? bundles().pricesPerPortion.find(
          (t) =>
            t.type === entreeType.toLowerCase() &&
            t.subType === entreeSubType.toLowerCase()
        )
      : bundles().pricesPerPortion

  return {
    bundleOptions,
    bundleImages,
    bundles,
    values,
    icons,
    labels,
    display,
    bundlePricesPerPortion
  }
}

export default settings
