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
      quantity: countdown.quantity - 1
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
      quantity: countdown.quantity + 1
    }

    return {
      countdown: [...newItemsCountdown],
      item: item
    }
  }

  return {
    getItemQuantity,
    isItemSelected,
    addItem,
    removeItem,
    getQuantityCountdown,
    sumQuantity
  }
}

export default cart
