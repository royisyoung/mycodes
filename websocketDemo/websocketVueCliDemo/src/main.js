// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

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
