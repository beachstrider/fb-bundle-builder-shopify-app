const generateAccessToken = require('./generateAccessToken')
const replaceString = require('./replaceString')
const request = require('./request')
const shopifyMultipass = require('./shopifyMultipass')
const objectToQueryString = require('./objectToQueryString')

module.exports = {
  replaceString,
  generateAccessToken,
  objectToQueryString,
  request,
  shopifyMultipass
}
