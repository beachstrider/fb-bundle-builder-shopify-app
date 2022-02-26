const app = require('express').Router({ mergeParams: true })
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const { shopifyConnector } = require('../domains/shopify/api')
const verifyRequest = require('../middleware/verifyRequest')
const { shopifyMultipass } = require('../utils')

// Sign-in into Shopify multipass
app.post('/multipass-url', (req, res) => {
  if (!req.query.shop) {
    return res.status(400).send({
      message: 'Can not find shop'
    })
  }

  const { email, created_at, return_to } = req.body

  const shop = process.env.SHOPIFY_MULTIPASS_SHOP || req.query.shop

  const multipass = shopifyMultipass(process.env.SHOPIFY_MULTIPASS_SECRET)
  const url = multipass.url(shop, {
    email,
    created_at,
    return_to
  })

  res.status(200).send({
    url: url
  })
})

app.post('/customers/email', verifyRequest, async (req, res) => {
  const connector = await shopifyConnector(
    process.env.SHOPIFY_PRIVATE_APP_API_SECRET,
    req.body.shop
  )
  const response = await connector.getCustomerByEmail(req.body.email)
  return res.status(response.status).send(response.data)
})

module.exports = app
