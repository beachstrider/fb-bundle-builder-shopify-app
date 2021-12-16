const app = require('express').Router()
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const { request, objectToQueryString } = require('../utils')

app.get(
  '/recharge/customer',
  async (req, res) => {
    const response = await request(
      `https://api.rechargeapps.com/customers?email=${req.query.email}`,
      {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'X-Recharge-Access-Token': process.env.RECHARGE_API_TOKEN
        }
      }
    )

    return res.status(response.status).send(response.data)
  }
)

module.exports = app
