<template>
  <section id="storePlan">
    <r-baseFrame class="header">
      <r-titleHeader :title="title">
        <div slot="right">
          <label for="">选择时间</label>
          <select v-model="yearInQuery">
            <option :value="currentDate.year" selected>{{currentDate.year}}</option>
            <option :value="currentDate.year + 1">{{currentDate.year + 1}}</option>
            <option :value="currentDate.year + 2">{{currentDate.year + 2}}</option>
          </select>
          <button>查询计划</button>
          <button @click="openCreatePlanHandle">新建计划</button>
          <button @click="openImportYearlyHandle">导入年度计划</button>
        </div>
      </r-titleHeader>
    </r-baseFrame>
    <r-baseFrame class="my-container">
      <div v-if="importDailyActive" class="my-container-header">
        <div>
          <h5>导入每日计划</h5>
        </div>
        <div>
          <a href="javascript:void(0);" @click="switchImportDailyHandle">取消</a>
        </div>
      </div>
      <div v-else class="my-container-header">
        <div>
          <a href="javascript:void(0);" @click="publishPlanHandle">发布</a>
          <a href="javascript:void(0);" @click="openEditPlanHandle">编辑</a>
        </div>
        <div>
          <a href="javascript:void(0);" @click="exportPlanHandle">导出历史版本</a>
          <a href="javascript:void(0);" @click="switchImportDailyHandle">导入每日计划</a>
        </div>
      </div>
      <div class="my-container-content">
        <div class="left-box">
          <div class="left-box-header"><p><span>{{currentYearlyPlan.version}}</span><span>{{ currentYearlyPlan.publish ? '已发布': '未发布'}}</span></p></div>
          <div class="left-box-main">
            <div>
              <div class="left-box-main-header">
                <h4>{{currentYearlyPlan.y}}销售目标</h4>
              </div>
              <div class="left-box-main-content">
                <div>
                  <i>
                    <img src="../../../assets/imgs/storePlan/goal.png" alt="">
                  </i>
                  <span>目标：</span>
                  {{this.$util.formatMoneyK(currentYearlyPlan.data.goal)}}
                </div>
                <div>
                  <i>
                    <img src="../../../assets/imgs/storePlan/flow.png" alt="">
                  </i>
                  <span>流量：</span>
                  {{this.$util.formatMoneyK(currentYearlyPlan.data.flow)}}
                </div>
                <div>
                  <i>
                    <img src="../../../assets/imgs/storePlan/price.png" alt="">
                  </i>
                  <span>客单价：</span>
                  {{currentYearlyPlan.data.price}}
                </div>
                <div>
                  <i>
                    <img src="../../../assets/imgs/storePlan/transfer.png" alt="">
                  </i>
                  <span>转换率：</span>
                  {{this.$util.formatPercent(currentYearlyPlan.data.transfer)}}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right-box">
          <r-dailyPlanBox v-for="(item, index) in currentYearlyPlan.monthPlanList"
          :key="index + date"
          :plan="item"
          :edit-handle="openEditDailyHandle"
          :import-active="importDailyActive"
          :import-handle="openImportDailyHandle">
          </r-dailyPlanBox>
        </div>
      </div>
    </r-baseFrame>
    <r-importPlanDialog
      :type="importType"
      v-if="importFrameActive"
      :close-handle="closeImportFrameHandle">
    </r-importPlanDialog>
    <r-editDailyPlanDialog
      :daily="currentMonthPlan"
      v-if="editDailyActive"
      :close-handle="closeEditDailyHandle">
    </r-editDailyPlanDialog>
    <r-createPlanDialog
      v-if="createNewPlanActive"
      :close-handle="closeCreatePlanHandle">
    </r-createPlanDialog>
    <r-editPlanDialog
      :plan="currentYearlyPlan"
      v-if="editPlanActive"
      :close-handle="closeEditPlanHandle">
    </r-editPlanDialog>
  </section>
</template>

