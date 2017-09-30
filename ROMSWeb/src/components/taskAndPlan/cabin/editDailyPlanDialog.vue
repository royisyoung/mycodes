<template>
  <r-dialog
  class='editDailyPlan'
  :title="title"
  :close-handle="closeHandle"
  :confirm-handle="confirmHandle">
    <div class="editDailyPlan-header">
      <div>
        <span>{{daily.year + '年' + daily.id + '月'}}</span>
      </div>
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/goal.png" alt="">
        </i>
        <span>目标：</span>￥
        {{daily.data.goal}}
      </div>
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/flow.png" alt="">
        </i>
        <span>流量：</span>￥
        {{daily.data.flow}}
      </div>
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/price.png" alt="">
        </i>
        <span>客单价：</span>￥
        {{daily.data.price}}
      </div>
      <div>
        <i>
          <img src="../../../assets/imgs/storePlan/transfer.png" alt="">
        </i>
        <span>转换率：</span>￥
        {{daily.data.transfer}}
      </div>
    </div>
    <div class="editDailyPlan-content">
      <div class="left-box">
        <table class="left-table">
          <tbody>
            <tr>
              <th></th>
            </tr>
            <tr>
              <th>
                <h5>销售目标</h5>
              </th>
            </tr>
            <tr>
              <th>
                <h5>流量</h5>
              </th>
            </tr>
            <tr>
              <th>
                <h5>客单价</h5>
              </th>
            </tr>
            <tr>
              <th>
                <h5>转换率</h5>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="right-box">
        <table class="right-table">
          <tbody>
            <tr>
              <th v-for="(item, index) in allDays" :key="index + date">
                {{daily.id + '-' + item}}
              </th>
            </tr>
            <tr>
              <td v-for="(item, index) in allDays" :key="index + date">
                <input type="text">
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) in allDays" :key="index + date">
                <input type="text">
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) in allDays" :key="index + date">
                <input type="text">
              </td>
            </tr>
            <tr>
              <td v-for="(item, index) in allDays" :key="index + date">
                <input type="text">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </r-dialog>
</template>

<script>
import dialog from '../../common/notice/dialog'
export default {
  components:{
    'r-dialog': dialog,
  },
  name: 'editDailyPlan',
  props: {
    closeHandle: {
      type: Function,
      required: true
    },
    daily: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: '每日计划',
      allDays: [],
    }
  },
  created(){
    this.updateDailyPlans()
    // this.initInputs();
  },
  beforeMount() {
    // this.getDailyPlans();
  },
  methods: {
    getDailyPlans: function() {
      const daily = this.$props.daily;
      this.$api.plans.queryDailyPlan({shopId: 1, y: 2017, planTargetDayLocal: {m: 1}}).then(res => {
        console.log(res);
      })
    },
    confirmHandle: function() {
      console.log('biu')
      this.updateDailyPlans()
    },
    updateDailyPlans: function() {
      const obj = {};
      for(let i = 0; i < 31; i++){
        obj['d' + (i + 1)] = 1433;
      }
      const data = {
        planTargetLocalString: JSON.stringify([
          {id: 1},
          {id: 2},
          {id: 3},
          {id: 4}
        ]),
        planTargetDayLocalString: JSON.stringify([
          obj,obj,obj,obj
        ]),
        m: 1
      }
      this.$api.plans.updateDailyPlans(data).then(res => {
        console.log(res);
      })
    },
    initInputs: function() {
      const days = this.getDays()
      
    },
    getDays: function() {
      const m = this.$props.daily.id;
      const y = this.$props.daily.year;
      const curDate = new Date();
        curDate.setFullYear(y);
        curDate.setMonth(m);
        curDate.setDate(0);
      return curDate.getDate();
    }
  },
  computed: {
    date: function() {
      return new Date()
    }
  }
}
</script>

<style lang='scss' scoped>
.editDailyPlan {
  .editDailyPlan-header {
    display: flex;
  }
  .editDailyPlan-content {
    position: relative;
    $leftTableWidth: 75px;
    table {
      td, th {
        height: 22px;
      }
    }
    .left-box {
      width: $leftTableWidth;
      position: absolute;
      top:0; left: 0;
      table {
        th {
          text-align: right;
        }
      }
    }
    .right-box {
      margin-left: $leftTableWidth;
      width: 500px;
      overflow-x: scroll;
    }
  }
}
</style>
