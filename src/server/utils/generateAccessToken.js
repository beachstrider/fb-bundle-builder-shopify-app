const jwt = require('jsonwebtoken')

const generateAccessToken = () => {
  const payload = {
    type: 'guest'
  }
  return jwt.sign(payload, process.env.PUBLIC_ACCESS_TOKEN_SECRET, {
    algorithm: process.env.ACCESS_TOKEN_ALGORITHM,
    expiresIn: process.env.PUBLIC_ACCESS_TOKEN_DURATION
  })
}
module.exports = generateAccessToken
