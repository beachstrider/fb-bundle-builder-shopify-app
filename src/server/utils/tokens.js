const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

// in seconds
const EXPIRATION_TIME = process.env.REQUEST_TOKEN_SECRET_DURATION || '3600s'
const REQUEST_TOKEN_SECRET =
  process.env.REQUEST_TOKEN_SECRET || crypto.randomBytes(64).toString('hex')

const generateRequestToken = (value) => {
  return jwt.sign({ key: value }, REQUEST_TOKEN_SECRET, {
    expiresIn: EXPIRATION_TIME
  })
}

const isValidRequestToken = (token) => {
  return jwt.verify(token, REQUEST_TOKEN_SECRET, (error, validValue) => {
    if (error) {
      return false
    }

    return !error
  })
}

module.exports = { generateRequestToken, isValidRequestToken }
