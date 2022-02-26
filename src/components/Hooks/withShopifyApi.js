import { request } from '../../utils'

const getShopifyCustomerByEmail = async (requestToken, email) => {
  try {
    return await request(
      `${process.env.PROXY_APP_URL}/shopify/customers/email`,
      {
        method: 'post',
        headers: {
          'request-token': requestToken,
          'Content-Type': 'application/json'
        },
        data: {
          email: email,
          shop: shopDomain
        }
      }
    )
  } catch (error) {
    return error
  }
}

export { getShopifyCustomerByEmail }
