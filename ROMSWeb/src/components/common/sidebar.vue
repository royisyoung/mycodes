<template>
  <div class="sidebar-box">
    <ul class="el-menu-vertical-demo">
      <li v-for="(item, index) in menuList" :key="index + key" class="el-menu-item-group__title" >
        <h5>{{item.name}}<i class="el-submenu__icon-arrow el-icon-arrow-down"></i></h5>
        <ul>
          <li v-for="(itemChild, index2) in item.children" :key="index2 + key"
          :class="itemChild.id == navIndex.level1 ? 'el-menu-item is-active' : 'el-menu-item'"
            @click="handleSelect(itemChild)">
            <p>{{itemChild.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>


<script>
// import {navIndexSession} from '@/assets/js/session'
export default {
  name: 'sidebar',
  data() {
    return {
      navIndex: this.$store.state.navIndex,
      functionList: this.$store.state.functionList,
      // menuList: [
      //   {
      //     title: '任务管理',
      //     children: [
      //       {id: 1, title: '全部任务', path: 'tasks'},
      //       {id: 2, title: '与我相关的任务', path: 'aboutWithMe'},
      //       {id: 3, title: '全部项目', path: 'projects'},
      //       {id: 4, title: '任务统计报表', path: 'tasksForm'},
      //     ]
      //   },
      //   {
      //     title: '计划管理',
      //     children: [
      //       {id: 5, title: '店铺计划', path: 'storePlan'},
      //       {id: 6, title: '活动计划', path: 'activePlan'},
      //       {id: 7, title: '计划进度报表', path: 'scheduleProgressForm'},
      //     ]
      //   }
      // ]
    }
  },
  mounted(){
    // console.log(this.functionList);
  },
  methods: {
    handleSelect: function(item) {
      this.navIndex.level1 = item.id;
      this.$session.navIndex.set(this.navIndex);
      this.$store.commit({ type: 'setNavIndex', navIndex: this.navIndex})
      this.$router.push({name: item.url.substr(1)})
      
    },
    turnTo(index) {
      let pathStr = '';
      this.menuList.forEach(function(item) {
        item.children.forEach(function(item2) {
          if(item2.id == index) {
            pathStr = item2.path;
          }
        })
      })
      // console.log(index, pathStr, this.menuList);
      this.$router.push({name: pathStr});
    }
  },
  computed: {
    key: () => new Date(),
    menuList: function () {
      const id = this.navIndex.level0;
      const obj = this.$_.find(this.functionList, {id});
      return obj.children;
    }
  }
}
</script>

<style lang="scss" scoped>
  $background: transparent;
  .sidebar-box {
    width:100%;
  }
  .el-menu-vertical-demo {
    >li {
      padding-left: 0;
    }
    li{
      position: relative;
      h5{
        position: relative;
        i{
          position: absolute;
          top:10px; right:30px;
        }
      }
    }
  }
</style>
