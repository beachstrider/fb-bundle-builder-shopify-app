import { request } from '../../utils'

const useGuestToken = async (token = null) => {
  const generateGuestToken = async () => {
    try {
      return await request(
        `${process.env.PROXY_APP_URL}/bundle-api/token/guest`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          data: { shop: shopDomain }
        }
      )
    } catch (error) {
      return error
    }
  }

  try {
    const tokenResponse = await generateGuestToken()
    let currentToken = ''
    if (tokenResponse.data) {
      currentToken = tokenResponse.data?.token
    }

    return currentToken
  } catch (error) {
    return error
  }
}

export default useGuestToken
