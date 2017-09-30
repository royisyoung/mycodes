import fetch from '../config/axios'

export default {
  planDataList: params => fetch.post('/planBenchmark/findPlanBenchmarkPagination', params),
  delPlanData: id => fetch.post('/planBenchmark/deletePlanBenchmark?id='+id),
  savePlanData: params => fetch.post('/planBenchmark/savePlanBenchmark', params),
  editPlanData: id => fetch.post('/planBenchmark/findPlanBenchmarkByPk?id='+id),
  editSavePlanData:params => fetch.post('/planBenchmark/updatePlanBenchmark', params)
}
