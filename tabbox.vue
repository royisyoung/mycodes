<template>
  <div id="tab-box">
    <!-- <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活动年度计划12212" name="first"></el-tab-pane>
      <el-tab-pane label="活动分级配置" name="second"></el-tab-pane>
      <el-tab-pane label="活动货品日历21312" name="third"></el-tab-pane>
    </el-tabs> -->
    <div class="el-tabs">
      <div class="el-tabs__header">
        <div class="el-tabs__nav-warp">
          <div class="el-tabs__nav-scroll">
            <div class="el-tabs__nav">
              <transition name="translation">
                <div class="el-tabs__active-bar"></div>
              </transition>
              <div v-for="(item, index) in menuList" :key="index" ref="tab" class="el-tabs__item" @click="handleSelect($event, index, item.id)">活动年度计划</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navIndexSession from '@/assets/js/session'
export default {
  data() {
    return {
      navIndex: this.$store.state.navIndex,
      menuList: [
        {id: 1, title: '活动年度计划', path: '/'},
        {id: 2, title: '活动分级配置', path: '/'},
        {id: 3, title: '活动货品日历', path: '/'}
      ]
    }
  },
  beforeMount() {
    // console.log(this.$refs.tab);
  },
  mounted(){
    console.log(this.$refs.tab);
    const activeItem = this.$('#tab-box .el-tabs__item')[Number(this.navIndex.level2) - 1];
    this.transform(activeItem);
  },
  methods: {
    handleSelect(e, index, id){
      // console.log(this.$(e.currentTarget));
      this.transform(this.$(e.currentTarget)[0])
      this.navIndex.level2 = id.toString();
      navIndexSession.set(this.navIndex);
      this.$store.commit({ type: 'turnTo', navIndex: this.navIndex})
    },
    transform(el) {
      // console.log(this.$('#tab-box .el-tabs__active-bar'));
      const bar = this.$('#tab-box .el-tabs__active-bar')[0];
      bar.style.width = el.offsetWidth + 'px';
      bar.style.transform = 'translateX(' + el.offsetLeft + 'px)';
    }
  }
}
</script>

<style lang="scss">
#tab-box {
  margin-bottom: 10px;
  .el-tabs__active-bar {
    width: 0; 
    transform: translateX(800px);
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
}

//bar transition
.translation-enter-active {
  transition: all .3s ease;
}
</style>
