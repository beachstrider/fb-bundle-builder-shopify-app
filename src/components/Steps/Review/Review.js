import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useShopifyCart } from '../../Hooks'

const Review = () => {
  const state = useSelector((state) => state)
  const shopifyCart = useShopifyCart()

  const getShopifyCartToken = async () => {
    return await shopifyCart.getToken()
  }

  const addShopifyCartItems = async () => {
    await shopifyCart.clearCart()

    // TODO: next task (QFBBA-101)
    // send these items to the API: state.cart

    // TODO: next task (QFBBA-102)
    // await shopifyCart.create({
    //   id: bundleId,
    //   quantity: 1,
    //   properties: {
    //     'Customer Id': shopCustomer?.id
    //   }
    // })
  }

  useEffect(() => {
    addShopifyCartItems()
  }, [state.cart])

  if (state.cart.length === 0) {
    return <Redirect push to="/steps/4" />
  }

  // TODO: example page
  return (
    <div className="defaultWrapper">
      <div>
        <div>
          <h1>Review</h1>
          <div>{JSON.stringify(state, null, 3)}</div>
        </div>
      </div>
    </div>
  )
}

export default Review
