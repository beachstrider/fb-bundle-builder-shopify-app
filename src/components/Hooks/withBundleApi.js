import dayjs from 'dayjs'
import { request } from '../../utils'

const getMenuItems = async (
  token,
  bundleId,
  isoDate = dayjs().format('YYYY-MM-DDT00:00:00.000[Z]')
) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/${bundleId}/configurations/811/contents?is_enabled=1&display_after=${isoDate}`,
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

export { getMenuItems, getBundle }
