import { initialState } from '../../../src/store/slices/rootSlice'
import cart from '../../../src/utils/cart'

describe('Test cart utility functions', () => {
  const currentCart = cart(initialState)

  it('Prepares meal to be added to the cart', () => {
    const item = {
      available: true,
      barcode: '',
      bundleContentId: 818,
      compare_at_price: null,
      configurationBundleId: 164,
      configurationContentId: 3535,
      description: '<p></p>',
      featured_image: null,
      id: 40171859542069,
      images: [
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339'
      ],
      inventory_management: 'shopify',
      name: 'Asian Slaw Salad ',
      option1: 'LowCal',
      option2: 'Regular',
      option3: null,
      options: ['LowCal', 'Regular'],
      price: 3400,
      productPlatformId: 6715009105973,
      public_title: 'LowCal / Regular',
      quantity: 0,
      requires_selling_plan: false,
      requires_shipping: true,
      selling_plan_allocations: [],
      sku: '',
      taxable: true,
      title: 'LowCal / Regular',
      type: 'Meals',
      weight: 0
    }
    const quantitiesCountdown = [
      { id: 818, quantity: 2 },
      { id: 819, quantity: 1 }
    ]
    const addedItem = currentCart.addItem(item, 818, quantitiesCountdown)

    expect(addedItem.item).toEqual(item)
    expect(addedItem.countdown[0].quantity).toBe(1)
  })

  it('Prepares meal to be removed from the cart', () => {
    const item = {
      available: true,
      barcode: '',
      bundleContentId: 818,
      compare_at_price: null,
      configurationBundleId: 164,
      configurationContentId: 3535,
      description: '<p></p>',
      featured_image: null,
      id: 40171859542069,
      images: [
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339'
      ],
      inventory_management: 'shopify',
      name: 'Asian Slaw Salad ',
      option1: 'LowCal',
      option2: 'Regular',
      option3: null,
      options: ['LowCal', 'Regular'],
      price: 3400,
      productPlatformId: 6715009105973,
      public_title: 'LowCal / Regular',
      quantity: 0,
      requires_selling_plan: false,
      requires_shipping: true,
      selling_plan_allocations: [],
      sku: '',
      taxable: true,
      title: 'LowCal / Regular',
      type: 'Meals',
      weight: 0
    }
    const quantitiesCountdown = [
      { id: 818, quantity: 2 },
      { id: 819, quantity: 1 }
    ]
    const removedItem = currentCart.removeItem(item, 818, quantitiesCountdown)

    expect(removedItem.item).toEqual(item)
    expect(removedItem.countdown[0].quantity).toBe(3)
  })
})