<script>
import baseFrame from '../../common/base/baseFrame'
// import circularFrame from '../../common/base/circularFrame'
import titleHeader from '../../common/base/titleHeader'
import dialog from '../../common/notice/dialog'
import dailyPlanBox from '../cabin/dailyPlanBox'
import importPlanDialog from '../cabin/importPlanDialog'
import editDailyPlanDialog from '../cabin/editDailyPlanDialog'
import createPlanDialog from '../cabin/createPlanDialog'
import editPlanDialog from '../cabin/editPlanDialog'
export default {
  components: {
    'r-baseFrame': baseFrame,
    // 'r-circularFrame': circularFrame,
    'r-titleHeader': titleHeader,
    // 'r-dialog': dialog,
    'r-dailyPlanBox': dailyPlanBox,
    'r-importPlanDialog': importPlanDialog,
    'r-editDailyPlanDialog': editDailyPlanDialog,
    'r-createPlanDialog': createPlanDialog,
    'r-editPlanDialog': editPlanDialog,
  },
  data() {
    return {
      title: '店铺计划',
      importDailyActive: false,
      importFrameActive: true,
      importType: 1,
      editDailyActive: false,
      createNewPlanActive: false,
      editPlanActive: false,
      currentDate: this.$store.state.date,
      yearInQuery: '',
      currentYearlyPlan: {
        id: 111,
        version: 'v2.0',
        publish: true,
        year: '2017',
        data: {
          goal: 0,
          flow: 0,
          price: 0,
          transfer: 0,
        },
        monthPlanList:[
          {
            id: 1,
            mName: '一月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            }
          },
          {
            id: 2,
            mName: '二月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            }
          },
          {
            id: 3,
            mName: '三月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            }
          },
          {
            id: 4,
            mName: '四月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            }
          },
          {
            id: 5,
            mName: '五月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            }
          },
          {
            id: 6,
            mName: '六月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            }
          },
          {
            id: 7,
            mName: '七月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            }
          },
          {
            id: 8,
            mName: '八月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            },
          },
          {
            id: 9,
            mName: '九月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            },
          },
          {
            id: 10,
            mName: '十月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            },
          },
          {
            id: 11,
            mName: '十一月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            },
          },
          {
            id: 12,
            mName: '十二月',
            year: '2017',
            data: {
              goal: 0,
              flow: 0,
              price: 0,
              transfer: 0,
            },
          }
        ]
      },
      yearlyPlanList: [],
      currentMonthPlan:{
        id: 1,
        mName: '一月',
        year: '2017',
        data: {
          goal: 0,
          flow: 0,
          price: 0,
          transfer: 0,
        }
      }
    }
  },
  created() {
    this.queryPlanHandle();
  },
  mounted() {
  },
  methods: {
    //查询计划
    queryPlanHandle: function(condition) {
      const year = condition || this.currentDate.year;
      const shopId = this.$store.state.currentShop.id;
      const params = {
        y: year,
        shopId: shopId
      }
      return new Promise((resolve, reject) => {
        this.$api.plans.queryPlan(params)
        .then(res => {
          // console.log(res.data)
          const arr = res.data;
          if(arr) {
            this.analysisDateToHere(arr);
            resolve();
          }else {
            console.log('result is undefinded!');
            reject();
          }
          // console.log(res);
        }, err => {
          console.log(err);
        });
      })
    },
    // //四种type
    // typeForm: k
    //解析计划数据打包成以计划为单位的对象数组
    analysisDateToHere: function(data) {
      if(data.length > 4) alert('收到的数据过长');
      const goal = this.$_.find(data, {planTypeId: 1});
      const flow = this.$_.find(data, {planTypeId: 2});
      const price = this.$_.find(data, {planTypeId: 3});
      const transfer = this.$_.find(data, {planTypeId: 4});

      this.currentYearlyPlan.year = data[0].y;
      this.currentYearlyPlan.data.goal = goal.planValue;
      this.currentYearlyPlan.data.flow = flow.planValue;
      this.currentYearlyPlan.data.price = price.planValue;
      this.currentYearlyPlan.data.transfer = transfer.planValue;

      this.currentYearlyPlan.monthPlanList.forEach((item, index) => {
        const m = 'm' + (index + 1);
        this.currentYearlyPlan.monthPlanList[index].data.goal = goal[m];
        this.currentYearlyPlan.monthPlanList[index].data.flow = flow[m];
        this.currentYearlyPlan.monthPlanList[index].data.price = price[m];
        this.currentYearlyPlan.monthPlanList[index].data.transfer = transfer[m];
      })
    },
    //发布计划
    publishPlanHandle: function() {

    },
    //导出历史版本
    exportPlanHandle: function() {
      this.$api.plans.exportYearlyPlan().then(res => console.log(res));
    },
    //新建计划窗口激活
    openCreatePlanHandle: function() {
      this.createNewPlanActive = true;
    },
    closeCreatePlanHandle: function() {
      this.createNewPlanActive = false;
    },
    //编辑计划激活
    openEditPlanHandle: function() {
      this.editPlanActive = true;
    },
    //编辑计划窗口关闭
    closeEditPlanHandle: function() {
      this.editPlanActive = false;
    },
    //导入每日计划切换
    switchImportDailyHandle: function() {
      this.importDailyActive = !this.importDailyActive;
    },
    //导入年度计划窗口激活
    openImportYearlyHandle: function() {
      this.importFrameActive = true;
      this.importType= 1;
    },
    //导入每日计划窗口激活
    openImportDailyHandle: function() {
      this.importFrameActive = true;
      this.importType= 2;
    },
    //关闭导入计划窗口
    closeImportFrameHandle: function() {
      this.importFrameActive = false;
    },
    //编辑每日计划窗口激活
    openEditDailyHandle: function(id) {
      const list = this.currentYearlyPlan.monthPlanList;
      this.currentMonthPlan = this.$_.find(list, {id});
      console.log(this.currentMonthPlan);
      this.editDailyActive = true;
    },
    closeEditDailyHandle: function() {
      this.editDailyActive = false;
    }
  },
  computed: {
    date: function() {
      return new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
#storePlan {
  .my-container {
    // padding: 0 20px;
    .my-container-header {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
    }
    .my-container-content {
      $leftBoxWidth: 2px;
      $leftBoxHeight: 420px;
      position: relative;
      display: flex;
      .left-box {
        display: flex;
        flex-direction: column;
        .left-box-header {

        }
        .left-box-main {
          line-height: 22px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex-grow: 2;
          // align-
          .left-box-main-header {
            text-align: center;
            padding: 10px 0;
            h4 {
              font-size: 28px;
            }
          }
          .left-box-main-content {
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
          }
        }
      }
      .right-box {
        flex: 1;
        // margin-left: $leftBoxWidth;
        // margin: 0 auto;
        // max-width: 749px;
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-wrap: wrap;
      }
    }
  }
}

</style>
