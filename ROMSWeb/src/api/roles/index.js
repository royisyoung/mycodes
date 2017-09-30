import fetch from '../config/axios'

export default {
  roleSetting: params => fetch.get('/system/role/getRoleList', params),
  roleSave:params => fetch.post('/system/role/save', params),
  updateRole:params => fetch.post('/system/role/allocateSave', params),
  roleDel:params => fetch.post('/system/role/delete', params),
}