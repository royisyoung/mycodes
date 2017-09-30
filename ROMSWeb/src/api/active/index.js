import fetch from '../config/axios'
export default {
  uploadActive: params => fetch.post('/action/actionPlan/upLoadFile', params),
  importActivePlan: (formData, params) => fetch.upload('/action/actionPlan/upLoadFile', formData, params),
}
