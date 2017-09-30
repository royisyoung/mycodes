import fetch from '../config/axios'

const turned = (obj) => {
  if(obj){
    const arr = [];
    for(let key in obj){
      const str = key + '=' + obj[key];
      arr.push(str);
    }
    return '?' + arr.join('&');
  }else {
    return '';
  }
}

export default {
  queryPlan: params => fetch.post('/plans/yearPlan/list', params),
  createYearlyPlan: params => fetch.post('/plans/yearPlan/local/creations', params),
  publishPlan: params => fetch.post('/plans/yearPlan/publish', params),
  importYearlyPlan: (params, file) => fetch.upload('/plans/yearPlan/import', file, params),
  exportYearlyPlan: params => fetch.post('/plans/yearPlan/export', params),

  queryDailyPlan: params => fetch.post('/plans/dayPlans', params),
  updateDailyPlans: params => fetch.post('/plans/dayPlan/creations', params),
  importDailyPlan: params => fetch.post('/plans/dayPlan/import', params)
}
