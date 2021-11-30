import { request } from '../../utils'

const useGuestToken = async () => {
  const domain = new URL(window.location.href)
  try {
    const response = await request(
      `${process.env.PROXY_APP_URL}/bundle-api/token/guest`,
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: { shop: domain.hostname }
      }
    )

    return response.data
  } catch (error) {
    return error
  }
}

export default useGuestToken
