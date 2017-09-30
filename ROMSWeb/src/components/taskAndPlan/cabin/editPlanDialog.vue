<template>
  <r-dialog
  class='editPlan'
  :title="title"
  :close-handle="closeHandle"
  :confirm-handle="confirmHandle">
    <div class="editPlan-header">
      <div class="editPlan-header-title">
        <div class="title">
          <h4>年度目标</h4>
        </div>
        <div class="content">
          <label for="">时间</label>
          <select v-model="plan.year">
            <option :value="currentDate.year">{{currentDate.year}}</option>
            <option :value="currentDate.year + 1">{{currentDate.year + 1}}</option>
            <option :value="currentDate.year + 2">{{currentDate.year + 2}}</option>
          </select>
        </div>
      </div>
      <div class="editPlan-header-content">
        <div>
          <label for="">销售目标</label>
          <input v-model="plan.data.goal" type="text">
        </div>
        <div>
          <label for="">流量</label>
          <input v-model="plan.data.flow" type="text">
        </div>
        <div>
          <label for="">客单价</label>
          <input v-model="plan.data.price" type="text">
        </div>
        <div>
          <label for="">转化率</label>
          <input v-model="plan.data.transfer" type="text">
        </div>
      </div>
    </div>
    <div class="editPlan-content">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><h5>销售目标/RMB</h5></th>
            <th><h5>流量/次</h5></th>
            <th><h5>客单价/RMB</h5></th>
            <th><h5>转换率/%</h5></th>
          </tr>
          <tr v-for="(item, index) in plan.monthPlanList" :key="index + date">
            <th><h5>{{transferMonth(item.id)}}</h5></th>
            <td><input v-model="item.data.goal" type="text"></td>
            <td><input v-model="item.flow" type="text"></td>
            <td><input v-model="item.price" type="text"></td>
            <td><input v-model="item.transfer" type="text"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </r-dialog>
</template>

<script>
import dialog from '../../common/notice/dialog'
export default {
  components:{
    'r-dialog': dialog,
  },
  name: 'editPlan',
  props: {
    closeHandle: {
      type: Function,
      required: true
    },
    plan: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: '编辑计划',
      currentDate: this.$store.state.date,
    }
  },
  mounted() {
    console.log(this.$props.plan)
  },
  methods: {
    confirmHandle: function() {
      console.log(this.monthPlanList);
      console.log(this.yearlyPlan);
      // this.$api.plans.editPlan().then(res => {console.log(res)});
    },
    transferMonth: key => {
      switch(key){
        case 1: return '一月';
        case 2: return '二月';
        case 3: return '三月';
        case 4: return '四月';
        case 5: return '五月';
        case 6: return '六月';
        case 7: return '七月';
        case 8: return '八月';
        case 9: return '九月';
        case 10: return '十月';
        case 11: return '十一月';
        case 12: return '十二月';
        default: return 'error!'
      }
    }
  },
  computed: {
    date: () => new Date()
  }
}
</script>

<style lang='scss' scoped>
.editPlan {
  .editPlan-header {
    .editPlan-header-title {
      display: flex;
      >div {
        flex: 1;
      }
    }
    .editPlan-header-content {
      display: flex;

    }
  }
  .editPlan-content {
    display: flex;
    justify-content: center;
    table {
      tbody {
      }
    }
  }
}
</style>
