const filterShopifyProducts = async (items, shopifyProducts) =>
  new Promise((resolve) => {
    const apiProductIds = items.map((i) => Number(i.platform_product_id))

    const filteredProducts = shopifyProducts.filter((p) =>
      apiProductIds.includes(p.id)
    )

    const mappedProducts = filteredProducts.map((product) => ({
      ...product,
      bundle_configuration_content_id: items.find(
        (i) => Number(i.platform_product_id) === Number(product.id)
      ).bundle_configuration_contents_id
    }))

    resolve(mappedProducts)
  })

const filterShopifyVariants = async (state, shopifyProducts, configuration) =>
  new Promise((resolve) => {
    const filteredVariants = []

    for (const product of shopifyProducts) {
      const filtered = product.variants.filter(
        (variant) =>
          variant.options.includes(state.entreeType.title) &&
          variant.options.includes(state.entreeSubType.title)
      )

      filtered.map((f) => {
        f.images = product.images
        f.configurationBundleId = configuration.bundleId
        f.configurationContentId = product.bundle_configuration_content_id
        f.bundleContentId = configuration.id
        f.quantity = 0
        f.type = configuration.title

        if (f.name.includes('-')) {
          f.name = f.name.split('-')[0]
        }

        return f
      })

      if (filtered.length > 0) {
        filteredVariants.push(...filtered)
      }
    }

    resolve(filteredVariants)
  })

export { filterShopifyProducts, filterShopifyVariants }
