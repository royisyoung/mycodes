import axios from 'axios'
import qs from 'qs'
import _ from 'lodash'
import session from '../../assets/js/session'
import $ from 'jquery'
import util from '../../assets/js/util'

// axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.baseURL = 'http://10.8.51.71:8080/RomsService';
axios.defaults.baseURL = 'http://10.88.26.114:8080/ROMSService'; // develop
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8;';
// axios.defaults.headers.common['Accept'] = 'application/x-www-form-urlencoded; charset=UTF-8;';
// axios.defaults.baseURL = 'http://10.8.51.33:8080/RomsService'; // develop
// console.log(axios.defaults);
// axios.defaults.baseURL = ''; // product
// axios.defaults.baseURL = 'https://api.example.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
//在创建实例时设置配置默认值var instance = axios.create（{   baseURL：'https://api.example.com'}）; 
//在实例创建后改变默认值instance.defaults.headers.common ['Authorization'] = AUTH_TOKEN;
//request同意处理操作
// var instance = axios.create({
//   baseURL: 'https://some-domain.com/api/',
//   timeout: 1000,
//   headers: {'X-Custom-Header': 'foobar'}
// });
//POST传参序列化
// console.log(axios.defaults);
// axios.interceptors.request.use((config) => {
//   console.log(arguments);
//   if(config.method  === 'post'){
//     config.data = qs.stringify(config.data);
//     console.log(config.data);
//   }
//   return config;
// },(error) =>{
//    alert("错误的传参");
//   return Promise.reject(error);
// });

//code状态码200判断
// axios.interceptors.response.use((res) =>{
//   console.log(res)
//   if(res.data.code != '200'){
//     alert(res.data.msg);
//     return Promise.reject(res);
//   }
//   return res;
// }, (error) => {
//   alert("网络异常");
//   return Promise.reject(error);
// });


// 输出两个请求方法
// export default {
//   get(url, params) {
//     //获取session里面的token
//     const token = session.token.get();
//     //合并对象
//     const newParams = _.merge(params, token);
//     return new Promise((resolve, reject) => {
//       axios.get(url,{
//         params:newParams
//         })
//       .then(response => {
//         const data = response.data;
//         if(data.code == 8000) {
//           window.location.href = "http://test.account.baozun.cn/person/login?appkey=roms-test";
//         }
//         resolve(response.data)
//         //获取token
//         const obj = {};
//         for(let key in token){
//           obj[key] = response.data[key];
//         }
//         //存到session
//         session.token.set(obj)
//       }, err => {
//         // resolve(response)
//         reject(err)
//       }).catch(error => {
//         alert(error);
//         reject(error)
//       })
//     })
//   },
//   post(url, params, fn) {
//     //获取session里面的token
//     const token = session.token.get();
//     //合并对象
//     const newParams = _.merge(params, token);
//     return new Promise((resolve, reject) => {
//       axios.post(url, newParams)
//       .then(response => {
//         const data = response.data;
//         if(data.code == 8000) {
//           window.location.href = "http://test.account.baozun.cn/person/login?appkey=roms-test";
//         }
//         resolve(response.data)
//         //获取token
//         const obj = {};
//         for(let key in token){
//           obj[key] = response.data[key];
//         }
//         //存到session
//         session.token.set(obj)
//       }, err => {
//         // resolve(response)
//         reject(err)
//       }).catch(error => {
//         alert(error);
//         reject(error)
//       })
//     })
//   }
// }
//jq ajax
// const baseUrl = 'http://10.88.26.114:8080/ROMSService' //develop
// const baseUrl = 'http://10.8.97.151:8080'; //王超
// const baseUrl = 'http://10.8.53.141:8080/ROMSService'; //单文军
//const baseUrl = 'http://10.8.51.77:8080/RomsService';//杨鹏飞
// const baseUrl = 'http://10.8.97.141:8080/ROMSService';//郭东风
const baseUrl = 'http://10.8.97.156:8080/ROMSService';//张志会
export default {
  get(url, params) {
    //获取session里面的token
    const token = session.token.get();
    //合并对象
    const newParams = _.merge(params, token);
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'get',
        url: baseUrl+url,
        data: newParams,
        success: response => {
          resolve(response)
          if(response.code == 8000) {
            // window.location.href = "http://test.account.baozun.cn/person/login?appkey=roms-test";
          }
          //获取token
          const obj = {};
          for(let key in token){
            obj[key] = response[key];
          }
          //存到session
          if(obj['g_time'] && (new Date(obj['g_time']) > new Date(token['g_time']))) {
          session.token.set(obj);
          }
        },
        error: err => reject(err)
      })
    })
  },
  post(url, params) {
    //获取session里面的token
    const token = session.token.get();
    //合并对象
    const newParams = _.merge(params, token);
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'post',
        url: baseUrl+url,
        data: newParams,
        success: response => {
          resolve(response)
          if(response.code == 8000) {
            // window.location.href = "http://test.account.baozun.cn/person/login?appkey=roms-test";
          }
          //获取token
          const obj = {};
          for(let key in token){
            obj[key] = response[key];
          }
          //存到session
          if(obj['g_time'] && (new Date(obj['g_time']) > new Date(token['g_time']))) {
          session.token.set(obj);
          }
        },
        error: err => reject(err)
      })
    })
  },
  upload(url, formData, params){
    //获取session里面的token
    const token = session.token.get();
    //合并对象
    const newParams = _.merge(params, token);
    const toStr = util.paramsSerialized(newParams)
    return new Promise((resolve, reject) => {
      $.ajax({
        type: 'post',
        url: baseUrl + url + toStr,
        data: formData,
        contentType: false,
        processData: false,
        success: response => {
          resolve(response)
          if(response.code == 8000) {
            // window.location.href = "http://test.account.baozun.cn/person/login?appkey=roms-test";
          }
          //获取token
          const obj = {};
          for(let key in token){
            obj[key] = response[key];
          }
          //存到session
          if(obj['g_time'] && (new Date(obj['g_time']) > new Date(token['g_time']))) {
          session.token.set(obj);
          }
        },
        error: err => reject(err)
      })
    })
  }
}