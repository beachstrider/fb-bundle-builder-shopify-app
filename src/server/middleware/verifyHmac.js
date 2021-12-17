require('dotenv').config()
const crypto = require('crypto')

module.exports = async (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return next()
  }
  console.log('hmac call: ', process.env.SHOPIFY_API_SECRET)
  const validateSignature = (query) => {
    if (!query) {
      return false
    }

    const parameters = []
    Object.keys(query).forEach((key) => {
      if (key !== 'signature') {
        parameters.push(key + '=' + query[key])
      }
    })

    const message = parameters.sort().join('')
    const digest = crypto
      .createHmac('sha256', process.env.SHOPIFY_API_SECRET)
      .update(message)
      .digest('hex')

    return crypto.timingSafeEqual(
      Buffer.from(digest),
      Buffer.from(query.signature)
    )
  }

  if (Object.keys(req.query).length === 0 || !validateSignature(req.query)) {
    const error = new Error('Not authorized.')
    error.status = 401
    return next(error)
  }

  next()
}
