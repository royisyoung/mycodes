import UserSetting from '@/components/system/systemSetting/userSetting'
import RoleSetting from '@/components/system/systemSetting/RoleSetting'
import ActivityWarnSetting from '@/components/system/systemManagement/activityWarnSetting'
import PlanSetting from '@/components/system/systemManagement/planSetting'
import comingSoon from '@/components/common/comingSoon.vue'

export default [
  //1.系统管理下面的路由
  {
    path:"planSetting",
    name:"planSetting",
    component:PlanSetting
  },
  {
    path:"activityWarnSetting",
    name:"activityWarnSetting",
    component:ActivityWarnSetting
  },
  //2.系统设置下面的路由
  {
    path:'userSetting',
    name:'userSetting',
    component:UserSetting
  },
  {
    path:'roleSetting',
    name:'roleSetting',
    component:RoleSetting
  },
  {
    path:'taskSetting',
    name:'taskSetting',
    component: comingSoon
  },
  {
    path:'shopSetting',
    name:'shopSetting',
    component: comingSoon
  }
]