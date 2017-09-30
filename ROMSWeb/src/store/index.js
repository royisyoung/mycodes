import Vue from 'vue'
import Vuex from 'vuex'
import session from '@/assets/js/session'

Vue.use(Vuex)

// console.log(session);
let navIndex = {};
let token = {};
let userInfo = {};
let shopList = [];
let functionList = [];
let currentShop = {};
let date = {};
try {
  navIndex = session.navIndex.get();
  token = session.token.get();
  userInfo = session.userInfo.get();
  shopList = session.shopList.get();
  functionList = session.functions.get();
  currentShop = session.currentShop.get();
  date = {
    year: new Date(token.g_time).getFullYear(),
    month: new Date(token.g_time).getMonth() + 1,
    date: new Date(token.g_time).getDate(),
    day: new Date(token.g_time).getDay()
  }
} catch (error) {
  console.log(error);
}
// console.log(token);
const store = new Vuex.Store({
  state:{
    navIndex: navIndex || {
      level0: '1',
      level1: '1',
      level2: '1'
    },
    date: {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      date: new Date().getDate(),
      day: new Date().getDay()
    },
    userInfo: userInfo,
    currentShop: currentShop,
    shopList: shopList,
    functionList: functionList
  },
  getters: {
    getShopList: state => state.shopList
  },
  mutations: {
    setNavIndex: (state, payload) => {
      state.navIndex = payload.navIndex
    },
    setDate: (state, payload) => {
      state.date = payload.date
    },
    setUserInfo: (state, payload) => {
      state.userInfo = payload.userInfo
    },
    setCurrentShop: (state, payload) => {
      state.currentShop = payload.currentShop
    },
    setShopList: (state, payload) => {
      state.shopList = payload.shopList
    },
    setFunctionList: (state, payload) => {
      state.functionList = payload.functionList
    },
  }
})

export default store;
