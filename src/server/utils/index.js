const generateAccessToken = require('./generateAccessToken')
const replaceString = require('./replaceString')
const request = require('./request')
const shopifyMultipass = require('./shopifyMultipass')

module.exports = {
  replaceString,
  generateAccessToken,
  request,
  shopifyMultipass
}
