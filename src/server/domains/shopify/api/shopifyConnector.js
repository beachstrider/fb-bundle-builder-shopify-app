const request = require('../../../utils/request')

const shopifyConnector = async (accessToken, shop) => {
  const queryGraphQL = async (graphqlQuery) => {
    return await request(
      `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/graphql.json`,
      {
        method: 'post',
        headers: {
          'Content-type': 'application/graphql',
          'X-Shopify-Access-Token': accessToken
        },
        data: graphqlQuery
      }
    )
  }

  const getCustomerByEmail = async (email) => {
    const graphqlQuery = `{
      customers(first:1, query:"email:'${email}'") {
        edges {
          node {
            id            
            firstName
            lastName
            email
          }
        }
      }
    }`

    return await queryGraphQL(graphqlQuery)
  }

  const getDiscountCodeInfo = async (discountCode) => {
    const reqUrl = `https://${shop}/admin/api/${process.env.SHOPIFY_API_VERSION}/discount_codes/lookup.json`
    return await request(
      reqUrl,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          'X-Shopify-Access-Token': accessToken
        },
        params: { code: discountCode }
      }
    )
  }

  return { queryGraphQL, getCustomerByEmail, getDiscountCodeInfo }
}

module.exports = shopifyConnector
