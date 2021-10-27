/**
 *
 * @param {String} string
 * @param {Array} replaceWith
 * @example replaceText('Example text. [replaceMe]', [{search: '[replaceMe]', replacement:'OK'}])
 *
 */
const replaceString = (
  string,
  replaceWith = [{ search: '', replacement: '' }]
) => {
  if (Array.isArray(replaceWith)) {
    replaceWith.forEach((item) => {
      const replaceRegex = new RegExp(item.search, 'g')
      string = string.replace(replaceRegex, item.replacement)
    })
    return string
  }
}

module.exports = replaceString
