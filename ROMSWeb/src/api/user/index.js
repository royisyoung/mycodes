import fetch from '../config/axios'

export default {
  userList: params => fetch.get('/system/user/getUserPagination', params),
  userAdd:params => fetch.post('/system/user/save', params),
  userUpdate:(params,id) => fetch.post('/system/user/updateUser', params),
  userDel:params => fetch.post('/system/user/enable',params),
  userEdit:params => fetch.get('/system/user/getUserInfo', params)
}