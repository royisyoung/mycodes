import Level2 from '@/components/router/level2.vue'
import comingSoon from '@/components/common/comingSoon.vue'
import storePlan from '@/components/taskAndPlan/planManagement/storePlan.vue'
import activePlan from '@/components/taskAndPlan/planManagement/activePlan.vue'
export default [
  {
    //店铺计划
    path: 'shopPlan',
    name: 'shopPlan',
    component: storePlan
  },
  {
    //活动计划
    path: 'actionPlan',
    name: 'actionPlan',
    component: activePlan
  },
  {
    //日销计划
    path: 'dailySellPlan',
    name: 'dailySellPlan',
    component: comingSoon
  },
  {
    //计划进度报表
    path: 'planReport',
    name: 'planReport',
    component: comingSoon
  },
  {
    //全部任务
    path: 'tasks',
    name: 'tasks',
    component: comingSoon
  },
  {
    //与我相关的任务
    path: 'aboutWithMe',
    name: 'aboutWithMe',
    component: comingSoon
  },
  {
    //全部项目
    path: 'projects',
    name: 'projects',
    component: comingSoon
  },
  {
    //任务统计报表
    path: 'tasksReport',
    name: 'tasksReport',
    component: comingSoon
  }
]
