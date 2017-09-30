<template>
  <div id="tab-box">
    <div class="el-tabs">
      <div class="el-tabs__header">
        <div class="el-tabs__nav-warp">
          <div class="el-tabs__nav-scroll">
            <div class="el-tabs__nav">
              <transition name="translation">
                <div class="el-tabs__active-bar" ref="bar" :style="transform"></div>
              </transition>
              <div v-for="(item, index) in menuList"
              :key="index"
              ref="tabs"
              :class="navIndex.level2 == item.id ? 'el-tabs__item is-active' : 'el-tabs__item'"
              @click="handleSelect($event, index, item.id)">
                {{item.title}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {navIndexSession} from '@/assets/js/session'
export default {
  data() {
    return {
      navIndex: this.$store.state.navIndex,
      menuList: [
        {id: 1, title: '活动年度计划', path: 'annualActivityPlan'},
        {id: 2, title: '活动分级配置', path: 'activityGradeConfig'},
        {id: 3, title: '活动货品日历', path: 'activityGoodsCalendar'}
      ],
      tabs: []
    }
  },
  beforeMount() {
  },
  mounted(){
    this.tabs = this.$refs.tabs;
    // console.log(this.tabs)
    // this.transform();
    // console.log(this.tabs, );
  },
  methods: {
    handleSelect(e, index, id) {
      this.navIndex.level2 = id.toString();
      this.$session.navIndex.set(this.navIndex);
      this.$store.commit({ type: 'turnTo', navIndex: this.navIndex})
      this.turnTo(index);
    },
    turnTo(index) {
      const pathStr = this.menuList[index].path;
      this.$router.push({name: pathStr});
    }
  },
  computed: {
    transform: function() {
      if(this.$_.isArray(this.tabs) && this.tabs.length > 0) {
        const index = this.navIndex.level2 - 1;
        const width = this.tabs[index].offsetWidth;
        const offsetLeft = this.tabs[index].offsetLeft;
        return 'width:' + width + 'px;' + 'transform:translateX(' + offsetLeft + 'px)';
      }else {
        return 'width:100px;';
      }
    },
  },
  watch: {
    // 'navIndex.level2': 'transform'
  }
}
</script>

<style lang="scss">
#tab-box {
  margin-bottom: 10px;
  .el-tabs__active-bar {
    width: 0; 
    transform: translateX(0px);
  }
  .el-tabs__item {
    padding: 0 16px;
    height: 54px;
    box-sizing: border-box;
    line-height: 54px;
    display: inline-block;
    list-style: none;
    font-size: 14px;
    color: #8391a5;
    position: relative;
    font-size: 18px;
  }
  div.is-active {
    color: #4991ff;
  }
}

//bar transition
.translation-enter-active {
  transition: all .3s ease;
}
</style>
