const mapBundleTypeSubtype = (bundle) => {
  if (!bundle.variants) {
    throw new Error('Cannot find any variants to map')
  }

  const createType = (id, name, image, options) => {
    return {
      id,
      name: name.toLowerCase(),
      featuredImage: image,
      options
    }
  }

  const createSubtype = (id, name, metafields) => {
    return {
      id,
      name,
      metafields
    }
  }

  const formattedValues = []

  let currentVariantId = 0
  let currentOptionId = 0
  bundle.variants.forEach((variant) => {
    variant.options.forEach((option) => {
      const parentValue = formattedValues.find(
        (parent) => parent.name === variant.option1.toLowerCase()
      )

      if (!parentValue) {
        currentVariantId++
        formattedValues.push(
          createType(
            currentVariantId,
            option.toLowerCase(),
            variant.featured_image?.src,
            []
          )
        )
      } else {
        if (option.toLowerCase() !== variant.option1.toLowerCase()) {
          currentOptionId++

          parentValue.options.push(
            createSubtype(currentOptionId, option.toLowerCase(), [
              ...variant.metafields,
              ...bundle.metafields
            ])
          )
        }
      }
    })
  })

  return formattedValues
}

const getBundleMetafield = (metafields, key) =>
  metafields.find((m) => m.key === key)

export { mapBundleTypeSubtype, getBundleMetafield }
