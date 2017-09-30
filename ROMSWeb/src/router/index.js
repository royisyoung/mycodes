import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import session from '@/assets/js/session'
import api from '@/api'
import store from '@/store'
//router-view layout
import Level0 from '@/components/router/level0.vue'
import Level1 from '@/components/router/level1.vue'
import taskAndPlan from './taskAndPlan'
import comingSoon from '@/components/common/comingSoon.vue'
import system from './system'
import user from './user'
import notFound from '@/components/exception/notFound.vue'
import commonException from '@/components/exception/commonException.vue'
import shopSelect from '@/components/common/shops.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/ROMSWeb/',
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: Level0,
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'dataPanel',
          name: 'dataPanel',
          component: comingSoon
        },
        {
          path: 'taskAndPlan',
          name: 'taskAndPlan',
          redirect: '/taskAndPlan/tasks',
          component: Level1,
          children: taskAndPlan
        },
        {
          path: 'user',
          name: 'user',
          component: Level1,
          children: user
        },
        {
          path: 'system',
          name: 'system',
          redirect:'/system/activityWarnSetting',
          component:Level1,
          children: system
        }
      ]
    },
    {
      path: '/notFound',
      name: 'notFound',
      component:notFound
    },
    {
      path: '/commonException',
      name: 'commonException',
      component:commonException
    },
    {
      path: '/shops',
      name: 'shops',
      component:shopSelect
    }
  ]
})
export default router;
