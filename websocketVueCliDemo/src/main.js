// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VueWebsocket from "vue-websocket";
// Vue.use(VueWebsocket, "ws://10.8.97.26:8088");
Vue.use(VueWebsocket, "ws://10.8.97.13:8000");

import Historya from './components/history.vue'
import InputDia from './components/input.vue'

Vue.config.productionTip = false

Vue.component('x-history', Historya);
Vue.component('x-input', InputDia);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
