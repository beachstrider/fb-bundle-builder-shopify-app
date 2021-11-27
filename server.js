const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const fs = require('fs')
const express = require('express')
const verifyHmac = require('./src/server/middleware/verifyHmac')
const { replaceString, shopifyMultipass } = require('./src/server/utils')
const cors = require('cors')
const app = express()
const SERVER_PORT = 3000

const cachedVersion = Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')

app.get('/bundle.js', (req, res) => {
  res.sendFile('./public/bundle.js', { root: __dirname })
})

app.get('/public/index.html', (req, res) => {
  res.status(403).send({
    message: 'Access Forbidden'
  })
})

// Sign-in into Shopify multipass
app.post('/shopify/multipass-url', (req, res) => {
  if (!req.query.shop) {
    return res.status(400).send({
      message: 'Can not find shop'
    })
  }

  const { email, created_at, return_to } = req.body

  const multipass = shopifyMultipass(process.env.SHOPIFY_MULTIPASS_SECRET)
  const url = multipass.url(req.query.shop, {
    email,
    created_at,
    return_to
  })

  res.status(200).send({
    url: url
  })
})

app.get('/', verifyHmac, (req, res) => {
  fs.readFile(
    path.join(__dirname, 'public/proxy.liquid'),
    'utf8',
    (err, data) => {
      if (err) {
        return res.status(404).send()
      }

      const formattedData = replaceString(data, [
        {
          search: 'APP_BUNDLE_URL',
          replacement: `${process.env.PROXY_APP_URL}/bundle.js?version=${cachedVersion}`
        },
        {
          search: 'PAGE_TITLE',
          replacement: process.env.PAGE_TITLE
        },
        {
          search: 'PAGE_DESCRIPTION',
          replacement: process.env.PAGE_TITLE
        },
        {
          search: 'SHOPIFY_BUNDLES_COLLECTION',
          replacement: process.env.SHOPIFY_BUNDLES_COLLECTION
        },
        {
          search: 'SHOPIFY_PRODUCTS_COLLECTION',
          replacement: process.env.SHOPIFY_PRODUCTS_COLLECTION
        }
      ])

      res
        .header({
          'Content-Type': 'application/liquid'
        })
        .header({
          'Strict-Transport-Security':
            'max-age=63072000; includeSubDomains; preload'
        })
        .send(formattedData)
    }
  )
})

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`)
})
