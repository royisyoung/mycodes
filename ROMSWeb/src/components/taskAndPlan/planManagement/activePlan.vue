<template>
  <div class="activePlan">
    <r-baseFrame class="activePlan-header">
      <r-titleHeader :title="title">
        <div slot="left">
          <a href="javascript:void(0);">切换活动日历</a>
        </div>
        <div slot="right">
          <button>新建活动</button>
          <button @click="openImportFrameHandle">导入计划</button>
        </div>
      </r-titleHeader>
    </r-baseFrame>
    <r-baseFrame class="activePlan-container">
      <section class="top">
        <section>
          <label for="">库存深度</label>
          <r-rangeSlider></r-rangeSlider>
        </section>
        <section class="goodsIdInput">
          <label for="">货品节奏</label>
          <input :class="inputVerify ? 'error' : ''" type="text" v-model="queryStr">
        </section>
        <section class="dateInput">
          <label for="">选择时间</label>
          <select name="" id="">
            <option value="">2017</option>
          </select>
        </section>
        <section class="levelInput">
          <label for="">活动级别</label>
          <select name="" id="" >
            <option value="">一星</option>
          </select>
        </section>
      </section>
      <section class="main">
        <r-activeBox
        :arr-data="queryArr"
        class="activity-box"></r-activeBox>
        <r-activeBox
        :arr-data="queryArr"
        class="activity-box"></r-activeBox>
        <r-activeBox
        :arr-data="queryArr"
        class="activity-box"></r-activeBox>
        <r-activeBox
        :arr-data="queryArr"
        class="activity-box"></r-activeBox>
      </section>
      <section class="bottom">
        <section class="schedule-box">
          活动计划时间表
        </section>
      </section>
    </r-baseFrame>
    <r-importPlanDialog
      :type="importType"
      v-if="importFrameActive"
      :close-handle="closeImportFrameHandle">
    </r-importPlanDialog>
  </div>
</template>

<script>
import baseFrame from '../../common/base/baseFrame'
import titleHeader from '../../common/base/titleHeader'
import importPlanDialog from '../cabin/importPlanDialog'
import activeBox from '../cabin/activeBox'
import rangeSlider from '../cabin/rangeSlider'
export default {
  components: {
    'r-baseFrame': baseFrame,
    'r-titleHeader': titleHeader,
    'r-activeBox': activeBox,
    'r-rangeSlider': rangeSlider,
    'r-importPlanDialog': importPlanDialog,
  },
  data() {
    return {
      title: '活动计划',
      queryStr: '',
      importType: 0,
      importFrameActive: false,
    }
  },

  methods: {
    openImportFrameHandle: function() {
      this.importType = 3;
      this.importFrameActive = true;
    },
    closeImportFrameHandle:function() {
      this.importFrameActive = false;
    }
  },
  computed: {
    date: () => new Date(),
    queryArr: function() {
      return this.queryStr.split(',');
    },
    inputVerify: function() {
      return this.queryStr.match(new RegExp(/[^,|\d]/, 'g'));
    }
  }
}
</script>

<style lang='scss' scoped>
.activePlan {
  .activePlan-container {
    >section {
      margin: 10px 0;
    }
    .top, .main {
      display: flex;
      justify-content: space-between;
    }

    $topHeight: 40px;
    .top {
      padding: 0 20px;
      >section {
        display: flex;
        align-items: center;
        label {
          // display: flex;
        }
      }
      .goodsIdInput {
        input.error {
          outline-color: red;
        }
      }
    }
    .main {
      .activity-box {
      }
    }
    .bottom {
      .schedule-box {
        background: #528B8B;
        height: 350px;
        border-radius: 10px;
      }
    }
  }
}

</style>
