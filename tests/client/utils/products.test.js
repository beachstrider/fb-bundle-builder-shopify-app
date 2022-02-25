import { filterShopifyProducts } from '../../../src/utils/products'

describe('Test products utility functions', () => {
  it('Filters Shopify variants by names', async () => {
    const filteredProducts = [
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
            name: 'Bacon Spinach Tomato Frittata - Keto / Regular',
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
            ]
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
            name: 'Bacon Spinach Tomato Frittata ',
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
            ],
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_b0d1f915-0b99-4be8-a677-cdae1f26c7bc.jpg?v=1643653867'
            ],
            configurationBundleId: 164,
            configurationContentId: 3541,
            description:
              '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
            bundleContentId: 819,
            quantity: 0,
            type: 'Breakfasts',
            productPlatformId: 6781001302069
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
          }
        ]
      },
      {
        id: 6715009826869,
        title: 'Colorado Omelette',
        handle: 'colorado-omelette-1',
        description:
          '<p data-mce-fragment="1"><strong><span style="color: #404040;">Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">640</span> | Total Fat</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">49g</span> <span style="color: #404040;">| Net Carbs</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">9g</span> <span style="color: #404040;">| Protein</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">46g</span> </strong></p>\n<p data-mce-fragment="1">Ingredients: Turkey Breast, Johnsonville Andouille Sausage, Lemon Zest Vinaigrette KT (Olive Oil, Lemon Juice, Apple Cider Vinegar, Water, Erythritol, monk fruit extract, Garlic, Spice, Lemon Zest), Kale, Red Onions, Green Beans, Fennel, MCT Oil, Arugula, Parmesan (Milk, Cheese Cultures, Salt, Enzymes), Almonds</p>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>',
        published_at: '2021-11-18T14:00:36-08:00',
        created_at: '2021-11-18T14:00:36-08:00',
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
            id: 40171861803061,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: {
              id: 30558236901429,
              product_id: 6715009826869,
              position: 1,
              created_at: '2021-11-29T15:10:21-08:00',
              updated_at: '2021-11-29T15:10:22-08:00',
              alt: null,
              width: 722,
              height: 440,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
              variant_ids: [
                40171861803061, 40171861835829, 40171861868597, 40171861901365,
                40171861934133, 40171861966901
              ]
            },
            available: true,
            name: 'Colorado Omelette - Keto / Regular',
            public_title: 'Keto / Regular',
            options: ['Keto', 'Regular'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            featured_media: {
              alt: null,
              id: 22855769980981,
              position: 1,
              preview_image: {
                aspect_ratio: 1.641,
                height: 440,
                width: 722,
                src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
              }
            },
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
                value: '6 oz'
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
            id: 40171861835829,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: {
              id: 30558236901429,
              product_id: 6715009826869,
              position: 1,
              created_at: '2021-11-29T15:10:21-08:00',
              updated_at: '2021-11-29T15:10:22-08:00',
              alt: null,
              width: 722,
              height: 440,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
              variant_ids: [
                40171861803061, 40171861835829, 40171861868597, 40171861901365,
                40171861934133, 40171861966901
              ]
            },
            available: true,
            name: 'Colorado Omelette - Keto / Lite',
            public_title: 'Keto / Lite',
            options: ['Keto', 'Lite'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            featured_media: {
              alt: null,
              id: 22855769980981,
              position: 1,
              preview_image: {
                aspect_ratio: 1.641,
                height: 440,
                width: 722,
                src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
              }
            },
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
                value: '6 oz'
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
            id: 40171861868597,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: {
              id: 30558236901429,
              product_id: 6715009826869,
              position: 1,
              created_at: '2021-11-29T15:10:21-08:00',
              updated_at: '2021-11-29T15:10:22-08:00',
              alt: null,
              width: 722,
              height: 440,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
              variant_ids: [
                40171861803061, 40171861835829, 40171861868597, 40171861901365,
                40171861934133, 40171861966901
              ]
            },
            available: true,
            name: 'Colorado Omelette - Keto / Protein',
            public_title: 'Keto / Protein',
            options: ['Keto', 'Protein'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            featured_media: {
              alt: null,
              id: 22855769980981,
              position: 1,
              preview_image: {
                aspect_ratio: 1.641,
                height: 440,
                width: 722,
                src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
              }
            },
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '8 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '7 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '7 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '6 oz'
              }
            ]
          },
          {
            id: 40171861901365,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: {
              id: 30558236901429,
              product_id: 6715009826869,
              position: 1,
              created_at: '2021-11-29T15:10:21-08:00',
              updated_at: '2021-11-29T15:10:22-08:00',
              alt: null,
              width: 722,
              height: 440,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
              variant_ids: [
                40171861803061, 40171861835829, 40171861868597, 40171861901365,
                40171861934133, 40171861966901
              ]
            },
            available: true,
            name: 'Colorado Omelette ',
            public_title: 'LowCal / Regular',
            options: ['LowCal', 'Regular'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            featured_media: {
              alt: null,
              id: 22855769980981,
              position: 1,
              preview_image: {
                aspect_ratio: 1.641,
                height: 440,
                width: 722,
                src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
              }
            },
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
                value: '4 oz'
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
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description:
              '<p data-mce-fragment="1"><strong><span style="color: #404040;">Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">640</span> | Total Fat</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">49g</span> <span style="color: #404040;">| Net Carbs</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">9g</span> <span style="color: #404040;">| Protein</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">46g</span> </strong></p>\n<p data-mce-fragment="1">Ingredients: Turkey Breast, Johnsonville Andouille Sausage, Lemon Zest Vinaigrette KT (Olive Oil, Lemon Juice, Apple Cider Vinegar, Water, Erythritol, monk fruit extract, Garlic, Spice, Lemon Zest), Kale, Red Onions, Green Beans, Fennel, MCT Oil, Arugula, Parmesan (Milk, Cheese Cultures, Salt, Enzymes), Almonds</p>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
            productPlatformId: 6715009826869
          },
          {
            id: 40171861934133,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: {
              id: 30558236901429,
              product_id: 6715009826869,
              position: 1,
              created_at: '2021-11-29T15:10:21-08:00',
              updated_at: '2021-11-29T15:10:22-08:00',
              alt: null,
              width: 722,
              height: 440,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
              variant_ids: [
                40171861803061, 40171861835829, 40171861868597, 40171861901365,
                40171861934133, 40171861966901
              ]
            },
            available: true,
            name: 'Colorado Omelette - LowCal / Lite',
            public_title: 'LowCal / Lite',
            options: ['LowCal', 'Lite'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            featured_media: {
              alt: null,
              id: 22855769980981,
              position: 1,
              preview_image: {
                aspect_ratio: 1.641,
                height: 440,
                width: 722,
                src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
              }
            },
            requires_selling_plan: false,
            selling_plan_allocations: [],
            metafields: [
              {
                key: 'calories',
                name: 'Calories',
                value: '4 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '6 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '3 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '2 oz'
              }
            ]
          },
          {
            id: 40171861966901,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: {
              id: 30558236901429,
              product_id: 6715009826869,
              position: 1,
              created_at: '2021-11-29T15:10:21-08:00',
              updated_at: '2021-11-29T15:10:22-08:00',
              alt: null,
              width: 722,
              height: 440,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
              variant_ids: [
                40171861803061, 40171861835829, 40171861868597, 40171861901365,
                40171861934133, 40171861966901
              ]
            },
            available: true,
            name: 'Colorado Omelette - LowCal / Savory',
            public_title: 'LowCal / Savory',
            options: ['LowCal', 'Savory'],
            price: 3400,
            weight: 0,
            compare_at_price: null,
            inventory_management: 'shopify',
            barcode: '',
            featured_media: {
              alt: null,
              id: 22855769980981,
              position: 1,
              preview_image: {
                aspect_ratio: 1.641,
                height: 440,
                width: 722,
                src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
              }
            },
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
                value: '8 oz'
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
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22855769980981,
            position: 1,
            preview_image: {
              aspect_ratio: 1.641,
              height: 440,
              width: 722,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422'
            },
            aspect_ratio: 1.641,
            height: 440,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_574ffa93-104c-4421-9bae-a9ad8dc77a31.png?v=1638227422',
            width: 722
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content:
          '<p data-mce-fragment="1"><strong><span style="color: #404040;">Calories <span style="color: #3dae2b;" data-mce-fragment="1" data-mce-style="color: #3dae2b;">640</span> | Total Fat</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">49g</span> <span style="color: #404040;">| Net Carbs</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">9g</span> <span style="color: #404040;">| Protein</span> <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">46g</span> </strong></p>\n<p data-mce-fragment="1">Ingredients: Turkey Breast, Johnsonville Andouille Sausage, Lemon Zest Vinaigrette KT (Olive Oil, Lemon Juice, Apple Cider Vinegar, Water, Erythritol, monk fruit extract, Garlic, Spice, Lemon Zest), Kale, Red Onions, Green Beans, Fennel, MCT Oil, Arugula, Parmesan (Milk, Cheese Cultures, Salt, Enzymes), Almonds</p>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>\n<style></style>',
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
          }
        ]
      },
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
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_84399634-2403-4cd0-a373-b7d4b9990361.png?v=1638227442'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description: '<p></p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
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
          }
        ]
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
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_6b3aa79d-49bb-4b83-af06-445a6bcba05c.jpg?v=1638227585'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description: '<p></p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
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
          }
        ]
      },
      {
        id: 6715009564725,
        title: 'Caribbean Jerk Chicken',
        handle: 'caribbean-jerk-chicken',
        description: '<p></p>',
        published_at: '2021-11-18T14:00:31-08:00',
        created_at: '2021-11-18T14:00:31-08:00',
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
            id: 40171861049397,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caribbean Jerk Chicken - Keto / Regular',
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
            id: 40171861082165,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caribbean Jerk Chicken - Keto / Lite',
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
            id: 40171861114933,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caribbean Jerk Chicken - Keto / Protein',
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
            id: 40171861147701,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caribbean Jerk Chicken ',
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
                value: '3 oz'
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
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition_c855a72f-f91e-4ac2-b7b9-b77fb9720798.png?v=1638227649'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description: '<p></p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
            productPlatformId: 6715009564725
          },
          {
            id: 40171861180469,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caribbean Jerk Chicken - LowCal / Lite',
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
                value: '3 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '3 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '6 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '4 oz'
              }
            ]
          },
          {
            id: 40171861213237,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caribbean Jerk Chicken - LowCal / Savory',
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
                value: '2 oz'
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
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition_c855a72f-f91e-4ac2-b7b9-b77fb9720798.png?v=1638227649'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition_c855a72f-f91e-4ac2-b7b9-b77fb9720798.png?v=1638227649',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22855775617077,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 736,
              width: 736,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition_c855a72f-f91e-4ac2-b7b9-b77fb9720798.png?v=1638227649'
            },
            aspect_ratio: 1,
            height: 736,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition_c855a72f-f91e-4ac2-b7b9-b77fb9720798.png?v=1638227649',
            width: 736
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
          }
        ]
      },
      {
        id: 6715009466421,
        title: 'Caprese Salad',
        handle: 'caprese-salad',
        description:
          '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
        published_at: '2021-11-18T14:00:30-08:00',
        created_at: '2021-11-18T14:00:30-08:00',
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
            id: 40171860787253,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caprese Salad - Keto / Regular',
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
                value: '8 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '7 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '6 oz'
              }
            ]
          },
          {
            id: 40171860820021,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caprese Salad - Keto / Lite',
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
            ]
          },
          {
            id: 40171860852789,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caprese Salad - Keto / Protein',
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
            ]
          },
          {
            id: 40171860885557,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caprese Salad ',
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
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition.png?v=1638227299'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description:
              '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
            productPlatformId: 6715009466421
          },
          {
            id: 40171860918325,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caprese Salad - LowCal / Lite',
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
            ]
          },
          {
            id: 40171860951093,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Caprese Salad - LowCal / Savory',
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
                value: '8 oz'
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
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition.png?v=1638227299'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition.png?v=1638227299',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22855767326773,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 736,
              width: 736,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition.png?v=1638227299'
            },
            aspect_ratio: 1,
            height: 736,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Nutrition.png?v=1638227299',
            width: 736
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content:
          '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
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
          }
        ]
      },
      {
        id: 6715009400885,
        title: 'Calabrian Pepper Chicken',
        handle: 'calabrian-pepper-chicken',
        description:
          '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
        published_at: '2021-11-18T14:00:28-08:00',
        created_at: '2021-11-18T14:00:28-08:00',
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
            id: 40171860557877,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Calabrian Pepper Chicken - Keto / Regular',
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
                value: '6 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '2 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '3 oz'
              }
            ]
          },
          {
            id: 40171860590645,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Calabrian Pepper Chicken - Keto / Lite',
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
            ]
          },
          {
            id: 40171860623413,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Calabrian Pepper Chicken - Keto / Protein',
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
                value: '8 oz'
              },
              {
                key: 'net_carbs',
                name: 'Net Carbs',
                value: '5 oz'
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '7 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '3 oz'
              }
            ]
          },
          {
            id: 40171860656181,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Calabrian Pepper Chicken ',
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
                value: '7 oz'
              },
              {
                key: 'total_fat',
                name: 'Total Fat',
                value: '6 oz'
              }
            ],
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/ScreenShot2022-02-17at2.47.22PM.png?v=1645138082'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description:
              '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
            productPlatformId: 6715009400885
          },
          {
            id: 40171860688949,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Calabrian Pepper Chicken - LowCal / Lite',
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
            ]
          },
          {
            id: 40171860721717,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Calabrian Pepper Chicken - LowCal / Savory',
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
                value: '7 oz'
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
            ]
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/ScreenShot2022-02-17at2.47.22PM.png?v=1645138082'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/ScreenShot2022-02-17at2.47.22PM.png?v=1645138082',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 23376256172085,
            position: 1,
            preview_image: {
              aspect_ratio: 1.003,
              height: 2048,
              width: 2054,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/ScreenShot2022-02-17at2.47.22PM.png?v=1645138082'
            },
            aspect_ratio: 1.003,
            height: 2048,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/ScreenShot2022-02-17at2.47.22PM.png?v=1645138082',
            width: 2054
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content:
          '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
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
          }
        ]
      },
      {
        id: 6715009368117,
        title: 'Buffalo Ranch Chicken',
        handle: 'buffalo-ranch-chicken',
        description: '<p></p>',
        published_at: '2021-11-18T14:00:27-08:00',
        created_at: '2021-11-18T14:00:27-08:00',
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
            id: 40171860361269,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Buffalo Ranch Chicken - Keto / Regular',
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
            ]
          },
          {
            id: 40171860394037,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Buffalo Ranch Chicken - Keto / Lite',
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
            ]
          },
          {
            id: 40171860426805,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Buffalo Ranch Chicken - Keto / Protein',
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
            ]
          },
          {
            id: 40171860459573,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Buffalo Ranch Chicken ',
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
                value: '8 oz'
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
                value: '2 oz'
              }
            ],
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_6c1fdc4c-b412-4e33-bca9-dec68b78adcc.png?v=1638227131'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description: '<p></p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
            productPlatformId: 6715009368117
          },
          {
            id: 40171860492341,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Buffalo Ranch Chicken - LowCal / Lite',
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
            ]
          },
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
            name: 'Buffalo Ranch Chicken - LowCal / Savory',
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
                value: '2 oz'
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
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_6c1fdc4c-b412-4e33-bca9-dec68b78adcc.png?v=1638227131'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_6c1fdc4c-b412-4e33-bca9-dec68b78adcc.png?v=1638227131',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22855764312117,
            position: 1,
            preview_image: {
              aspect_ratio: 1.641,
              height: 440,
              width: 722,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_6c1fdc4c-b412-4e33-bca9-dec68b78adcc.png?v=1638227131'
            },
            aspect_ratio: 1.641,
            height: 440,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/lowcal-meal-001_6c1fdc4c-b412-4e33-bca9-dec68b78adcc.png?v=1638227131',
            width: 722
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
          }
        ]
      },
      {
        id: 6715009302581,
        title: 'Blackened Spinach Salmon',
        handle: 'blackened-spinach-salmon',
        description:
          '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
        published_at: '2021-11-18T14:00:26-08:00',
        created_at: '2021-11-18T14:00:26-08:00',
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
            id: 40171860131893,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Blackened Spinach Salmon - Keto / Regular',
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
                value: '10 oz'
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
            id: 40171860164661,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Blackened Spinach Salmon - Keto / Lite',
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
            ]
          },
          {
            id: 40171860197429,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Blackened Spinach Salmon - Keto / Protein',
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
                value: '34 oz'
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
            id: 40171860230197,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Blackened Spinach Salmon ',
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
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_9c983e67-2838-41f7-82eb-1c3e8b13339b.jpg?v=1638227045'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description:
              '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
            productPlatformId: 6715009302581
          },
          {
            id: 40171860262965,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Blackened Spinach Salmon - LowCal / Lite',
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
                value: '56 oz'
              }
            ]
          },
          {
            id: 40171860295733,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Blackened Spinach Salmon - LowCal / Savory',
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
          }
        ],
        images: [
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_9c983e67-2838-41f7-82eb-1c3e8b13339b.jpg?v=1638227045'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_9c983e67-2838-41f7-82eb-1c3e8b13339b.jpg?v=1638227045',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22855763001397,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 1200,
              width: 1200,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_9c983e67-2838-41f7-82eb-1c3e8b13339b.jpg?v=1638227045'
            },
            aspect_ratio: 1,
            height: 1200,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto_9c983e67-2838-41f7-82eb-1c3e8b13339b.jpg?v=1638227045',
            width: 1200
          }
        ],
        requires_selling_plan: false,
        selling_plan_groups: [],
        content:
          '<p data-mce-fragment="1"><strong><span>Calories <span style="color: #3dae2b;" data-mce-style="color: #3dae2b;" data-mce-fragment="1">470</span> | Total Fat</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">39g</span><span> </span><span>| Net Carbs</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">5g</span><span> </span><span>| Protein</span><span> </span><span style="color: #3dae2b;" data-mce-style="color: #3dae2b;">23g</span></strong></p>\n<p data-mce-fragment="1">Ingredients: Egg, Johnsonville Andouille Sausage, Caul Obrien KT (Cauliflower, Onion, Green Peppers, Red Peppers, Avocado Oil, Garlic, Spice, Oregano, Parsley), Parmesan (Milk, Cheese Cultures, Salt, Enzymes)</p>',
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
          }
        ]
      },
      {
        id: 6715009204277,
        title: 'Basil Chimichurri Sirloin',
        handle: 'basil-chimichurri-sirloin',
        description: '<p></p>',
        published_at: '2021-11-18T14:00:25-08:00',
        created_at: '2021-11-18T14:00:25-08:00',
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
            id: 40171859869749,
            title: 'Keto / Regular',
            option1: 'Keto',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Basil Chimichurri Sirloin - Keto / Regular',
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
            ]
          },
          {
            id: 40171859902517,
            title: 'Keto / Lite',
            option1: 'Keto',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Basil Chimichurri Sirloin - Keto / Lite',
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
            id: 40171859935285,
            title: 'Keto / Protein',
            option1: 'Keto',
            option2: 'Protein',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Basil Chimichurri Sirloin - Keto / Protein',
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
            id: 40171859968053,
            title: 'LowCal / Regular',
            option1: 'LowCal',
            option2: 'Regular',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Basil Chimichurri Sirloin ',
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
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Taste.png?v=1637801289'
            ],
            configurationBundleId: 164,
            configurationContentId: 3540,
            description: '<p></p>',
            bundleContentId: 818,
            quantity: 0,
            type: 'Meals',
            productPlatformId: 6715009204277
          },
          {
            id: 40171860000821,
            title: 'LowCal / Lite',
            option1: 'LowCal',
            option2: 'Lite',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Basil Chimichurri Sirloin - LowCal / Lite',
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
            id: 40171860033589,
            title: 'LowCal / Savory',
            option1: 'LowCal',
            option2: 'Savory',
            option3: null,
            sku: '',
            requires_shipping: true,
            taxable: true,
            featured_image: null,
            available: true,
            name: 'Basil Chimichurri Sirloin - LowCal / Savory',
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
                value: ''
              },
              {
                key: 'protein',
                name: 'Protein',
                value: '7 oz'
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
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Taste.png?v=1637801289'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Taste.png?v=1637801289',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 22826046914613,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 540,
              width: 540,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Taste.png?v=1637801289'
            },
            aspect_ratio: 1,
            height: 540,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/Taste.png?v=1637801289',
            width: 540
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
          }
        ]
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
            name: 'Bacon Ranch Chicken - Keto / Regular',
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
            ]
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
          }
        ]
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
            name: 'Asian Slaw Salad - Keto / Regular',
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
            ]
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
            name: 'Asian Slaw Salad ',
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
            ],
            productMetafields: [
              {
                key: 'fat',
                name: 'Fat',
                value: ''
              },
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
              }
            ],
            images: [
              '//cdn.shopify.com/s/files/1/0267/5825/0549/products/Chipotle-Agave-Chicken_Keto.jpg?v=1637693339'
            ],
            configurationBundleId: 164,
            configurationContentId: 3541,
            description: '<p></p>',
            bundleContentId: 819,
            quantity: 0,
            type: 'Breakfasts',
            productPlatformId: 6715009105973
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
          }
        ]
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
            name: 'Ancho Chili Lime - Keto / Regular',
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
            ]
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
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/aegean_chicken_bowl_K_b5868067-e6eb-4013-8d9f-d7b36768a5d4.jpg?v=1645227805'
        ],
        featured_image:
          '//cdn.shopify.com/s/files/1/0267/5825/0549/products/aegean_chicken_bowl_K_b5868067-e6eb-4013-8d9f-d7b36768a5d4.jpg?v=1645227805',
        options: ['Type', 'Subtype'],
        media: [
          {
            alt: null,
            id: 23387509293109,
            position: 1,
            preview_image: {
              aspect_ratio: 1,
              height: 782,
              width: 782,
              src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/aegean_chicken_bowl_K_b5868067-e6eb-4013-8d9f-d7b36768a5d4.jpg?v=1645227805'
            },
            aspect_ratio: 1,
            height: 782,
            media_type: 'image',
            src: 'https://cdn.shopify.com/s/files/1/0267/5825/0549/products/aegean_chicken_bowl_K_b5868067-e6eb-4013-8d9f-d7b36768a5d4.jpg?v=1645227805',
            width: 782
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
            value: ''
          },
          {
            key: 'fat',
            name: 'Fat',
            value: ''
          },
          {
            key: 'contains',
            name: 'Contains',
            value: 'Wheat, Milk'
          },
          {
            key: 'ingredients',
            name: 'Ingredients',
            value:
              'Bulgur Wheat, Sauce (Water, Half And Half [Milk, Cream], Parmesan Cheese\n[Pasteurized Skim Milk, Cultures, Salt, Enzymes], Cheddar Cheese [Pasteurized Milk,\nCultures, Salt, Enzymes], Olive Oil, Butter, Sugar, Xanthan Gum, Spice), Lentils,\nCorn, Green Beans, Red Beans, Potatoes.'
          },
          {
            key: 'subtitle',
            name: 'Subtitle',
            value:
              'Delicious Tri-Tip Steak Seasoned With Pink Peppercorn And Served With Roasted Red Potatoes'
          }
        ]
      }
    ]
    const shopProducts = [
      {
        id: 82,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009400885',
        is_default: 1,
        default_quantity: 2,
        createdAt: '2022-02-15T19:07:05.000Z',
        updatedAt: '2022-02-15T19:07:05.000Z'
      },
      {
        id: 83,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009466421',
        is_default: 1,
        default_quantity: 2,
        createdAt: '2022-02-15T19:07:05.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      },
      {
        id: 122,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009204277',
        is_default: 1,
        default_quantity: 2,
        createdAt: '2022-02-23T18:13:03.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      },
      {
        id: 123,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009302581',
        is_default: 1,
        default_quantity: 2,
        createdAt: '2022-02-23T18:13:03.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      },
      {
        id: 124,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009564725',
        is_default: 1,
        default_quantity: 1,
        createdAt: '2022-02-23T18:13:03.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      },
      {
        id: 125,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009663029',
        is_default: 1,
        default_quantity: 1,
        createdAt: '2022-02-23T18:13:03.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      },
      {
        id: 126,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009826869',
        is_default: 1,
        default_quantity: 2,
        createdAt: '2022-02-23T18:13:03.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      },
      {
        id: 127,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009368117',
        is_default: 1,
        default_quantity: 1,
        createdAt: '2022-02-23T18:13:03.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      },
      {
        id: 128,
        bundle_configuration_contents_id: 3540,
        product_id: null,
        platform_product_id: '6715009695797',
        is_default: 1,
        default_quantity: 1,
        createdAt: '2022-02-23T18:13:03.000Z',
        updatedAt: '2022-02-23T18:13:03.000Z'
      }
    ]

    const filteredValues = await filterShopifyProducts(
      shopProducts,
      filteredProducts
    )

    expect(filteredValues[0].title).toBe('Colorado Omelette')
    expect(filteredValues[0].options.length).toBe(2)
    expect(filteredValues[1].metafields.length).toBe(6)
  })
})
