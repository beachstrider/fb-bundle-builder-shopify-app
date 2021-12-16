const findZipCode = (zones, zipCode) => {
  let result = null
  zones.forEach((zone) => {
    const found = zone.zipCodes.find((e) => Number(e) === Number(zipCode))
    if (found) {
      result = zone
    }
  })

  return result
}

export { findZipCode }
