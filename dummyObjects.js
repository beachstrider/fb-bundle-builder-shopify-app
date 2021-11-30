const bundleConfig = {
    "data": {
        "id": 1,
        "bundle_configuration_id": 1,
        "is_enabled": 1,
        "display_after": "2021-10-12T00:00:00.000Z",
        "display_before": "2021-10-12T00:00:00.000Z",
        "deliver_after": "2021-10-12T00:00:00.000Z",
        "deliver_before": "2021-10-12T00:00:00.000Z",
        "createdAt": "2021-11-25T01:34:47.000Z",
        "updatedAt": "2021-11-25T01:34:47.000Z",
        "bundleConfigurationId": 1,
        "configuration": {
            "id": 1,
            "bundle_id": 1,
            "title": "Intelligent Granite Bike",
            "quantity": 1,
            "createdAt": "2021-11-25T01:34:47.000Z",
            "updatedAt": "2021-11-25T01:34:47.000Z",
            "bundleId": 1
        },
        "products": [
            {
                "id": 1,
                "bundle_configuration_contents_id": 1,
                "product_id": null,
                "platform_product_id": "610686586962",
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            {
                "id": 2,
                "bundle_configuration_contents_id": 1,
                "product_id": null,
                "platform_product_id": "194983732783",
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            {
                "id": 3,
                "bundle_configuration_contents_id": 1,
                "product_id": null,
                "platform_product_id": "506674155592",
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            {
                "id": 4,
                "bundle_configuration_contents_id": 1,
                "product_id": null,
                "platform_product_id": "472465312936",
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            {
                "id": 5,
                "bundle_configuration_contents_id": 1,
                "product_id": null,
                "platform_product_id": "795051277304",
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            }
        ]
    }
  }
  
  const subscriptionFromDB = {
    "data": [
        {
            "id": 1,
            "customer_id": 1,
            "bundle_id": 3,
            "platform_subscription_id": 953490813366,
            "delivery_day": 6,
            "subscription_type": null,
            "subscription_sub_type": null,
            "is_active": null,
            "createdAt": "2021-11-25T01:34:47.000Z",
            "updatedAt": "2021-11-25T01:34:47.000Z",
            "customer": {
                "id": 1,
                "account_id": 1,
                "email": "justin@sunriseintegration.com",
                "platform_customer_id": 5410281652409,
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            "orders": [
                {
                    "id": 1,
                    "customer_subscription_id": 1,
                    "bundle_configuration_content_id": 1,
                    "platform_order_id": 4118949462201,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 2,
                    "customer_subscription_id": 1,
                    "bundle_configuration_content_id": 2,
                    "platform_order_id": null,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 2,
                    "customer_subscription_id": 1,
                    "bundle_configuration_content_id": 3,
                    "platform_order_id": null,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                }
            ]
        },
        {
            "id": 2,
            "customer_id": 1,
            "bundle_id": 3,
            "platform_subscription_id": 953490813366,
            "delivery_day": 5,
            "subscription_type": null,
            "subscription_sub_type": null,
            "is_active": null,
            "createdAt": "2021-11-25T01:34:47.000Z",
            "updatedAt": "2021-11-25T01:34:47.000Z",
            "customer": {
                "id": 1,
                "account_id": 1,
                "email": "justin@sunriseintegration.com",
                "platform_customer_id": 5410281652409,
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            "orders": [
                {
                    "id": 1,
                    "customer_subscription_id": 1,
                    "bundle_configuration_content_id": 1,
                    "platform_order_id": 4115445350585,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 2,
                    "customer_subscription_id": 1,
                    "bundle_configuration_content_id": 2,
                    "platform_order_id": null,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 2,
                    "customer_subscription_id": 1,
                    "bundle_configuration_content_id": 3,
                    "platform_order_id": null,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                }
            ]
        }
    ],
    "pagination": {
        "total": 2,
        "currentPage": 1,
        "lastPage": 1,
        "pageSize": 50
    }
  }
  


const subscriptionOrders = {
    "data": [
        {
            "id": 34,
            "customer_subscription_id": 160,
            "bundle_configuration_content_id": 160,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-29T17:52:52.000Z",
            "updatedAt": "2021-11-29T17:52:52.000Z",
            "subscription": {
                "id": 160,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-29T17:52:52.000Z",
                "updatedAt": "2021-11-29T17:52:52.000Z"
            },
            "items": [
                {
                    "id": 117,
                    "customer_subscription_bundle_content_id": 34,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 118,
                    "customer_subscription_bundle_content_id": 34,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 119,
                    "customer_subscription_bundle_content_id": 34,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 120,
                    "customer_subscription_bundle_content_id": 34,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 121,
                    "customer_subscription_bundle_content_id": 34,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 122,
                    "customer_subscription_bundle_content_id": 34,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                }
            ]
        },
        {
            "id": 33,
            "customer_subscription_id": 159,
            "bundle_configuration_content_id": 159,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-29T17:52:52.000Z",
            "updatedAt": "2021-11-29T17:52:52.000Z",
            "subscription": {
                "id": 159,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-29T17:52:52.000Z",
                "updatedAt": "2021-11-29T17:52:52.000Z"
            },
            "items": [
                {
                    "id": 111,
                    "customer_subscription_bundle_content_id": 33,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 112,
                    "customer_subscription_bundle_content_id": 33,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 113,
                    "customer_subscription_bundle_content_id": 33,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 114,
                    "customer_subscription_bundle_content_id": 33,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 115,
                    "customer_subscription_bundle_content_id": 33,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 116,
                    "customer_subscription_bundle_content_id": 33,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                }
            ]
        },
        {
            "id": 32,
            "customer_subscription_id": 158,
            "bundle_configuration_content_id": 158,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-29T17:52:52.000Z",
            "updatedAt": "2021-11-29T17:52:52.000Z",
            "subscription": {
                "id": 158,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-29T17:52:52.000Z",
                "updatedAt": "2021-11-29T17:52:52.000Z"
            },
            "items": [
                {
                    "id": 105,
                    "customer_subscription_bundle_content_id": 32,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 106,
                    "customer_subscription_bundle_content_id": 32,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 107,
                    "customer_subscription_bundle_content_id": 32,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 108,
                    "customer_subscription_bundle_content_id": 32,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 109,
                    "customer_subscription_bundle_content_id": 32,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 110,
                    "customer_subscription_bundle_content_id": 32,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                }
            ]
        },
        {
            "id": 31,
            "customer_subscription_id": 157,
            "bundle_configuration_content_id": 157,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-29T17:52:52.000Z",
            "updatedAt": "2021-11-29T17:52:52.000Z",
            "subscription": {
                "id": 157,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-29T17:52:52.000Z",
                "updatedAt": "2021-11-29T17:52:52.000Z"
            },
            "items": [
                {
                    "id": 99,
                    "customer_subscription_bundle_content_id": 31,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 100,
                    "customer_subscription_bundle_content_id": 31,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 101,
                    "customer_subscription_bundle_content_id": 31,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 102,
                    "customer_subscription_bundle_content_id": 31,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 103,
                    "customer_subscription_bundle_content_id": 31,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 104,
                    "customer_subscription_bundle_content_id": 31,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                }
            ]
        },
        {
            "id": 30,
            "customer_subscription_id": 156,
            "bundle_configuration_content_id": 156,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-29T17:52:52.000Z",
            "updatedAt": "2021-11-29T17:52:52.000Z",
            "subscription": {
                "id": 156,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-29T17:52:52.000Z",
                "updatedAt": "2021-11-29T17:52:52.000Z"
            },
            "items": [
                {
                    "id": 93,
                    "customer_subscription_bundle_content_id": 30,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 94,
                    "customer_subscription_bundle_content_id": 30,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 95,
                    "customer_subscription_bundle_content_id": 30,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 96,
                    "customer_subscription_bundle_content_id": 30,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 97,
                    "customer_subscription_bundle_content_id": 30,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                },
                {
                    "id": 98,
                    "customer_subscription_bundle_content_id": 30,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 1,
                    "createdAt": "2021-11-29T17:52:52.000Z",
                    "updatedAt": "2021-11-29T17:52:52.000Z"
                }
            ]
        },
        {
            "id": 29,
            "customer_subscription_id": 155,
            "bundle_configuration_content_id": 155,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 155,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": [
                {
                    "id": 87,
                    "customer_subscription_bundle_content_id": 29,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 88,
                    "customer_subscription_bundle_content_id": 29,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 89,
                    "customer_subscription_bundle_content_id": 29,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 90,
                    "customer_subscription_bundle_content_id": 29,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 91,
                    "customer_subscription_bundle_content_id": 29,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 2,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 92,
                    "customer_subscription_bundle_content_id": 29,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                }
            ]
        },
        {
            "id": 28,
            "customer_subscription_id": 154,
            "bundle_configuration_content_id": 154,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 154,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": [
                {
                    "id": 81,
                    "customer_subscription_bundle_content_id": 28,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 82,
                    "customer_subscription_bundle_content_id": 28,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 83,
                    "customer_subscription_bundle_content_id": 28,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 84,
                    "customer_subscription_bundle_content_id": 28,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 2,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 85,
                    "customer_subscription_bundle_content_id": 28,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                },
                {
                    "id": 86,
                    "customer_subscription_bundle_content_id": 28,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-27T01:55:46.000Z",
                    "updatedAt": "2021-11-27T01:55:46.000Z"
                }
            ]
        },
        {
            "id": 27,
            "customer_subscription_id": 153,
            "bundle_configuration_content_id": 153,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 153,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": []
        },
        {
            "id": 26,
            "customer_subscription_id": 152,
            "bundle_configuration_content_id": 152,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 152,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": []
        },
        {
            "id": 25,
            "customer_subscription_id": 151,
            "bundle_configuration_content_id": 151,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 151,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": []
        },
        {
            "id": 24,
            "customer_subscription_id": null,
            "bundle_configuration_content_id": null,
            "platform_order_id": null,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": null,
            "items": []
        },
        {
            "id": 23,
            "customer_subscription_id": null,
            "bundle_configuration_content_id": null,
            "platform_order_id": null,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": null,
            "items": []
        },
        {
            "id": 22,
            "customer_subscription_id": null,
            "bundle_configuration_content_id": null,
            "platform_order_id": null,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": null,
            "items": []
        },
        {
            "id": 21,
            "customer_subscription_id": null,
            "bundle_configuration_content_id": null,
            "platform_order_id": null,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": null,
            "items": []
        },
        {
            "id": 20,
            "customer_subscription_id": null,
            "bundle_configuration_content_id": null,
            "platform_order_id": null,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": null,
            "items": []
        },
        {
            "id": 19,
            "customer_subscription_id": null,
            "bundle_configuration_content_id": null,
            "platform_order_id": null,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": null,
            "items": []
        },
        {
            "id": 18,
            "customer_subscription_id": 150,
            "bundle_configuration_content_id": 150,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 150,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": []
        },
        {
            "id": 17,
            "customer_subscription_id": 149,
            "bundle_configuration_content_id": 149,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 149,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": []
        },
        {
            "id": 16,
            "customer_subscription_id": 148,
            "bundle_configuration_content_id": 148,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 148,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": []
        },
        {
            "id": 15,
            "customer_subscription_id": 147,
            "bundle_configuration_content_id": 147,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:55:46.000Z",
            "updatedAt": "2021-11-27T01:55:46.000Z",
            "subscription": {
                "id": 147,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:55:46.000Z",
                "updatedAt": "2021-11-27T01:55:46.000Z"
            },
            "items": []
        },
        {
            "id": 14,
            "customer_subscription_id": 146,
            "bundle_configuration_content_id": 146,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:53:34.000Z",
            "updatedAt": "2021-11-27T01:53:34.000Z",
            "subscription": {
                "id": 146,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:53:34.000Z",
                "updatedAt": "2021-11-27T01:53:34.000Z"
            },
            "items": []
        },
        {
            "id": 13,
            "customer_subscription_id": 145,
            "bundle_configuration_content_id": 145,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:52:34.000Z",
            "updatedAt": "2021-11-27T01:52:34.000Z",
            "subscription": {
                "id": 145,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:52:34.000Z",
                "updatedAt": "2021-11-27T01:52:34.000Z"
            },
            "items": []
        },
        {
            "id": 12,
            "customer_subscription_id": 144,
            "bundle_configuration_content_id": 144,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:48:39.000Z",
            "updatedAt": "2021-11-27T01:48:39.000Z",
            "subscription": {
                "id": 144,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:48:39.000Z",
                "updatedAt": "2021-11-27T01:48:39.000Z"
            },
            "items": []
        },
        {
            "id": 11,
            "customer_subscription_id": 143,
            "bundle_configuration_content_id": 143,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:48:39.000Z",
            "updatedAt": "2021-11-27T01:48:39.000Z",
            "subscription": {
                "id": 143,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:48:39.000Z",
                "updatedAt": "2021-11-27T01:48:39.000Z"
            },
            "items": []
        },
        {
            "id": 10,
            "customer_subscription_id": 142,
            "bundle_configuration_content_id": 142,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:43:29.000Z",
            "updatedAt": "2021-11-27T01:43:29.000Z",
            "subscription": {
                "id": 142,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:43:29.000Z",
                "updatedAt": "2021-11-27T01:43:29.000Z"
            },
            "items": []
        },
        {
            "id": 9,
            "customer_subscription_id": 141,
            "bundle_configuration_content_id": 141,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:42:56.000Z",
            "updatedAt": "2021-11-27T01:42:56.000Z",
            "subscription": {
                "id": 141,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:42:56.000Z",
                "updatedAt": "2021-11-27T01:42:56.000Z"
            },
            "items": []
        },
        {
            "id": 8,
            "customer_subscription_id": 140,
            "bundle_configuration_content_id": 140,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:42:10.000Z",
            "updatedAt": "2021-11-27T01:42:10.000Z",
            "subscription": {
                "id": 140,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:42:10.000Z",
                "updatedAt": "2021-11-27T01:42:10.000Z"
            },
            "items": []
        },
        {
            "id": 7,
            "customer_subscription_id": 139,
            "bundle_configuration_content_id": 139,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:34:08.000Z",
            "updatedAt": "2021-11-27T01:34:08.000Z",
            "subscription": {
                "id": 139,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:34:08.000Z",
                "updatedAt": "2021-11-27T01:34:08.000Z"
            },
            "items": []
        },
        {
            "id": 6,
            "customer_subscription_id": 138,
            "bundle_configuration_content_id": 138,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-27T01:34:08.000Z",
            "updatedAt": "2021-11-27T01:34:08.000Z",
            "subscription": {
                "id": 138,
                "customer_id": 1,
                "bundle_id": 1,
                "platform_subscription_id": 1314,
                "delivery_day": 3,
                "subscription_type": "keto-3-day",
                "subscription_sub_type": "regular",
                "is_active": 1,
                "createdAt": "2021-11-27T01:34:08.000Z",
                "updatedAt": "2021-11-27T01:34:08.000Z"
            },
            "items": []
        },
        {
            "id": 2,
            "customer_subscription_id": 1,
            "bundle_configuration_content_id": 2,
            "platform_order_id": 4115445350585,
            "createdAt": "2021-11-25T01:34:47.000Z",
            "updatedAt": "2021-11-25T01:34:47.000Z",
            "subscription": {
                "id": 1,
                "customer_id": 1,
                "bundle_id": 3,
                "platform_subscription_id": 953490813366,
                "delivery_day": 6,
                "subscription_type": null,
                "subscription_sub_type": null,
                "is_active": null,
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            "items": [
                {
                    "id": 25,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 26,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 27,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 28,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 29,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 2,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 30,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                }
            ]
        },
        {
            "id": 1,
            "customer_subscription_id": 1,
            "bundle_configuration_content_id": 1,
            "platform_order_id": 4118949462201,
            "createdAt": "2021-11-25T01:34:47.000Z",
            "updatedAt": "2021-11-25T01:34:47.000Z",
            "subscription": {
                "id": 1,
                "customer_id": 1,
                "bundle_id": 3,
                "platform_subscription_id": 953490813366,
                "delivery_day": 6,
                "subscription_type": null,
                "subscription_sub_type": null,
                "is_active": null,
                "createdAt": "2021-11-25T01:34:47.000Z",
                "updatedAt": "2021-11-25T01:34:47.000Z"
            },
            "items": [
                {
                    "id": 25,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41375600771257,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 26,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41432952766649,
                    "quantity": 2,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 27,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176643769,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 28,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41213176545465,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 29,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 41479168196793,
                    "quantity": 2,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                },
                {
                    "id": 30,
                    "customer_subscription_bundle_content_id": 1,
                    "product_variant_id": 2,
                    "platform_product_variant_id": 40812018729145,
                    "quantity": 1,
                    "createdAt": "2021-11-25T01:34:47.000Z",
                    "updatedAt": "2021-11-25T01:34:47.000Z"
                }
            ]
        }
    ],
    "pagination": {
        "total": 31,
        "currentPage": 1,
        "lastPage": 1,
        "pageSize": 50
    }
}

export {
    bundleConfig,
    subscriptionFromDB,
    subscriptionOrders
}