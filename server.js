const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const fs = require('fs')
const express = require('express')
const verifyHmac = require('./src/server/middleware/verifyHmac')
const app = express()

const SERVER_PORT = 3000

app.get('/bundle.js', (req, res) => {
  res.sendFile('./public/bundle.js', { root: __dirname })
})

app.use(express.static('./public/images'))

app.get('/', verifyHmac, (req, res) => {
  const cachedVersion = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)

  fs.readFile(
    path.join(__dirname, 'public/proxy.liquid'),
    'utf8',
    (err, data) => {
      if (err) {
        return res.status(404).send()
      }

      const formattedData = data.replace(
        /APP_BUNDLE_URL/g,
        `${process.env.PROXY_APP_URL}/bundle.js?version=${cachedVersion}`
      )

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

// Enables access to the app without Shopify HMAC validation
if (process.env.NODE_ENV === 'development') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
  })
}

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`)
})
