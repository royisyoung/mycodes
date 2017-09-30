<template>
  <r-dialog
  class='createPlan'
  :title="title"
  :close-handle="closeHandle"
  :confirm-handle="confirmHandle">
    <div class="createPlan-header">
      <div class="createPlan-header-title">
        <div class="title">
          <h4>年度目标</h4>
        </div>
        <div class="content">
          <label for="">时间</label>
          <select v-model="yearlyPlan.year">
            <option :value="currentDate.year">{{currentDate.year}}</option>
            <option :value="currentDate.year + 1">{{currentDate.year + 1}}</option>
            <option :value="currentDate.year + 2">{{currentDate.year + 2}}</option>
          </select>
        </div>
      </div>
      <div class="createPlan-header-content">
        <div>
          <label for="">销售目标</label>
          <input v-model="yearlyPlan.goal" type="text">
        </div>
        <div>
          <label for="">流量</label>
          <input v-model="yearlyPlan.flow" type="text">
        </div>
        <div>
          <label for="">客单价</label>
          <input v-model="yearlyPlan.price" type="text">
        </div>
        <div>
          <label for="">转化率</label>
          <input v-model="yearlyPlan.transfer" type="text">
        </div>
      </div>
    </div>
    <div class="createPlan-content">
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><h5>销售目标/RMB</h5></th>
            <th><h5>流量/次</h5></th>
            <th><h5>客单价/RMB</h5></th>
            <th><h5>转换率/%</h5></th>
          </tr>
          <tr v-for="(item, index) in yearlyPlan.monthPlanList" :key="index + date">
            <th><h5>{{transferMonth(item.id)}}</h5></th>
            <td><input v-model="item.goal" type="text"></td>
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
  name: 'createPlan',
  props: {
    closeHandle: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      title: '新建计划',
      currentDate: this.$store.state.date,
      yearlyPlan:{
        year: new Date().getFullYear(),
        goal: '21332',
        flow: '2332',
        price: '4231',
        transfer: '4123',
        monthPlanList:[
          {
            id: 1,
            goal: '321',
            flow: '321',
            price: '321',
            transfer: '321'
          },
          {
            id: 2,
            goal: '3214',
            flow: '321',
            price: '321',
            transfer: '321'
          },
          {
            id: 3,
            goal: '321',
            flow: '321',
            price: '321',
            transfer: '321'
          },
          {
            id: 4,
            goal: '321',
            flow: '4321',
            price: '4231',
            transfer: '4213'
          },
          {
            id: 5,
            goal: '4123',
            flow: '2314',
            price: '321',
            transfer: '321'
          },
          {
            id: 6,
            goal: '3214',
            flow: '3124',
            price: '1234',
            transfer: '4321'
          },
          {
            id: 7,
            goal: '3241',
            flow: '3214',
            price: '4231',
            transfer: '3214'
          },
          {
            id: 8,
            goal: '2143',
            flow: '2314',
            price: '2314',
            transfer: '3241'
          },
          {
            id: 9,
            goal: '2431',
            flow: '213',
            price: '324',
            transfer: '3241'
          },
          {
            id: 10,
            goal: '3214',
            flow: '1234',
            price: '432',
            transfer: '4231'
          },
          {
            id: 11,
            goal: '1324',
            flow: '4321',
            price: '432',
            transfer: '4231'
          },
          {
            id: 12,
            goal: '2314',
            flow: '321',
            price: '423',
            transfer: '3214'
          }
        ]
      }
    }
  },
  methods: {
    confirmHandle: function() {
      // console.log(this.monthPlanList);
      // console.log(this.yearlyPlan);
      const params = this.analysisDateToRequest();
      console.log(params);
      const obj = {
          g_time: "2017-09-27 10:08:27",
          g_token: "38c1924a9a1ec192ff0dbc55994528b4",
          g_userId: "35",
          planTargetLocals: params
        }
      // this.$api.plans.createYearlyPlan({planTargetLocals: params}).then(res => {console.log(res)});
      this.$.ajax({
        url: 'http://10.8.97.151:8080/plans/yearPlan/local/creations',
        type: 'post',
        data: JSON.stringify(obj),
        // data: params,
        contentType: 'application/json; charset=utf-8',
        // traditional: true,
        success: function(data) {
          console.log(data);
        }
      })
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
    },
    
    //打包数据
    analysisDateToRequest: function() {
      const yearlyPlan = this.yearlyPlan;
      const monthPlanList = this.yearlyPlan.monthPlanList;
      const userInfo = this.$store.state.userInfo;
      const shopInfo = this.$store.state.currentShop;
      const typeList = ['goal', 'flow', 'price', 'transfer'];
      // shopId, y, planTypeId, planValue deleteFlag
      // m1,m2,m3......

      return typeList.map((item, index) => {
        return {
          shopId: shopInfo.id,
          y: yearlyPlan.year,
          planTypeId: index + 1,
          planValue: yearlyPlan[item],
          createUser: userInfo.id,
          m1: monthPlanList[0][item],
          m2: monthPlanList[1][item],
          m3: monthPlanList[2][item],
          m4: monthPlanList[3][item],
          m5: monthPlanList[4][item],
          m6: monthPlanList[5][item],
          m7: monthPlanList[6][item],
          m8: monthPlanList[7][item],
          m9: monthPlanList[8][item],
          m10: monthPlanList[9][item],
          m11: monthPlanList[10][item],
          m12: monthPlanList[11][item],
        }
      })
    },
  },
  computed: {
    date: () => new Date()
  }
}
</script>

<style lang='scss' scoped>
.createPlan {
  .createPlan-header {
    .createPlan-header-title {
      display: flex;
      >div {
        flex: 1;
      }
    }
    .createPlan-header-content {
      display: flex;

    }
  }
  .createPlan-content {
    display: flex;
    justify-content: center;
    table {
      tbody {
      }
    }
  }
}
</style>
