/**
 *
 * @param {String} url
 * @param {} fetchOptions
 * @param {Number} retries
 * @example request(url, {method: 'POST', body: JSON.stringify(data)}, 3)
 * @returns
 */
const request = async (url, fetchOptions, retries = 3) => {
  let data = null
  let status = 200

  try {
    const response = await fetch(url, fetchOptions)
    if (response.ok) {
      data = await response.json()
    } else {
      if (response.status >= 500) {
        status = response.status
        throw new Error('Internal server error')
      }
      if ([401, 472].includes(response.status)) {
        status = 401
      }

      if (retries > 0 && response.status === 429) {
        return setTimeout(() => {
          request(url, fetchOptions, retries - 1)
        }, process.env.NEXT_PUBLIC_RETRY_INTERVAL)
      } else {
        throw new Error('Maximum amount of retries exceeded.')
      }
    }
  } catch (error) {
    data = {
      message: 'Unexpected error.'
    }
  }

  return { data, status }
}

module.exports = request
