import { METAFIELD_PROTEIN } from '../../../src/constants/bundles'
import {
  mapBundleTypeSubtype,
  getBundleMetafield,
  mapBundleItems,
  mapBundleItemsByOption,
  getBundleVariant
} from '../../../src/utils/bundles'

describe('Test bundles utility functions', () => {
  const shopifyProducts = [
    {
      id: 6781001302069,
      title: 'Bacon Spinach Tomato Frittata',
      handle: 'bacon-spinach-tomato-frittata',
      description:
        '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
      published_at: '2022-01-31T10:31:05-08:00',
      created_at: '2022-01-31T10:31:05-08:00',
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
          id: 40520244756533,
          title: 'Keto / Regular',
          option1: 'Keto',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Spinach Tomato Frittata ',
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
              value: '99 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: '4 oz'
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '6 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ],
          images: [
            '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_b0d1f915-0b99-4be8-a677-cdae1f26c7bc.jpg?v=1643653867'
          ],
          configurationBundleId: 164,
          configurationContentId: 3542,
          description:
            '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
          bundleContentId: 818,
          quantity: 0,
          type: 'Meals',
          productPlatformId: 6781001302069
        },
        {
          id: 40520244822069,
          title: 'Keto / Lite',
          option1: 'Keto',
          option2: 'Lite',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Spinach Tomato Frittata - Keto / Lite',
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
              value: '55 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: '22 oz'
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '44 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '33 oz'
            }
          ]
        },
        {
          id: 40520244854837,
          title: 'Keto / Protein',
          option1: 'Keto',
          option2: 'Protein',
          option3: null,
          sku: null,
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Spinach Tomato Frittata - Keto / Protein',
          public_title: 'Keto / Protein',
          options: ['Keto', 'Protein'],
          price: 3400,
          weight: 0,
          compare_at_price: null,
          inventory_management: 'shopify',
          barcode: null,
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calories',
              name: 'Calories',
              value: ''
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: ''
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: ''
            }
          ]
        },
        {
          id: 40520244887605,
          title: 'LowCal / Regular',
          option1: 'LowCal',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Spinach Tomato Frittata - LowCal / Regular',
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
              value: '19 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: '32 oz'
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '13 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '54 oz'
            }
          ]
        },
        {
          id: 40520244920373,
          title: 'LowCal / Lite',
          option1: 'LowCal',
          option2: 'Lite',
          option3: null,
          sku: null,
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Spinach Tomato Frittata - LowCal / Lite',
          public_title: 'LowCal / Lite',
          options: ['LowCal', 'Lite'],
          price: 3400,
          weight: 0,
          compare_at_price: null,
          inventory_management: 'shopify',
          barcode: null,
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calories',
              name: 'Calories',
              value: ''
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: ''
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: ''
            }
          ]
        },
        {
          id: 40520244953141,
          title: 'LowCal / Savory',
          option1: 'LowCal',
          option2: 'Savory',
          option3: null,
          sku: null,
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Spinach Tomato Frittata - LowCal / Savory',
          public_title: 'LowCal / Savory',
          options: ['LowCal', 'Savory'],
          price: 3400,
          weight: 0,
          compare_at_price: null,
          inventory_management: 'shopify',
          barcode: null,
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'calories',
              name: 'Calories',
              value: ''
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: ''
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: ''
            }
          ]
        }
      ],
      images: [
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_b0d1f915-0b99-4be8-a677-cdae1f26c7bc.jpg?v=1643653867'
      ],
      featured_image:
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_b0d1f915-0b99-4be8-a677-cdae1f26c7bc.jpg?v=1643653867',
      options: ['Type', 'Subtype'],
      media: [
        {
          alt: null,
          id: 23252837859381,
          position: 1,
          preview_image: {
            aspect_ratio: 1,
            height: 1200,
            width: 1200,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_b0d1f915-0b99-4be8-a677-cdae1f26c7bc.jpg?v=1643653867'
          },
          aspect_ratio: 1,
          height: 1200,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_b0d1f915-0b99-4be8-a677-cdae1f26c7bc.jpg?v=1643653867',
          width: 1200
        }
      ],
      requires_selling_plan: false,
      selling_plan_groups: [],
      content:
        '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
      metafields: [],
      bundle_configuration_content_id: 3542
    },
    {
      id: 6715009171509,
      title: 'Bacon Ranch Chicken',
      handle: 'bacon-ranch-chicken',
      description:
        '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
      published_at: '2021-11-18T14:00:24-08:00',
      created_at: '2021-11-18T14:00:24-08:00',
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
          id: 40171859673141,
          title: 'Keto / Regular',
          option1: 'Keto',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Ranch Chicken ',
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
              value: ''
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
          ],
          images: [
            '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_cab1f74c-db0d-4173-926a-820927ca3cef.jpg?v=1638834024'
          ],
          configurationBundleId: 164,
          configurationContentId: 3542,
          description:
            '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
          bundleContentId: 818,
          quantity: 0,
          type: 'Meals',
          productPlatformId: 6715009171509
        },
        {
          id: 40171859705909,
          title: 'Keto / Lite',
          option1: 'Keto',
          option2: 'Lite',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Ranch Chicken - Keto / Lite',
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
              value: '7 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '6 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        },
        {
          id: 40171859738677,
          title: 'Keto / Protein',
          option1: 'Keto',
          option2: 'Protein',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Ranch Chicken - Keto / Protein',
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
              value: '7 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '6 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        },
        {
          id: 40171859771445,
          title: 'LowCal / Regular',
          option1: 'LowCal',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Ranch Chicken - LowCal / Regular',
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
              value: '7 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: '32 oz'
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '6 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        },
        {
          id: 40171859804213,
          title: 'LowCal / Lite',
          option1: 'LowCal',
          option2: 'Lite',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Bacon Ranch Chicken - LowCal / Lite',
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
              value: '7 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '6 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
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
          name: 'Bacon Ranch Chicken - LowCal / Savory',
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
              value: '6 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
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
        }
      ],
      images: [
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_cab1f74c-db0d-4173-926a-820927ca3cef.jpg?v=1638834024'
      ],
      featured_image:
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_cab1f74c-db0d-4173-926a-820927ca3cef.jpg?v=1638834024',
      options: ['Type', 'Subtype'],
      media: [
        {
          alt: null,
          id: 22915300851765,
          position: 1,
          preview_image: {
            aspect_ratio: 1,
            height: 1200,
            width: 1200,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_cab1f74c-db0d-4173-926a-820927ca3cef.jpg?v=1638834024'
          },
          aspect_ratio: 1,
          height: 1200,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_cab1f74c-db0d-4173-926a-820927ca3cef.jpg?v=1638834024',
          width: 1200
        }
      ],
      requires_selling_plan: false,
      selling_plan_groups: [],
      content:
        '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
      metafields: [],
      bundle_configuration_content_id: 3542
    },
    {
      id: 6715009105973,
      title: 'Asian Slaw Salad',
      handle: 'asian-slaw-salad',
      description: '<p></p>',
      published_at: '2021-11-18T14:00:22-08:00',
      created_at: '2021-11-18T14:00:23-08:00',
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
          id: 40171859443765,
          title: 'Keto / Regular',
          option1: 'Keto',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Asian Slaw Salad ',
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
              value: '7 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '6 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ],
          images: [
            '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339'
          ],
          configurationBundleId: 164,
          configurationContentId: 3542,
          description: '<p></p>',
          bundleContentId: 818,
          quantity: 0,
          type: 'Meals',
          productPlatformId: 6715009105973
        },
        {
          id: 40171859476533,
          title: 'Keto / Lite',
          option1: 'Keto',
          option2: 'Lite',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Asian Slaw Salad - Keto / Lite',
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
              value: '7 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '6 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        },
        {
          id: 40171859509301,
          title: 'Keto / Protein',
          option1: 'Keto',
          option2: 'Protein',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Asian Slaw Salad - Keto / Protein',
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
              value: ''
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
          id: 40171859542069,
          title: 'LowCal / Regular',
          option1: 'LowCal',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Asian Slaw Salad - LowCal / Regular',
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
              value: '12 oz'
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
          id: 40171859574837,
          title: 'LowCal / Lite',
          option1: 'LowCal',
          option2: 'Lite',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Asian Slaw Salad - LowCal / Lite',
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
              value: ''
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
          name: 'Asian Slaw Salad - LowCal / Savory',
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
              value: '6 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
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
        }
      ],
      images: [
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339'
      ],
      featured_image:
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339',
      options: ['Type', 'Subtype'],
      media: [
        {
          alt: null,
          id: 22816184696885,
          position: 1,
          preview_image: {
            aspect_ratio: 1,
            height: 1200,
            width: 1200,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339'
          },
          aspect_ratio: 1,
          height: 1200,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339',
          width: 1200
        }
      ],
      requires_selling_plan: false,
      selling_plan_groups: [],
      content: '<p></p>',
      metafields: [],
      bundle_configuration_content_id: 3542
    },
    {
      id: 6715009073205,
      title: 'Ancho Chili Lime',
      handle: 'ancho-chili-lime',
      description: '<p></p>',
      published_at: '2021-11-18T14:00:21-08:00',
      created_at: '2021-11-18T14:00:21-08:00',
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
          id: 40171859247157,
          title: 'Keto / Regular',
          option1: 'Keto',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Ancho Chili Lime ',
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
              value: '200 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '10 oz'
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
          configurationContentId: 3542,
          description: '<p></p>',
          bundleContentId: 818,
          quantity: 0,
          type: 'Meals',
          productPlatformId: 6715009073205
        },
        {
          id: 40171859279925,
          title: 'Keto / Lite',
          option1: 'Keto',
          option2: 'Lite',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Ancho Chili Lime - Keto / Lite',
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
              value: '200 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '10 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        },
        {
          id: 40171859312693,
          title: 'Keto / Protein',
          option1: 'Keto',
          option2: 'Protein',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Ancho Chili Lime - Keto / Protein',
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
              value: '200 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '10 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        },
        {
          id: 40171859345461,
          title: 'LowCal / Regular',
          option1: 'LowCal',
          option2: 'Regular',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Ancho Chili Lime - LowCal / Regular',
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
              value: '200 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: '12 oz'
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '10 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        },
        {
          id: 40171859378229,
          title: 'LowCal / Lite',
          option1: 'LowCal',
          option2: 'Lite',
          option3: null,
          sku: '',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: 'Ancho Chili Lime - LowCal / Lite',
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
              value: '200 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '10 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
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
          name: 'Ancho Chili Lime - LowCal / Savory',
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
              value: '200 oz'
            },
            {
              key: 'net_carbs',
              name: 'Net Carbs',
              value: ''
            },
            {
              key: 'protein',
              name: 'Protein',
              value: '10 oz'
            },
            {
              key: 'total_fat',
              name: 'Total Fat',
              value: '5 oz'
            }
          ]
        }
      ],
      images: [
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chile-Con-Carne_Keto_C-2000.jpg?v=1637693191'
      ],
      featured_image:
        '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chile-Con-Carne_Keto_C-2000.jpg?v=1637693191',
      options: ['Type', 'Subtype'],
      media: [
        {
          alt: null,
          id: 22816173391925,
          position: 1,
          preview_image: {
            aspect_ratio: 1.778,
            height: 1125,
            width: 2000,
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chile-Con-Carne_Keto_C-2000.jpg?v=1637693191'
          },
          aspect_ratio: 1.778,
          height: 1125,
          media_type: 'image',
          src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chile-Con-Carne_Keto_C-2000.jpg?v=1637693191',
          width: 2000
        }
      ],
      requires_selling_plan: false,
      selling_plan_groups: [],
      content: '<p></p>',
      metafields: [],
      bundle_configuration_content_id: 3542
    }
  ]

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

  it('Maps bundles to subtypes/variants', () => {
    const shopBundles = [
      {
        id: 6788077060149,
        title: '10 Meal Plan',
        handle: '10-meal-plan-1',
        description: '<p></p>',
        published_at: '2022-02-09T17:33:58-08:00',
        created_at: '2022-02-09T17:33:59-08:00',
        vendor: 'QuickFresh',
        type: 'Custom Bundle',
        tags: ['5 Day'],
        price: 11950,
        price_min: 11950,
        price_max: 11950,
        available: true,
        price_varies: false,
        compare_at_price: null,
        compare_at_price_min: 0,
        compare_at_price_max: 0,
        compare_at_price_varies: false,
        variants: [
          {
            id: 40558489796661,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: 'CB-10M-KH',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 11950,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489862197,
            title: 'Keto / High Protein',
            option1: 'Keto',
            option2: 'High Protein',
            option3: null,
            sku: 'CB-10M-KH',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan - Keto / High Protein',
            public_title: 'Keto / High Protein',
            options: ['Keto', 'High Protein'],
            price: 11950,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489927733,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: 'CB-10M-LR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan - LowCal / Regular',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 11950,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489993269,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: 'CB-10M-LL',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 11950,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558490058805,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: 'CB-10M-LS',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan - LowCal / Savory',
            public_title: 'LowCal / Savory',
            options: ['LowCal', 'Savory'],
            price: 11950,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/10-01_1.jpg?v=1644456839'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/10-01_1.jpg?v=1644456839',
        options: ['Type', 'Sub Type'],
        media: [
          {
            alt: null,
            id: 23315215679541,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 2049,
              width: 2048,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/10-01_1.jpg?v=1644456839'
            },
            aspect_ratio: 1,
            height: 2049,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/10-01_1.jpg?v=1644456839',
            width: 2048
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content: '<p></p>',
        metafields: [
          {
            key: 'net_carbs',
            name: 'Net Carbs',
            value: ''
          },
          {
            key: 'protein',
            name: 'Protein',
            value: ''
          },
          {
            key: 'fat',
            name: 'Fat',
            value: ''
          },
          {
            key: 'bundle_key_points',
            name: 'Bundle Key Points',
            value: ''
          }
        ]
      },
      {
        id: 6788076896309,
        title: '14 Meal Plan',
        handle: '14-meal-plan-1',
        description: '<p></p>',
        published_at: '2022-02-09T17:33:56-08:00',
        created_at: '2022-02-09T17:33:57-08:00',
        vendor: 'QuickFresh',
        type: 'Custom Bundle',
        tags: ['7 Day'],
        price: 13930,
        price_min: 13930,
        price_max: 13930,
        available: true,
        price_varies: false,
        compare_at_price: null,
        compare_at_price_min: 0,
        compare_at_price_max: 0,
        compare_at_price_varies: false,
        variants: [
          {
            id: 40558489501749,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: 'CB-14M-KH',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '14 Meal Plan - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 13930,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489534517,
            title: 'Keto / High Protein',
            option1: 'Keto',
            option2: 'High Protein',
            option3: null,
            sku: 'CB-14M-KH',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '14 Meal Plan - Keto / High Protein',
            public_title: 'Keto / High Protein',
            options: ['Keto', 'High Protein'],
            price: 13930,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489567285,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: 'CB-14M-LR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '14 Meal Plan - LowCal / Regular',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 13930,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489600053,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: 'CB-14M-LL',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '14 Meal Plan - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 13930,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489632821,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: 'CB-14M-LS',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '14 Meal Plan - LowCal / Savory',
            public_title: 'LowCal / Savory',
            options: ['LowCal', 'Savory'],
            price: 13930,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/14_1.jpg?v=1644456837'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/14_1.jpg?v=1644456837',
        options: ['Type', 'Sub Type'],
        media: [
          {
            alt: null,
            id: 23315215548469,
            position: 1,
            preview_image: {
              aspect_ratio: 1.002,
              height: 2049,
              width: 2053,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/14_1.jpg?v=1644456837'
            },
            aspect_ratio: 1.002,
            height: 2049,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/14_1.jpg?v=1644456837',
            width: 2053
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content: '<p></p>',
        metafields: [
          {
            key: 'net_carbs',
            name: 'Net Carbs',
            value: ''
          },
          {
            key: 'protein',
            name: 'Protein',
            value: ''
          },
          {
            key: 'fat',
            name: 'Fat',
            value: ''
          },
          {
            key: 'bundle_key_points',
            name: 'Bundle Key Points',
            value: ''
          }
        ]
      },
      {
        id: 6788076798005,
        title: '10 Meal Plan + 5 Breakfasts',
        handle: '10-meal-plan-3-breakfasts',
        description: '<p></p>',
        published_at: '2022-02-09T17:33:53-08:00',
        created_at: '2022-02-09T17:33:55-08:00',
        vendor: 'QuickFresh',
        type: 'Custom Bundle',
        tags: ['5 Day with breakfast'],
        price: 14925,
        price_min: 14925,
        price_max: 14925,
        available: true,
        price_varies: false,
        compare_at_price: null,
        compare_at_price_min: 0,
        compare_at_price_max: 0,
        compare_at_price_varies: false,
        variants: [
          {
            id: 40558489272373,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: 'CB-10M-5B-KR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan + 5 Breakfasts - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 14925,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489305141,
            title: 'Keto / High Protein',
            option1: 'Keto',
            option2: 'High Protein',
            option3: null,
            sku: 'CB-10M-5B-KH',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan + 5 Breakfasts - Keto / High Protein',
            public_title: 'Keto / High Protein',
            options: ['Keto', 'High Protein'],
            price: 14925,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489337909,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: 'CB-10M-5B-LR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan + 5 Breakfasts - LowCal / Regular',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 14925,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489370677,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: 'CB-10M-5B-LL',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan + 5 Breakfasts - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 14925,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558489403445,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: 'CB-10M-5B-LS',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '10 Meal Plan + 5 Breakfasts - LowCal / Savory',
            public_title: 'LowCal / Savory',
            options: ['LowCal', 'Savory'],
            price: 14925,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/10_5.jpg?v=1644456835'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/10_5.jpg?v=1644456835',
        options: ['Type', 'Sub Type'],
        media: [
          {
            alt: null,
            id: 23315215515701,
            position: 1,
            preview_image: {
              aspect_ratio: 1.002,
              height: 2049,
              width: 2053,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/10_5.jpg?v=1644456835'
            },
            aspect_ratio: 1.002,
            height: 2049,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/10_5.jpg?v=1644456835',
            width: 2053
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content: '<p></p>',
        metafields: [
          {
            key: 'net_carbs',
            name: 'Net Carbs',
            value: ''
          },
          {
            key: 'protein',
            name: 'Protein',
            value: ''
          },
          {
            key: 'fat',
            name: 'Fat',
            value: ''
          },
          {
            key: 'bundle_key_points',
            name: 'Bundle Key Points',
            value: ''
          }
        ]
      },
      {
        id: 6788076699701,
        title: '6 Meal Plan',
        handle: '6-meal-plan',
        description: '<p></p>',
        published_at: '2022-02-09T17:33:51-08:00',
        created_at: '2022-02-09T17:33:52-08:00',
        vendor: 'QuickFresh',
        type: 'Custom Bundle',
        tags: ['3 Day'],
        price: 7770,
        price_min: 7770,
        price_max: 7770,
        available: true,
        price_varies: false,
        compare_at_price: null,
        compare_at_price_min: 0,
        compare_at_price_max: 0,
        compare_at_price_varies: false,
        variants: [
          {
            id: 40558489042997,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: 'CB-6M-KR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 7770,
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
                value: ''
              }
            ]
          },
          {
            id: 40558489075765,
            title: 'Keto / High Protein',
            option1: 'Keto',
            option2: 'High Protein',
            option3: null,
            sku: 'CB-6M-KH',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan - Keto / High Protein',
            public_title: 'Keto / High Protein',
            options: ['Keto', 'High Protein'],
            price: 7770,
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
                value: ''
              }
            ]
          },
          {
            id: 40558489108533,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: 'CB-6M-LR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan - LowCal / Regular',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 7770,
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
                value: ''
              }
            ]
          },
          {
            id: 40558489141301,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: 'CB-6M-LL',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 7770,
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
                value: ''
              }
            ]
          },
          {
            id: 40558489174069,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: 'CB-6M-LS',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan - LowCal / Savory',
            public_title: 'LowCal / Savory',
            options: ['LowCal', 'Savory'],
            price: 7770,
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
                value: ''
              }
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/6.jpg?v=1644456832'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/6.jpg?v=1644456832',
        options: ['Type', 'Sub Type'],
        media: [
          {
            alt: null,
            id: 23315215351861,
            position: 1,
            preview_image: {
              aspect_ratio: 1.002,
              height: 2049,
              width: 2053,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/6.jpg?v=1644456832'
            },
            aspect_ratio: 1.002,
            height: 2049,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/6.jpg?v=1644456832',
            width: 2053
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content: '<p></p>',
        metafields: [
          {
            key: 'net_carbs',
            name: 'Net Carbs',
            value: ''
          },
          {
            key: 'protein',
            name: 'Protein',
            value: ''
          },
          {
            key: 'fat',
            name: 'Fat',
            value: ''
          },
          {
            key: 'bundle_key_points',
            name: 'Bundle Key Points',
            value: ''
          }
        ]
      },
      {
        id: 6788076568629,
        title: '6 Meal Plan + 3 Breakfasts',
        handle: '6-meal-plan-3-breakfasts',
        description: '<p></p>',
        published_at: '2022-02-09T17:33:48-08:00',
        created_at: '2022-02-09T17:33:49-08:00',
        vendor: 'QuickFresh',
        type: 'Custom Bundle',
        tags: ['3 Day with breakfast'],
        price: 9555,
        price_min: 9555,
        price_max: 9555,
        available: true,
        price_varies: false,
        compare_at_price: null,
        compare_at_price_min: 0,
        compare_at_price_max: 0,
        compare_at_price_varies: false,
        variants: [
          {
            id: 40558488420405,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: 'CB-6M-3B-KR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan + 3 Breakfasts - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 9555,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558488453173,
            title: 'Keto / High Protein',
            option1: 'Keto',
            option2: 'High Protein',
            option3: null,
            sku: 'CB-6M-3B-KH',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan + 3 Breakfasts - Keto / High Protein',
            public_title: 'Keto / High Protein',
            options: ['Keto', 'High Protein'],
            price: 9555,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558488485941,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: 'CB-6M-3B-LR',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan + 3 Breakfasts - LowCal / Regular',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 9555,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558488518709,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: 'CB-6M-3B-LL',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan + 3 Breakfasts - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 9555,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          },
          {
            id: 40558488551477,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: 'CB-6M-3B-LS',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: '6 Meal Plan + 3 Breakfasts - LowCal / Savory',
            public_title: 'LowCal / Savory',
            options: ['LowCal', 'Savory'],
            price: 9555,
            weight: 0,
            compare_at_price: null,
            inventory_management: null,
            barcode: null,
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calorie_range',
                name: 'Calorie Range',
                value: ''
              }
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/6_3-01.jpg?v=1644456829'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/6_3-01.jpg?v=1644456829',
        options: ['Type', 'Sub Type'],
        media: [
          {
            alt: null,
            id: 23315215253557,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 2049,
              width: 2048,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/6_3-01.jpg?v=1644456829'
            },
            aspect_ratio: 1,
            height: 2049,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/6_3-01.jpg?v=1644456829',
            width: 2048
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content: '<p></p>',
        metafields: [
          {
            key: 'net_carbs',
            name: 'Net Carbs',
            value: ''
          },
          {
            key: 'protein',
            name: 'Protein',
            value: ''
          },
          {
            key: 'fat',
            name: 'Fat',
            value: ''
          },
          {
            key: 'bundle_key_points',
            name: 'Bundle Key Points',
            value: ''
          }
        ]
      },
      {
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
    ]

    const subscription = {
      id: 253,
      customer_id: 1,
      bundle_id: 164,
      platform_subscription_id: 12324343,
      delivery_day: 3,
      platform_product_id: 6788061888565,
      platform_variant_id: 40558468169781,
      subscription_type: 'Keto',
      subscription_sub_type: 'Regular',
      is_active: 1,
      createdAt: '2021-11-26T22:33:33.000Z',
      updatedAt: '2021-11-26T22:33:33.000Z'
    }

    const configuration = {
      id: 819,
      bundle_id: 164,
      title: 'Breakfasts',
      quantity: 2,
      createdAt: '2022-01-06T20:12:18.000Z',
      updatedAt: '2022-01-06T20:12:18.000Z',
      bundleId: 164
    }

    const filteredValues = mapBundleItems(
      shopifyProducts,
      shopBundles,
      subscription,
      configuration
    )

    expect(filteredValues[0].id).toBe(40520244756533)
    expect(filteredValues[1].option1).toBe('Keto')
    expect(filteredValues[2].productPlatformId).toBe(6715009105973)
  })

  it('Maps bundles to subtypes/variants by option name', () => {
    const subscription = {
      id: 253,
      customer_id: 1,
      bundle_id: 164,
      platform_subscription_id: 12324343,
      delivery_day: 3,
      platform_product_id: 6788061888565,
      platform_variant_id: 40558468169781,
      subscription_type: 'Keto',
      subscription_sub_type: 'Regular',
      is_active: 1,
      createdAt: '2021-11-26T22:33:33.000Z',
      updatedAt: '2021-11-26T22:33:33.000Z'
    }

    const configuration = {
      id: 819,
      bundle_id: 164,
      title: 'Breakfasts',
      quantity: 2,
      createdAt: '2022-01-06T20:12:18.000Z',
      updatedAt: '2022-01-06T20:12:18.000Z',
      bundleId: 164
    }

    const filteredValues = mapBundleItemsByOption(
      shopifyProducts,
      'Keto',
      'Regular',
      configuration
    )

    expect(filteredValues[0].id).toBe(40520244756533)
    expect(filteredValues[1].option2).toBe('Regular')
    expect(filteredValues[2].productPlatformId).toBe(6715009105973)
  })

  it('Gets bundle variant', () => {
    const shopifyBundle = {
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
          title: 'Keto / Medium',
          option1: 'Keto',
          option2: 'Medium',
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
          name: '14 Meal Plan + 7 Breakfasts - Keto / Medium',
          public_title: 'Keto / Medium',
          options: ['Keto', 'Medium'],
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
              key: 'contains',
              name: 'Contains',
              value: 'Contains Keto Regular'
            },
            {
              key: 'ingredients',
              name: 'Ingredients',
              value: 'Ingredients for Keto Regular'
            },
            {
              key: 'subtitle',
              name: 'Subtitle',
              value: 'Keto regular subtitle...'
            },
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '350-490'
            }
          ]
        },
        {
          id: 40558468202549,
          title: 'Keto / Large',
          option1: 'Keto',
          option2: 'Large',
          option3: null,
          sku: 'CB-14M-7B-KH',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - Keto / Large',
          public_title: 'Keto / Large',
          options: ['Keto', 'Large'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'contains',
              name: 'Contains',
              value: ''
            },
            {
              key: 'ingredients',
              name: 'Ingredients',
              value: ''
            },
            {
              key: 'subtitle',
              name: 'Subtitle',
              value: ''
            },
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '222-333'
            }
          ]
        },
        {
          id: 40558468235317,
          title: 'Balanced / Small',
          option1: 'Balanced',
          option2: 'Small',
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
          name: '14 Meal Plan + 7 Breakfasts - Balanced / Small',
          public_title: 'Balanced / Small',
          options: ['Balanced', 'Small'],
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
              key: 'contains',
              name: 'Contains',
              value: ''
            },
            {
              key: 'ingredients',
              name: 'Ingredients',
              value: ''
            },
            {
              key: 'subtitle',
              name: 'Subtitle',
              value: ''
            },
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '100-200'
            }
          ]
        },
        {
          id: 40558468268085,
          title: 'Balanced / Medium',
          option1: 'Balanced',
          option2: 'Medium',
          option3: null,
          sku: 'CB-14M-7B-LL',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - Balanced / Medium',
          public_title: 'Balanced / Medium',
          options: ['Balanced', 'Medium'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'contains',
              name: 'Contains',
              value: ''
            },
            {
              key: 'ingredients',
              name: 'Ingredients',
              value: ''
            },
            {
              key: 'subtitle',
              name: 'Subtitle',
              value: ''
            },
            {
              key: 'calorie_range',
              name: 'Calorie Range',
              value: '333-444'
            }
          ]
        },
        {
          id: 40558468300853,
          title: 'Balanced / Large',
          option1: 'Balanced',
          option2: 'Large',
          option3: null,
          sku: 'CB-14M-7B-LS',
          requires_shipping: true,
          taxable: true,
          featured_image: null,
          available: true,
          name: '14 Meal Plan + 7 Breakfasts - Balanced / Large',
          public_title: 'Balanced / Large',
          options: ['Balanced', 'Large'],
          price: 17395,
          weight: 0,
          compare_at_price: null,
          inventory_management: null,
          barcode: '',
          requires_selling_plan: false,
          selling_plan_allocations: [],
          metafields: [
            {
              key: 'contains',
              name: 'Contains',
              value: ''
            },
            {
              key: 'ingredients',
              name: 'Ingredients',
              value: ''
            },
            {
              key: 'subtitle',
              name: 'Subtitle',
              value: ''
            },
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
          key: 'keto_bundle_key_points',
          name: 'Bundle Key Points',
          value: 'Key points 001'
        },
        {
          key: 'keto_net_carbs',
          name: 'Net Carbs',
          value: '19-20%'
        },
        {
          key: 'keto_protein',
          name: 'Protein',
          value: '21-22%'
        },
        {
          key: 'keto_fat',
          name: 'Fat',
          value: '27-28%'
        },
        {
          key: 'balanced_bundle_key_points',
          name: 'Bundle Key Points',
          value: 'Key points 002'
        },
        {
          key: 'balanced_net_carbs',
          name: 'Net Carbs',
          value: '24-25%'
        },
        {
          key: 'balanced_protein',
          name: 'Protein',
          value: '26-27%'
        },
        {
          key: 'balanced_fat',
          name: 'Fat',
          value: '23-24%'
        }
      ]
    }

    const variant = getBundleVariant(shopifyBundle, 'Keto', 'Medium')
    expect(variant.id).toBe(40558468169781)
    expect(variant.option1).toBe('Keto')
    expect(variant.option2).toBe('Medium')
  })

  it('Fails to get bundle variant', () => {
    const shopifyBundle = {}

    expect(() => {
      getBundleVariant(shopifyBundle, 'Keto', 'Medium')
    }).toThrow()
  })
})
