const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const fs = require('fs')
const compression = require('compression')
const express = require('express')
const helmet = require('helmet')
const verifyHmac = require('./src/server/middleware/verifyHmac')
const { replaceString } = require('./src/server/utils')
const cors = require('cors')
const morgan = require('morgan')
const bundleApiRouters = require('./src/server/routers/bundleApiRouters')
const shopifyRouters = require('./src/server/routers/shopifyRouters')
const rechargeRouters = require('./src/server/routers/rechargeRouters')

const app = express()
const SERVER_PORT = process.env.PORT || 3000

console.log('shopifyMultipass', process.env.SHOPIFY_MULTIPASS_SECRET)

// Sentry
const Sentry = require('@sentry/node')
const Tracing = require('@sentry/tracing')
Sentry.init({
  environment: process.env.SENTRY_ENVIRONMENT,
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: process.env.SENTRY_SAMPLE_RATE,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app })
  ]
})
// RequestHandler creates a separate execution context using domains, so that every
// transaction/span/breadcrumb is attached to its own Hub instance
app.use(Sentry.Handlers.requestHandler())
// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler())
// The error handler must be before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())
// Optional fallthrough error handler
app.use((err, req, res, next) => {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500
  res.end(res.sentry + '\n')
})
// END Sentry

const morganFormat =
  ':method :url :status auth::req[authorization] res-length::res[content-length] - :response-time ms'
app.use(morgan(morganFormat))

const cachedVersion = Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.disable('x-powered-by')
app.use(helmet())
app.use(compression())

app.use('/images', express.static('images'))

app.get('/bundle.js', (req, res) => {
  res.sendFile('./public/bundle.js', { root: __dirname })
})

app.get('/public/index.html', (req, res) => {
  res.status(403).send({
    message: 'Access Forbidden'
  })
})

app.use(bundleApiRouters)
app.use(shopifyRouters)
app.use(rechargeRouters)

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
