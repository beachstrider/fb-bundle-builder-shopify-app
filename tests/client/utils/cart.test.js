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

  it('Maps cart items by type', () => {
    const cartItems = [
      {
        id: 40171860525109,
        title: 'LowCal / Savory',
        option1: 'LowCal',
        option2: 'Savory',
        option3: null,
        sku: '',
        requires_shipping: true,
        taxable: true,
        featured_image: null,
        available: true,
        name: 'Buffalo Ranch Chicken ',
        public_title: 'LowCal / Savory',
        options: ['LowCal', 'Savory'],
        price: 3400,
        weight: 0,
        compare_at_price: null,
        inventory_management: 'shopify',
        barcode: '',
        requires_selling_plan: false,
        selling_plan_allocations: [],
        metafields: [
          {
            key: 'net_carbs',
            name: 'Net Carbs',
            value: '2 oz'
          },
          {
            key: 'protein',
            name: 'Protein',
            value: '4 oz'
          },
          {
            key: 'calories',
            name: 'Calories',
            value: '6 oz'
          },
          {
            key: 'total_fat',
            name: 'Total Fat',
            value: '3 oz'
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_6c1fdc4c-b412-4e33-bca9-dec68b78adcc.png?v=1638227131'
        ],
        configurationBundleId: 164,
        configurationContentId: 3539,
        description: '<p></p>',
        bundleContentId: 819,
        quantity: 2,
        type: 'Breakfasts',
        productPlatformId: 6715009368117
      },
      {
        id: 40171859607605,
        title: 'LowCal / Savory',
        option1: 'LowCal',
        option2: 'Savory',
        option3: null,
        sku: '',
        requires_shipping: true,
        taxable: true,
        featured_image: null,
        available: true,
        name: 'Asian Slaw Salad ',
        public_title: 'LowCal / Savory',
        options: ['LowCal', 'Savory'],
        price: 3400,
        weight: 0,
        compare_at_price: null,
        inventory_management: 'shopify',
        barcode: '',
        requires_selling_plan: false,
        selling_plan_allocations: [],
        metafields: [
          {
            key: 'protein',
            name: 'Protein',
            value: '5 oz'
          },
          {
            key: 'calories',
            name: 'Calories',
            value: '6 oz'
          },
          {
            key: 'total_fat',
            name: 'Total Fat',
            value: '4 oz'
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339'
        ],
        configurationBundleId: 164,
        configurationContentId: 3538,
        description: '<p></p>',
        bundleContentId: 818,
        quantity: 1,
        type: 'Meals',
        productPlatformId: 6715009105973
      },
      {
        id: 40171859410997,
        title: 'LowCal / Savory',
        option1: 'LowCal',
        option2: 'Savory',
        option3: null,
        sku: '',
        requires_shipping: true,
        taxable: true,
        featured_image: null,
        available: true,
        name: 'Ancho Chili Lime ',
        public_title: 'LowCal / Savory',
        options: ['LowCal', 'Savory'],
        price: 3400,
        weight: 0,
        compare_at_price: null,
        inventory_management: 'shopify',
        barcode: '',
        requires_selling_plan: false,
        selling_plan_allocations: [],
        metafields: [
          {
            key: 'protein',
            name: 'Protein',
            value: '10 oz'
          },
          {
            key: 'calories',
            name: 'Calories',
            value: '200 oz'
          },
          {
            key: 'total_fat',
            name: 'Total Fat',
            value: '5 oz'
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chile-Con-Carne_Keto_C-2000.jpg?v=1637693191'
        ],
        configurationBundleId: 164,
        configurationContentId: 3538,
        description: '<p></p>',
        bundleContentId: 818,
        quantity: 1,
        type: 'Meals',
        productPlatformId: 6715009073205
      },
      {
        id: 40171859836981,
        title: 'LowCal / Savory',
        option1: 'LowCal',
        option2: 'Savory',
        option3: null,
        sku: '',
        requires_shipping: true,
        taxable: true,
        featured_image: null,
        available: true,
        name: 'Bacon Ranch Chicken ',
        public_title: 'LowCal / Savory',
        options: ['LowCal', 'Savory'],
        price: 3400,
        weight: 0,
        compare_at_price: null,
        inventory_management: 'shopify',
        barcode: '',
        requires_selling_plan: false,
        selling_plan_allocations: [],
        metafields: [
          {
            key: 'protein',
            name: 'Protein',
            value: '5 oz'
          },
          {
            key: 'calories',
            name: 'Calories',
            value: '6 oz'
          },
          {
            key: 'total_fat',
            name: 'Total Fat',
            value: '4 oz'
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_cab1f74c-db0d-4173-926a-820927ca3cef.jpg?v=1638834024'
        ],
        configurationBundleId: 164,
        configurationContentId: 3538,
        description:
          '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
        bundleContentId: 818,
        quantity: 1,
        type: 'Meals',
        productPlatformId: 6715009171509
      }
    ]

    const newCart = cart({ ...initialState, cart: cartItems })
    const mappedItems = newCart.mapByTypes()

    expect(mappedItems.totals.breakfasts).toBe(2)
    expect(mappedItems.labels.meals).toBe('Meals')
    expect(mappedItems.types.meals[1].id).toBe(40171859410997)
  })
})
