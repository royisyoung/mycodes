<template>
  <section id="header">
    <section class="logo">
      <img src="../../assets/imgs/header/ROMS.png" alt="">
    </section>
    <section class="shops">
      <select name="" id="shops" v-model="currentShopId">
        <option
        :value="item.id"
        v-for="(item, index) in shopList"
        :key="index + date">{{item.shopName}}</option>
      </select>
    </section>
    <section class="nav">
      <div class="el-menu navbar el-menu--horizontal">
        <li v-for="(item, index) in functionList"
        :key="index + date"
        :class="navIndex.level0 == item.id ? 'el-menu-item active' : 'el-menu-item'"
        @click="handleSelect(item)">
          <a harf="javascript:void(0);">{{item.name}}</a>
        </li>
      </div>
    </section>
    <!-- <section class="msg">
      <div class="msg-message">
        <p>
          <i>
            <img src="../../assets/imgs/header/dengpao.png" alt="">
          </i>
          <span>恭喜！您已荣幸进入COO的观察者模式！您的 待处理任务（3） 被观察中，建议尽快处理。进取的少年，看好你哦！</span>
        </p>
      </div>
    </section> -->
    <section>
      <ul class="user-agent clearfix">
        <li><img src="../../assets/imgs/header/search.png" alt=""></li>
        <li><img src="../../assets/imgs/header/star.png" alt=""></li>
        <li><img src="../../assets/imgs/header/setting.png" alt=""></li>
        <li>
          <img src="../../assets/imgs/header/head-icon.png" alt="">
          <img class="pop" src="../../assets/imgs/header/msg-pop.png" alt="">
        </li>
        <li><img src="../../assets/imgs/header/dr-down.png" alt=""></li>
      </ul>
    </section>
  </section>
</template>

<script>
// import session from '@/assets/js/session'
export default {
  data() {
    return {
      title: 'this is header',
      functionList: this.$store.state.functionList,
      navIndex: this.$store.state.navIndex,
      shopList: this.$store.state.shopList,
      currentShop: this.$store.state.currentShop,
      currentShopId: 0,
      userInfo: this.$store.state.userInfo
    }
  },
  beforeMount() {
    this.currentShopId = this.currentShop.id;
  },
  methods: {
    handleSelect(item) {
      this.navIndex.level0 = item.id;
      let targetPage = item;
      console.log(item);
      if(item.children) {
        for(var key in item.children){
          if(item.children[key].children){
            targetPage = item.children[key].children[0];
            break;
          }
        }
      }
      this.navIndex.level1 = targetPage.id;
      this.$session.navIndex.set(this.navIndex);
      this.$store.commit({ type: 'setNavIndex', navIndex: this.navIndex})
      this.$router.push({name: targetPage.url.substr(1)})
    }
  },
  computed: {
    date: () => new Date(),
    getFunctions: function() {
      return this.$store.state.functionList;
    }
  },
  watch: {
    getFunctions: function(val) {
      this.functionList = val
    }
  }
}
</script>

<style lang="scss" scoped>
$navHeight: 74px;
$transParent: transparent;

#header {
  display: flex;
  justify-content: space-between;
  height:$navHeight;
  padding:0 20px;
  box-shadow: 0 2px 4px #C0C1C5;
}
.logo {
  display: table-cell;
  line-height:$navHeight;
  width:140px;
  img {
    width: 100%;
  }
}
.shops {
  display: table-cell;
  line-height:$navHeight;
}
//nav
.nav {
  .navbar {
    width:482px;
    background: none;
    border-radius: 0;
    float: left;
    li{
      height: $navHeight;
      padding: 0;
      background: none;
      a {
        line-height:$navHeight;
        padding: 0 20px;
        display: block;
        width:100%;
        height:$navHeight;
      }
    }
    li:hover, li.active {
      background: none;
      a {
        color: #4991ff;
      }
    }
  }
}

.msg {
  height: $navHeight;
  display: table-cell;
  line-height: $navHeight;
  vertical-align: bottom;
  .msg-message {
    display: inline-block;
    line-height:$navHeight;
    padding: 0 20px;
    p {
      line-height: 16px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

//user-agent
.user-agent {
  width: 330px;
  li {
    float: left;
    display: table-cell;
    position: relative;
    width: 74px;
    height: $navHeight;
    text-align: center;
    line-height: $navHeight;
  }
  li:first-of-type {
    background: #A2D9EF;
  }
  li:last-of-type {
    width: 34px;
  }
  .pop {
    position: absolute;
    right: 5px;top: 5px;
  }
}
</style>
