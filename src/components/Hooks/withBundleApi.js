import { request } from '../../utils'

const getContents = async (token, bundleId, configurationId, queryString) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundleId}/configurations/${configurationId}/contents?${queryString}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

const getContent = async (token, bundleId, configurationId, contentId) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundleId}/configurations/${configurationId}/contents/${contentId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

const getBundle = async (token, id) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/${id}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

const getBundleConfiguration = async (token, bundleId, configurationId) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundleId}/configurations/${configurationId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

const getBundleByPlatformId = async (token, productPlatformId) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles-query?platform_product_id=${productPlatformId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

const saveCart = async (
  token,
  platformCustomerId,
  platformCartToken,
  bundleId,
  deliveryDay,
  subscriptionType,
  subscriptionSubType,
  items
) => {
  try {
    return await request(`${process.env.PROXY_APP_URL}/bundle-api/carts`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: {
        platform_customer_id: platformCustomerId,
        platform_cart_token: platformCartToken,
        subscription_type: subscriptionType,
        subscription_sub_type: subscriptionSubType,
        bundle_id: bundleId,
        delivery_day: deliveryDay,
        contents: [...items]
      }
    })
  } catch (error) {
    return error
  }
}

const saveBundle = async (token, id) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/${id}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

const updateBundle = async (token, id) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/${id}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

const getSubscriptionOrder = async (token, orderId) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/subscriptions/${orderId}/orders`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
  } catch (error) {
    return error
  }
}

export {
  getContents,
  getBundle,
  getBundleConfiguration,
  getBundleByPlatformId,
  getContent,
  getSubscriptionOrder,
  saveCart,
  saveBundle,
  updateBundle
}
