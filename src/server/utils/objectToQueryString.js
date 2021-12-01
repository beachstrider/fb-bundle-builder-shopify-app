const objectToQueryString = (queryString) =>
  Object.keys(queryString)
    .map((key) => key + '=' + queryString[key])
    .join('&')

module.exports = objectToQueryString
