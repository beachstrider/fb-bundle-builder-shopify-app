const app = require('express').Router()
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const { shopifyMultipass } = require('../utils')

// Sign-in into Shopify multipass
app.post('/shopify/multipass-url', (req, res) => {
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

module.exports = app
