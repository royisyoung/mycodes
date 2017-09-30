// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import ECharts from 'echarts'
import JQuery from 'jquery'
import Lodash from 'lodash'

import api from '@/api'
import session from '@/assets/js/session'
import util from '@/assets/js/util'

//引入自定义组件
import ComingSoom from '@/components/common/comingSoon.vue'
import Header from '@/components/common/header'
import Sidebar from '@/components/common/sidebar'
import TabBox from '@/components/common/tabbox'
// import RangeSlider from '@/components/common/rangeSlider.vue'

//引入自定义插件
// import Notice from '@/components/plugin/notice'

//vue插件引用
// Vue.use(VueAxios, Axios)
Vue.use(ElementUI)
// Vue.use(Notice)

// Vue.http.options.emulateHTTP = true;

//非vue插件引用
Vue.prototype.$axios = Axios;
Vue.prototype.$echarts = ECharts
Vue.prototype.$_ = Lodash;
Vue.prototype.$ = JQuery;
Vue.prototype.$api = api;
Vue.prototype.$session = session;
Vue.prototype.$util = util;

//公共组件注册
Vue.component('r-header', Header);
Vue.component('r-sidebar', Sidebar);
Vue.component('r-tabbox', TabBox);
Vue.component('r-coming', ComingSoom);
Vue.config.productionTip = false

//自定义指令
// import Drag from './assets/js/drag'
// Vue.directive('drag', Drag)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created() {
    this.authentication();
  },
  watch: {
    $route: function(to, from){
      this.authentication();
    }
  },
  methods: {
    getToken: function() {
      return this.$session.token.get();
    },
    authentication: function() {
      if(!this.getToken()) {
          this.queryUrl();
      }
    },
    queryUrl: function() {
      try {
        const url = '?baseEntityObject=BaseEntityObject%20%5Bg_token%3D90f62dfe843ee3eb0d6c7b66e40751de,%20g_userId%3D35,%20g_time%3D2017-09-22%2012%3A30%3A16%5D&Shops=3';
        // const url = window.location.search;
        const reg = new RegExp("(^|&)"+'baseEntityObject'+"=([^;]*)(;|$|\])");
        const arr = url.substr(1).match(reg);
        const res = decodeURIComponent(arr[2]);
        const shopInfo = {}
        const tokenInfo = {};
        const tokenArr = res.match(new RegExp(/[^,\[\s\&][A-z]*=[^,\]]*/, 'g'));
        tokenArr.forEach(function(item) {
          const a = item.split('=');
          if(a[0].indexOf('g_') > -1){
            tokenInfo[a[0].trim()] = a[1].trim();
          }else {
            shopInfo[a[0].trim()] = a[1].trim();
          }
        })
        tokenInfo['g_time']="2017-09-27 10:08:27";
        tokenInfo['g_token']="38c1924a9a1ec192ff0dbc55994528b4";
        tokenInfo['g_userId']="35";
        console.log(tokenInfo);
        this.$session.token.set(tokenInfo);
        this.getUserInfo(tokenInfo.g_userId);
        this.getShopInfo(tokenInfo.g_userId);
        this.$router.push({name: 'shops'});
      } catch (error) {
        window.location.href="http://test.account.baozun.cn/person/login?appkey=roms-test";
      }
    },
    getUserInfo: function(id) {
      this.$api.user.userEdit({id}).then(res => {
        const userInfo = res.data;
        this.$session.userInfo.set(userInfo);
        this.$store.commit({type: 'setUserInfo', userInfo: userInfo})
      })
    },
    getShopInfo: function(id) {
      this.$api.common.getshopInfo({id}).then(res => {
        const shopArr = res.data;
        if(shopArr.length > 1) {
          this.$session.shopList.set(shopArr);
          this.$store.commit({type: 'setShopList', shopList: shopArr})
          this.$router.push({path: '/shops'});
        }else {
          this.$session.currentShop.set(shopArr[0]);
          this.$store.commit({type: 'setCurrentShop', currentShop: shopArr[0]})
        }
      }).catch(() => {
        const shopArr = [
          {
            id: 20,
            shopName: "斯凯奇运动"
          },
          {
            id: 21,
            shopName: "斯凯奇男装"
          },
          {
            id: 22,
            shopName: "斯凯奇旗舰"
          }
        ]
        this.$session.shopList.set(shopArr);
        this.$store.commit({type: 'setShopList', shopList: shopArr})
      })
    }
  }
})
