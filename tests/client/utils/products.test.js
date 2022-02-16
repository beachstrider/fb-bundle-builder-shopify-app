import { filterShopifyVariants } from '../../../src/utils/products'

describe('Test products utility functions', () => {
  it('Filters Shopify variants by names', () => {
    const entreTypeName = 'lowcal'
    const entreSubTypeName = 'regular'
    const filteredProducts = [
      {
        id: 6715009695797,
        title: 'Chicken Satay',
        handle: 'chicken-satay',
        description: '<p></p>',
        published_at: '2021-11-18T14:00:35-08:00',
        created_at: '2021-11-18T14:00:35-08:00',
        vendor: 'QuickFresh SANDBOX',
        type: '',
        tags: ['Bundle Builder App'],
        price: 3400,
        price_min: 3400,
        price_max: 3400,
        available: true,
        price_varies: false,
        compare_at_price: null,
        compare_at_price_min: 0,
        compare_at_price_max: 0,
        compare_at_price_varies: false,
        variants: [
          {
            id: 40171861508149,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken Satay - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '5 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '4 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '4 oz'
              }
            ]
          },
          {
            id: 40171861540917,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken Satay - Keto / Lite',
            public_title: 'Keto / Lite',
            options: ['Keto', 'Lite'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '6 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '5 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '4 oz'
              }
            ]
          },
          {
            id: 40171861573685,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken Satay - Keto / Protein',
            public_title: 'Keto / Protein',
            options: ['Keto', 'Protein'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '3 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '2 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '1 oz'
              }
            ]
          },
          {
            id: 40171861606453,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken Satay ',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '6 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '5 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '23 oz'
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_84399634-2403-4cd0-a373-b7d4b9990361.png?v=1638227442'
            ],
            configurationBundleId: 164,
            configurationContentId: 3537,
            description: '<p></p>',
            bundleContentId: 819,
            quantity: 0,
            type: 'Breakfasts',
            productPlatformId: 6715009695797
          },
          {
            id: 40171861671989,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken Satay - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '6 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '5 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '4 oz'
              }
            ]
          },
          {
            id: 40171861704757,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken Satay - LowCal / Savory',
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
                key: 'calories',
                name: 'Calories',
                value: '5 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '4 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '3 oz'
              }
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_84399634-2403-4cd0-a373-b7d4b9990361.png?v=1638227442'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_84399634-2403-4cd0-a373-b7d4b9990361.png?v=1638227442',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22855770505269,
            position: 1,
            preview_image: {
              aspect_ratio: 1.641,
              height: 440,
              width: 722,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_84399634-2403-4cd0-a373-b7d4b9990361.png?v=1638227442'
            },
            aspect_ratio: 1.641,
            height: 440,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_84399634-2403-4cd0-a373-b7d4b9990361.png?v=1638227442',
            width: 722
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content: '<p></p>',
        metafields: [],
        bundle_configuration_content_id: 3537
      },
      {
        id: 6715009663029,
        title: 'Chicken BBQ Salad',
        handle: 'chicken-bbq-salad',
        description: '<p></p>',
        published_at: '2021-11-18T14:00:33-08:00',
        created_at: '2021-11-18T14:00:34-08:00',
        vendor: 'QuickFresh SANDBOX',
        type: '',
        tags: ['Bundle Builder App'],
        price: 3400,
        price_min: 3400,
        price_max: 3400,
        available: true,
        price_varies: false,
        compare_at_price: null,
        compare_at_price_min: 0,
        compare_at_price_max: 0,
        compare_at_price_varies: false,
        variants: [
          {
            id: 40171861311541,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken BBQ Salad - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '6 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '3 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '5 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '4 oz'
              }
            ]
          },
          {
            id: 40171861344309,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken BBQ Salad - Keto / Lite',
            public_title: 'Keto / Lite',
            options: ['Keto', 'Lite'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '54 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '6 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '32 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '34 oz'
              }
            ]
          },
          {
            id: 40171861377077,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken BBQ Salad - Keto / Protein',
            public_title: 'Keto / Protein',
            options: ['Keto', 'Protein'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '6 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '5 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '4 oz'
              }
            ]
          },
          {
            id: 40171861409845,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken BBQ Salad ',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '5 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '4 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '4 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '3 oz'
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_6b3aa79d-49bb-4b83-af06-445a6bcba05c.jpg?v=1638227585'
            ],
            configurationBundleId: 164,
            configurationContentId: 3537,
            description: '<p></p>',
            bundleContentId: 819,
            quantity: 0,
            type: 'Breakfasts',
            productPlatformId: 6715009663029
          },
          {
            id: 40171861442613,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken BBQ Salad - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '5 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '4 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '4 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '3 oz'
              }
            ]
          },
          {
            id: 40171861475381,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Chicken BBQ Salad - LowCal / Savory',
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
                key: 'calories',
                name: 'Calories',
                value: '5 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '4 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '4 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '3 oz'
              }
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_6b3aa79d-49bb-4b83-af06-445a6bcba05c.jpg?v=1638227585'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_6b3aa79d-49bb-4b83-af06-445a6bcba05c.jpg?v=1638227585',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22855773847605,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 1200,
              width: 1200,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_6b3aa79d-49bb-4b83-af06-445a6bcba05c.jpg?v=1638227585'
            },
            aspect_ratio: 1,
            height: 1200,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_6b3aa79d-49bb-4b83-af06-445a6bcba05c.jpg?v=1638227585',
            width: 1200
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content: '<p></p>',
        metafields: [],
        bundle_configuration_content_id: 3537
      }
    ]
    const configuration = {
      id: 819,
      bundle_id: 164,
      title: 'Breakfasts',
      quantity: 2,
      createdAt: '2022-01-06T20:12:18.000Z',
      updatedAt: '2022-01-06T20:12:18.000Z',
      bundleId: 164
    }

    const filteredValues = filterShopifyVariants(
      filteredProducts,
      entreTypeName,
      entreSubTypeName,
      configuration
    )

    expect(filteredValues[0].title).toBe('LowCal / Regular')
    expect(filteredValues[0].option1).toBe('LowCal')
    expect(filteredValues[1].option2).toBe('Regular')
  })
})
