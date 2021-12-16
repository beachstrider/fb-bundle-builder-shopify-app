import dayjs from 'dayjs'
import { request } from '../../utils'

const getMenuItems = async (
  token,
  bundleId,
  configurationId,
  queryString = `diplay_after=${dayjs().format('YYYY-MM-DDT00:00:00.000[Z]')}`
) => {
  try {
    console.log('call aaasdlaksjdlakjsdlakjdaksjl')
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

const getBundle = async (token, productId) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles?platform_product_id=${productId}`,
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
        bundle_id: bundleId,
        delivery_day: deliveryDay,
        contents: [...items]
      }
    })
  } catch (error) {
    return error
  }
}

export { getMenuItems, getBundle, saveCart }
