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

  return { queryGraphQL, getCustomerByEmail }
}

module.exports = shopifyConnector
