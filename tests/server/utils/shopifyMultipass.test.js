const shopifyMultipass = require('../../../src/server/utils/shopifyMultipass')
const SHOPIFY_MULTIPASS_SECRET = 'aa200a3fb0c17740eb76e5ca916756ff'

describe('Shopify Multipass', () => {
  const encrypt = shopifyMultipass(SHOPIFY_MULTIPASS_SECRET)
  it('Generates token', () => {
    const token = encrypt.generateToken({
      email: 'test@test.com',
      created_at: new Date().toISOString()
    })

    expect(token).toBeDefined()
  })

  it('Generates urls', () => {
    const url = encrypt.url('sunriseintegration.myshopify.com', {
      email: 'test@test.com',
      created_at: new Date().toISOString()
    })

    expect(url).toBeDefined()
  })
})
