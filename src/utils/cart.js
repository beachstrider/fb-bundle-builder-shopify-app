import { ENTREE_TYPES_CONDITIONS } from '../constants/bundles'

const cart = (state) => {
  const isItemSelected = (cart, item) => {
    return !!cart.find((c) => c.id === item.id)
  }

  const getItemQuantity = (cart, item) => {
    const currentItem = cart.find((i) => Number(i.id) === Number(item.id))

    return currentItem?.quantity || 0
  }

  const getQuantityCountdownIndex = (quantitiesCountdown, id) => {
    return quantitiesCountdown.findIndex((q) => q.id === id)
  }

  const getQuantityCountdown = (quantitiesCountdown, id) => {
    return (
      quantitiesCountdown.find((q) => q.id === id) || { id: 0, quantity: 0 }
    )
  }

  const sumQuantity = (state, id) => {
    let total = 0
    const filteredValues = state.cart.filter((e) => e.bundleContentId === id)
    total = filteredValues
      .map((value) => value.quantity)
      .reduce((sum, number) => sum + number, 0)
    return total
  }

  const addItem = (item, bundleContentId, quantitiesCountdown) => {
    const countdown = getQuantityCountdown(quantitiesCountdown, bundleContentId)
    if (countdown?.quantity === 0) {
      return null
    }

    const countdownIndex = getQuantityCountdownIndex(
      quantitiesCountdown,
      bundleContentId
    )
    if (countdownIndex === -1) {
      return null
    }

    const newItemsCountdown = [...quantitiesCountdown]
    newItemsCountdown[countdownIndex] = {
      ...newItemsCountdown[countdownIndex],
      quantity: countdown.quantity - 1,
      quantitySummary: countdown.quantitySummary + 1
    }

    return {
      countdown: [...newItemsCountdown],
      item: item
    }
  }

  const removeItem = (item, bundleContentId, quantitiesCountdown) => {
    const countdown = getQuantityCountdown(quantitiesCountdown, bundleContentId)

    const countdownIndex = getQuantityCountdownIndex(
      quantitiesCountdown,
      bundleContentId
    )
    if (countdownIndex === -1) {
      return null
    }

    const newItemsCountdown = [...quantitiesCountdown]
    newItemsCountdown[countdownIndex] = {
      ...newItemsCountdown[countdownIndex],
      quantity: countdown.quantity + 1,
      quantitySummary: countdown.quantitySummary - 1
    }

    return {
      countdown: [...newItemsCountdown],
      item: item
    }
  }

  const calculateSubTotal = (
    entreePrice,
    breakfastPrice,
    entreesQuantity,
    breakfastsQuantity
  ) => {
    const entreesTotal = Number.parseFloat(entreePrice * entreesQuantity)
    const breakfastsTotal = isNaN(breakfastPrice)
      ? breakfastPrice
      : Number.parseFloat(breakfastPrice) * breakfastsQuantity

    return isNaN(breakfastsTotal)
      ? entreesTotal
      : entreesTotal + breakfastsTotal
  }

  const mapByTypes = () => {
    const result = {
      types: {},
      totals: {},
      labels: {}
    }

    state.cart.forEach((item) => {
      const keyName = item.type.split(' ').join().toLowerCase()
      if (!Object.keys(result.types).includes(keyName)) {
        result.types[keyName] = []
        result.totals[keyName] = 0
        result.labels[keyName] = ''
      }

      result.types[keyName] = result.types[keyName].concat([{ ...item }])
      result.totals[keyName] += item.quantity

      if (!result.labels[keyName]) {
        result.labels[keyName] = item.type
      }
    })

    return result
  }

  const getExtraSubTypePrice = (entreeType, entreeSubType) => {
    let extraSubTypePrice = 0
    let extraPricePerMeal = 0

    const entreeTypeName = entreeType?.name
    const entreeSubTypeName = entreeSubType?.name

    if (entreeTypeName && entreeSubTypeName) {
      ENTREE_TYPES_CONDITIONS.forEach(({ type, subType, price }) => {
        if (
          entreeTypeName.toLowerCase() === type.toLowerCase() &&
          entreeSubTypeName.toLowerCase() === subType.toLowerCase()
        ) {
          extraSubTypePrice = price * state.bundle?.entreesQuantity
          extraPricePerMeal = price
        }
      })
    }

    return { extraPricePerMeal, extraSubTypePrice }
  }

  return {
    addItem,
    calculateSubTotal,
    getItemQuantity,
    getQuantityCountdown,
    isItemSelected,
    removeItem,
    sumQuantity,
    mapByTypes,
    getExtraSubTypePrice
  }
}

export default cart
