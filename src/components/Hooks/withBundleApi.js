import dayjs from 'dayjs'
import { request } from '../../utils'

const getMenuItems = async (
  token,
  isoDate = dayjs().format('YYYY-MM-DDT00:00:00.000[Z]')
) => {
  try {
    const response = await request(
      `${process.env.PROXY_APP_URL}/bundle-api/bundles/76/configurations/811/contents?is_enabled=1&display_after=${isoDate}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )

    return response.data
  } catch (error) {
    return error
  }
}

export { getMenuItems }
