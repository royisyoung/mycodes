import fetch from '../config/axios'

export default {
  publishPlan: params => fetch.post('/plans/yearPlan/publish', params),

  //年计划
  queryYearPlan: params => fetch.post('/plans/yearPlan/list', params),
  updateYearlyPlan: params => fetch.post('/plans/yearPlan/local/creations', params),
  importYearlyPlan: (params, file) => fetch.upload('/plans/yearPlan/import', file, params),
  exportYearlyPlan: params => fetch.post('/plans/yearPlan/export', params), //??

  //日计划
  queryDailyPlan: params => fetch.post('/plans/dayPlans', params),
  updateDailyPlans: params => fetch.post('/plans/dayPlan/creations', params),
  importDailyPlan: (params, file) => fetch.upload('/plans/dayPlan/import', file, params)
}
