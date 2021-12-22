const getSelectedBundle = (tag) => {
  try {
    let currentBundle = {}
    shopBundles.forEach((bundle) => {
      const findTag = bundle.tags.find((t) => t.toLowerCase() === tag.toLowerCase())
      if (findTag) {
        currentBundle = bundle
      }
    })
    return currentBundle
  } catch {
    return {}
  }
}

export default getSelectedBundle
