import fetch from '../config/axios'
// const baseUrl = 'http://10.88.26.114:8080/ROMSService' //develop
// const baseUrl = 'http://10.8.97.151:8080'; //王超
// const baseUrl = 'http://10.8.53.141:8080/ROMSService'; //单文军
//const baseUrl = 'http://10.8.51.77:8080/RomsService';//杨鹏飞
// const baseUrl = 'http://10.8.97.141:8080/ROMSService';//郭东风
const baseUrl = 'http://10.8.97.156:8080/ROMSService';//张志会
export default {
  yearlyPlanTemplate: () => baseUrl+ '/file/upLoadOrDownLoad/downLoadExcel?fileName=年计划模板.xlsx',
  dailyPlanTemplate: () => baseUrl+ '/file/upLoadOrDownLoad/downLoadExcel?fileName=每日计划模板.xlsx',
  activeTemplate: () => baseUrl+ '/action/actionPlan/downLoadFile',
}
