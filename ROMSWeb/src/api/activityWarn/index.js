import fetch from '../config/axios'

export default {
  activityWarnSetting:params => fetch.get('/action/actionGrade/getActionGradePagination', params),
  activityWarnSave:params => fetch.post('/action/actionGrade/save', params),
  activityWarnEnable:(id,params) => fetch.post('/action/actionGrade/enable?id='+id+'&deleteFlag=1', params),
  activityWarnEdit:params => fetch.get('/action/actionGrade/getActionGrade',params),
  activityWarnEditSave:params => fetch.post('/action/actionGrade/updateActionGrade',params),
  downloadTemplet:params => fetch.get('/action/actionGrade/downLoadFile?fileName:"活动预警模板.xlsx"', params)
  // uploadTemplet:params => fetch.post('/action/actionGrade/uploadFile?userId=1&shopId=1', params)
}
