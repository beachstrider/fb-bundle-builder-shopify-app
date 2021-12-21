import { request } from '../../utils'

const useUserToken = async () => {
  try {
    const domain = new URL(window.location.href)
    if(shopCustomer.email !== ''){
            
        const response = await request(
            `${process.env.PROXY_APP_URL}/bundle-api/token/account`,
            {
              method: 'post',
              headers: {
                'Content-Type': 'application/json'
              },
              data: { 
                  shop: `${domain.hostname}`,
                  email: shopCustomer.email
              }
            }
          )
      
          return response.data
    }
    return shopCustomer.email
  } catch (error) {
    return error
  }
}

const hasUserToken = async () => {

}

const isUserAuthenticated = async () => {

}
export { useUserToken, hasUserToken, isUserAuthenticated }
