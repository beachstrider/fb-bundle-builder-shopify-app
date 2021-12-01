const app = require('express').Router()
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const { request } = require('../utils')

app.post('/bundle-api/token/guest', async (req, res) => {
  const response = await request(`${process.env.BUNDLE_API_URL}/api/auth`, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      authorization: `Bearer ${process.env.BUNDLE_API_SECRET}`
    },
    data: {
      shop: req.body.shop
    }
  })

  return res.status(response.status).send(response.data)
})

app.get(
  '/bundle-api/bundles/:bundleId/configurations/:configurationId/contents',
  async (req, res) => {
    const queryString = Object.keys(req.query)
      .map((key) => key + '=' + req.query[key])
      .join('&')

    // TODO: work in progress
    const response = await request(
      `${process.env.BUNDLE_API_URL}/api/bundles/76/configurations/811/contents?${queryString}`,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          authorization: req.headers.authorization
        },
        data: {
          shop: req.body.shop
        }
      }
    )

    return res.status(response.status).send(response.data)
  }
)

app.get('/bundle-api/bundles', async (req, res) => {
  const queryString = Object.keys(req.query)
    .map((key) => key + '=' + req.query[key])
    .join('&')

  const response = await request(
    `${process.env.BUNDLE_API_URL}/api/bundles?${queryString}`,
    {
      method: 'get',
      headers: {
        Accept: 'application/json',
        authorization: req.headers.authorization
      }
    }
  )

  return res.status(response.status).send(response.data)
})

module.exports = app
