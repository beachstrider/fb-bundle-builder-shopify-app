import { METAFIELD_PROTEIN } from '../../../src/constants/bundles'
import {
  mapBundleTypeSubtype,
  getBundleMetafield
} from '../../../src/utils/bundles'

describe('Test bundles utility functions', () => {
  it('Maps bundle type and subtype', () => {
    const bundle = {
      id: 6788061888565,
      title: '14 Meal Plan + 7 Breakfasts',
      handle: '14-meal-plan-7-breakfasts',
      description: '<p></p>',
      published_at: '2022-02-09T17:26:44-08:00',
      created_at: '2022-02-09T17:26:46-08:00',
      vendor: 'QuickFresh',
      type: 'Custom Bundle',
      tags: ['7 Day with breakfast'],
      price: 17395,
      price_min: 17395,
      price_max: 17395,
      available: true,
      price_varies: false,
      compare_at_price: null,
      compare_at_price_min: 0,
      compare_at_price_max: 0,
      compare_at_price_varies: false,
      variants: [
        {
          id: 40558468169781,
          title: 'Keto / Regular',
          option1: 'Keto',
          option2: 'Regular',
          option3: null,
          sku: 'CB-14M-7B-KH',
          requires_shipping: true,
          taxable: true,
          featured_image: {
            id: 31019648778293,
            product_id: 6788061888565,
            position: 2,
            created_at: '2022-02-10T10:17:48-08:00',
            updated_at: '2022-02-10T10:17:48-08:00',
            alt: null,
            width: 900,
            height: 720,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/keto-meal-plan.jpg?v=1644517068',
            variant_ids: [40558468169781]
          },
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - Keto / Regular',
          public_title: 'Keto / Regular',
          options: ['Keto', 'Regular'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          featured_media: {
            alt: null,
            id: 23322903806005,
            position: 2,
            preview_image: {
              aspect_ratio: 1.25,
              height: 720,
              width: 900,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/keto-meal-plan.jpg?v=1644517068'
            }
          },
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '350-490'
            }
          ]
        },
        {
          id: 40558468202549,
          title: 'Keto / High Protein',
          option1: 'Keto',
          option2: 'High Protein',
          option3: null,
          sku: 'CB-14M-7B-KH',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - Keto / High Protein',
          public_title: 'Keto / High Protein',
          options: ['Keto', 'High Protein'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '222-333'
            }
          ]
        },
        {
          id: 40558468235317,
          title: 'LowCal / Regular',
          option1: 'LowCal',
          option2: 'Regular',
          option3: null,
          sku: 'CB-14M-7B-LR',
          requires_shipping: true,
          taxable: true,
          featured_image: {
            id: 31019664375861,
            product_id: 6788061888565,
            position: 3,
            created_at: '2022-02-10T10:19:15-08:00',
            updated_at: '2022-02-10T10:19:15-08:00',
            alt: null,
            width: 900,
            height: 720,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-plan.jpg?v=1644517155',
            variant_ids: [40558468235317]
          },
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - LowCal / Regular',
          public_title: 'LowCal / Regular',
          options: ['LowCal', 'Regular'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          featured_media: {
            alt: null,
            id: 23322919436341,
            position: 3,
            preview_image: {
              aspect_ratio: 1.25,
              height: 720,
              width: 900,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-plan.jpg?v=1644517155'
            }
          },
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '100-200'
            }
          ]
        },
        {
          id: 40558468268085,
          title: 'LowCal / Lite',
          option1: 'LowCal',
          option2: 'Lite',
          option3: null,
          sku: 'CB-14M-7B-LL',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - LowCal / Lite',
          public_title: 'LowCal / Lite',
          options: ['LowCal', 'Lite'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '333-444'
            }
          ]
        },
        {
          id: 40558468300853,
          title: 'LowCal / Savory',
          option1: 'LowCal',
          option2: 'Savory',
          option3: null,
          sku: 'CB-14M-7B-LS',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - LowCal / Savory',
          public_title: 'LowCal / Savory',
          options: ['LowCal', 'Savory'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '555-666'
            }
          ]
        }
      ],
      images: [
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/14_7.jpg?v=1644456406',
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/keto-meal-plan.jpg?v=1644517068',
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-plan.jpg?v=1644517155'
      ],
      featured_image:
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/14_7.jpg?v=1644456406',
      options: ['Type', 'Sub Type'],
      media: [
        {
          alt: null,
          id: 23315193954357,
          position: 1,
          preview_image: {
            aspect_ratio: 1,
            height: 2049,
            width: 2048,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/14_7.jpg?v=1644456406'
          },
          aspect_ratio: 1,
          height: 2049,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/14_7.jpg?v=1644456406',
          width: 2048
        },
        {
          alt: null,
          id: 23322903806005,
          position: 2,
          preview_image: {
            aspect_ratio: 1.25,
            height: 720,
            width: 900,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/keto-meal-plan.jpg?v=1644517068'
          },
          aspect_ratio: 1.25,
          height: 720,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/keto-meal-plan.jpg?v=1644517068',
          width: 900
        },
        {
          alt: null,
          id: 23322919436341,
          position: 3,
          preview_image: {
            aspect_ratio: 1.25,
            height: 720,
            width: 900,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-plan.jpg?v=1644517155'
          },
          aspect_ratio: 1.25,
          height: 720,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-plan.jpg?v=1644517155',
          width: 900
        }
      ],
      requires_selling_plan: false,
      selling_plan_groups: [],
      content: '<p></p>',
      metafields: [
        {
          key: 'net_carbs',
          name: 'Net Carbs',
          value: '25-30%'
        },
        {
          key: 'protein',
          name: 'Protein',
          value: '40-50%'
        },
        {
          key: 'fat',
          name: 'Fat',
          value: '20-25%'
        },
        {
          key: 'bundle_key_points',
          name: 'Bundle Key Points',
          value: 'Health macro-balanced meals that fuel your body right.'
        }
      ]
    }

    const mappedProducts = mapBundleTypeSubtype(bundle)

    expect(mappedProducts[0].name).toBe('keto')
    expect(mappedProducts[0].options[0].metafields[1].key).toBe('net_carbs')
    expect(mappedProducts[1].options[2].name).toBe('savory')
    expect(mappedProducts[0].featuredImage).toBe(
      'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/keto-meal-plan.jpg?v=1644517068'
    )
    expect(mappedProducts[0].options.length).toBe(2)
    expect(mappedProducts[1].options.length).toBe(3)
  })

  it('Throws error to map bundle type and subtype', () => {
    expect(mapBundleTypeSubtype).toThrow()
  })

  it('Finds bundle metafield', () => {
    const metafields = [
      {
        key: 'bundle_key_points',
        name: 'Bundle Key Points',
        value: 'Health macro-balanced meals that fuel your body right.'
      },
      {
        key: 'net_carbs',
        name: 'Net Carbs',
        value: '25-30%'
      },
      {
        key: 'protein',
        name: 'Protein',
        value: '40-50%'
      },
      {
        key: 'fat',
        name: 'Fat',
        value: '20-25%'
      },
      {
        key: 'calorie_range',
        name: 'Calorie Range',
        value: '350-490'
      }
    ]
    const metafield = getBundleMetafield(metafields, METAFIELD_PROTEIN)
    expect(metafield.value).toBe('40-50%')
    expect(metafield.key).toBe('protein')
  })
})
