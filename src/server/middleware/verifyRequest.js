const { isValidRequestToken } = require('../utils')

require('dotenv').config()

module.exports = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return next()
  }

  const isValidRequest = (currentToken) => {
    return isValidRequestToken(currentToken)
  }

  const requestToken = req.headers['request-token']

  if (!requestToken || !isValidRequest(requestToken)) {
    const error = new Error('Not authorized.')
    error.status = 401
    return next(error)
  }

  next()
}
