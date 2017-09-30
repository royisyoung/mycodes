import fetch from '../config/axios'

export default {
  getshopInfo: params => fetch.get('/system/shop/userShops', params),
  getFunctions: params => fetch.get('/system/function/getFunctions', params)
}
