import _ from 'lodash'

const sessionBase = {
  set: function(key, obj) {
    sessionStorage.setItem(key, JSON.stringify(obj));
  },
  get: function(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

// const sessionBase = {
//   get: function(key) {
//     const get = window.sessionStorage.getItem('token');
//     if(get){
//       // const str = decodeURIComponent(get)
//       try {
//         const token = JSON.parse(get);
//         return token[key];
//       } catch (error) {
//         return false 
//       }
//     }else {
//       return false;
//     }
//   },
//   set: function(key, obj) {
//     const get = window.sessionStorage.getItem('token');
//     let token = {};
//     if(get) {
//       try {
//         token = JSON.parse(get);
//       } catch (error) {
//         return false;
//       }
//     }
//     const obj2 = _.merge(token, {[key]: obj})
//     // const str = encodeURIComponent(JSON.stringify(obj2));
//     window.sessionStorage.setItem('token', JSON.stringify(obj2));
//   }
// } 

export default {
  navIndex: {
    get: () => sessionBase.get('navIndex'),
    set: obj => sessionBase.set('navIndex', obj)
  },
  token: {
    get: () => sessionBase.get('token'),
    set: obj => sessionBase.set('token', obj)
  },
  userInfo: {
    get: () => sessionBase.get('userInfo'),
    set: obj => sessionBase.set('userInfo', obj)
  },
  shopList: {
    get: () => sessionBase.get('shopList'),
    set: obj => sessionBase.set('shopList', obj)
  },
  currentShop: {
    get: () => sessionBase.get('currentShop'),
    set: obj => sessionBase.set('currentShop', obj)
  },
  functions: {
    get: () => sessionBase.get('functions'),
    set: obj => sessionBase.set('functions', obj)
  }
}
