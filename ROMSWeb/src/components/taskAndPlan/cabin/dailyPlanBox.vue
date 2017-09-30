<template>
  <section class='dailyPlanBox'>
    <div class="dailyPlanBox-header">
      <h4>{{plan.mName}}</h4>
    </div>
    <div class="dailyPlanBox-content">
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/goal.png" alt="">
        </i>
        <span>目标：</span>
        {{plan.data.goal}}
      </div>
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/flow.png" alt="">
        </i>
        <span>流量：</span>
        {{plan.data.flow}}
      </div>
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/price.png" alt="">
        </i>
        <span>客单价：</span>
        {{plan.data.price}}
      </div>
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/transfer.png" alt="">
        </i>
        <span>转换率：</span>
        {{plan.data.transfer}}%
      </div>
      <div class="btn">
        <button @click="editBtnHandle(plan.id)">每日计划</button>
      </div>
    </div>
    <div class="dailyPlanBox-cover" v-show="importActive">
      <button class="importBtn" @click="importBtnHandle(plan.id)">导入每日计划</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'dailyPlanBox',
  props: {
    importActive: {
      type: Boolean,
      required: true,
      default: false,
    },
    plan: {
      type: Object,
      required: true
    },
    editHandle: {
      type: Function,
      required: false,
      default: function() {
        console.log('ff')
      }
    },
    importHandle: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      // show: this.$props.importActive
    }
  },
  methods: {
    importBtnHandle: function(id) {
      this.$props.importHandle();
      console.log('我导~~', id);
      //
    },
    editBtnHandle: function(id) {
      this.$props.editHandle(id);
      this.$emit('edit-handle', id);
    }
  },
  computed: {
    
  }
}
</script>

<style lang='scss' scoped>
.dailyPlanBox{
  min-width: 120px;
  margin: 15px 15px;
  // background: yellowgreen;
  // border: 1px solid #333;
  position: relative;
  .dailyPlanBox-header {
    text-align: center;
    padding: 10px 0;
  }
  .dailyPlanBox-content {
    div {
      display: flex;
      flex-wrap: nowrap;
      padding: 5px 0;
      i {
        width: 17px;
        img{
          margin-top: -3px;
        }
      }
      span {
        min-width: 48px;
      }
    }
    .btn {
      justify-content: center;
    }
  }
  .dailyPlanBox-cover {
    position: absolute;
    left: 0; top: 0;
    bottom: 0; right: 0;
    background-color: rgba(105,105,105,.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
