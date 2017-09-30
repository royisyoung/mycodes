<template>
  <section class='shops'>
    <div class="shops-header">
      <div>
        <h1>ROMS</h1>
      </div>
    </div>
    <r-circularFrame background-color="white" class="shops-container">
      <div class="shops-container-header">
        <h3>欢迎来到ROMS系统</h3>
        <h3>请选择你要查看的店铺</h3>
      </div>
      <div class="shops-container-content">
        <div 
          class="shop"
          @click="clickHandle(item.id)"
          v-for="(item, index) in shopList"
          :key="index + date">
          <span>{{item.shopName}}</span>
        </div>
      </div>
    </r-circularFrame>
  </section>
</template>

<script>
import circularFrame from '@/components/common/base/circularFrame'
export default {
  components: {'r-circularFrame': circularFrame},
  name: 'shops',
  data() {
    return {
      shopList: this.$store.state.shopList,
      userInfo: this.$store.state.userInfo
    }
  },
  mounted() {
  },
  methods: {
    clickHandle: function(id) {
      const currentShop = this.$_.find(this.shopList, {id});
      this.$session.currentShop.set(currentShop);
      this.$store.commit({ type: 'setCurrentShop', currentShop})
      this.$api.common.getFunctions({id: this.userInfo.id, shopId: id})
      .then(res => {
        const data = res.data;
        const functionArr = data.filter(item => item.parentId == 0);
        functionArr.forEach(function(it) {
          const arr = data.filter(item => item.parentId == it.id);
          if(arr.length > 0) {
            arr.forEach(function(it2) {
              const arr2 = data.filter(item => item.parentId == it2.id);
              if(arr2.length > 0) it2.children = arr2;
            })
            it.children = arr;
          }
        });
        this.$session.functions.set(functionArr);
        this.$store.commit({type: 'setFunctionList', functionList: functionArr})
        this.$router.push({name: 'index'});
      })
    }
  },
  computed: {
    date: () => new Date(),
    getShopList: function() {
      return this.$store.state.shopList
    },
    getUserInfo: function() {
      return this.$store.state.userInfo
    }
  },
  watch: {
    getShopList(val) {
      this.shopList = val;
    },
    getUserInfo(val) {
      this.userInfo = val;
    }
  }
}
</script>

<style lang='scss' scoped>
.shops {
  .shops-header {
    display: flex;
    align-items: center;
    height: 74px;
    padding:0 20px;
    box-shadow: 0 2px 4px #C0C1C5;
  }
  .shops-container {
    margin: 25px 15px;
    padding: 15px;
    min-height: 600px;
    .shops-container-header {
      padding: 10px;
      h3{
        line-height: 40px;
      }
    }
    .shops-container-content {
      padding: 10px;
      display: flex;
      // justify-content: space-around;
      .shop {
        width: 250px;
        height: 150px;
        background-color: skyblue;
        margin: 0 10px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .shop:hover {
        box-shadow: 1px 1px 3px #4D4D4D;
      }
    }
  }
}
</style>
