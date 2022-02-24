import { mapBundleItems, mapBundleItemsByOption } from '../../utils'

const mapItems = async (
  shopifyProducts,
  bundles,
  subscription,
  configuration
) => {
  return await new Promise((resolve) => {
    const result = mapBundleItems(
      shopifyProducts,
      bundles,
      subscription,
      configuration
    )
    resolve(result)
  })
}

const mapItemsByOption = async (
  shopifyProducts,
  type,
  subType,
  configuration
) => {
  return await new Promise((resolve) => {
    const result = mapBundleItemsByOption(
      shopifyProducts,
      type,
      subType,
      configuration
    )
    resolve(result)
  })
}

export { mapItems, mapItemsByOption }
