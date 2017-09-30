<template>
  <r-circularFrame class='activeBox'>
    <div class="activeInfo">
      <div class="activeInfo-top">
        <div class="activeDate">
          <div>8/10</div>
          <div>一</div>
        </div>
        <div class="activeDate">
          <div>8/10</div>
          <div>二</div>
        </div>
        <div class="activeDate">
          <div>8/10</div>
          <div>四</div>
        </div>
      </div>
      <div class="activeInfo-middle">
        <div>
          <h5>夏练节</h5>
        </div>
        <div>
          <img src="../../../assets/imgs/common/star.png" alt="">
          <img src="../../../assets/imgs/common/star.png" alt="">
        </div>
      </div>
      <div class="activeInfo-bottom">
        <div>
          <h5>促销</h5>
        </div>
        <div>
          商品促销
        </div>
      </div>
    </div>
    <div class="activeGoods">
      <ul>
        <li :class="this.queryId(123156) ? 'highlight' : ''">
          <div class="goodsId">
            <h5>123156</h5>
          </div>
          <div class="goodsStock">
            <h5>3k</h5>
          </div>
          <div class="goodsPrice">
            <h5>￥356</h5>
          </div>
        </li>
        <li>
          <div class="goodsId">
            <h5>123156</h5>
          </div>
          <div class="goodsStock">
            <h5>3k</h5>
          </div>
          <div class="goodsPrice">
            <h5>￥356</h5>
          </div>
        </li>
        <li>
          <div class="goodsId">
            <h5>123156</h5>
          </div>
          <div class="goodsStock">
            <h5>3k</h5>
          </div>
          <div class="goodsPrice">
            <h5>￥356</h5>
          </div>
        </li>
      </ul>
    </div>
    <div class="activePutOn">
      <div class="activePutOn-header">
        <div class="title">
          <h5>MKT投放（直通车）</h5>
        </div>
        <div class="switch">
          <el-tooltip :content="switchActive ? '玫瑰图' : '嵌套环形图'" placement="top">
            <el-switch
              v-model="switchActive"
              on-color="#5CACEE"
              off-color="#5CACEE"
              on-text=""
              off-text=""
              :on-value="false"
              :off-value="true">
            </el-switch>
          </el-tooltip>
        </div>
      </div>
      <div class="activePutOn-container">
        <div class="title">
          <h5>投放总金额：50k</h5>
        </div>
        <div class="chartsboard" ref="board">
          <r-nightingale
          width="100%"
          height="320px"
          v-if="switchActive">
          </r-nightingale >
          <r-ringDiagram 
          width="100%"
          height="320px"
          v-else>
          </r-ringDiagram>
        </div>
        <div>
          <r-wordCloud
          width="100%"
          height="150px">
          </r-wordCloud>
        </div>
      </div>
    </div>
    <div class="activeContent">
      <div class="activeContent-header">
        <h5 class="title">内容</h5>
      </div>
      <div class="activeContent-container">
        <ul class="clearfix">
          <li>
            <p>
              <span class="icon green"></span>
              <span>种草</span>
            </p>
          </li>
          <li>
            <p>
              <span class="icon skyblue"></span>
              <span>达人</span>
            </p>
          </li>
          <li>
            <p>
              <span class="icon blue"></span>
              <span>淘宝客</span>
            </p>
          </li>
          <li>
            <p>
              <span class="icon purple"></span>
              <span>微淘</span>
            </p>
          </li>
          <li>
            <p>
              <span class="icon pink"></span>
              <span>买家秀</span>
            </p>
          </li>
        </ul>
        <table class="content-table" cellpadding="2" cellspacing="2">
          <tr>
            <td  :class="this.queryId(5566) ? 'highlight' : ''">5566</td>
            <td>
              <span :class="false ? 'green' : ''"></span>
            </td>
            <td>
              <span class="skyblue"></span>
            </td>
            <td>
              <span class="blue"></span>
            </td>
            <td>
              <span class="purple"></span>
            </td>
            <td>
              <span class="pink"></span>
            </td>
          </tr>
          <tr>
            <td>12345</td>
            <td>
              <span class="green"></span>
            </td>
            <td>
              <span class="skyblue"></span>
            </td>
            <td>
              <span class="blue"></span>
            </td>
            <td>
              <span class="purple"></span>
            </td>
            <td>
              <span class="pink"></span>
            </td>
          </tr>
          <tr>
            <td>12345</td>
            <td>
              <span class="green"></span>
            </td>
            <td>
              <span class="skyblue"></span>
            </td>
            <td>
              <span class="blue"></span>
            </td>
            <td>
              <span class="purple"></span>
            </td>
            <td>
              <span class="pink"></span>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </r-circularFrame>
</template>

<script>
import circularFrame from '../../common/base/circularFrame'
import nightingale from '../cabin/nightingaleRoseDiagram'
import ringDiagram from '../cabin/ringDiagram'
import wordCloud from '../cabin/wordCloud'
export default {
  components:{
    'r-circularFrame': circularFrame,
    'r-nightingale': nightingale,
    'r-ringDiagram': ringDiagram,
    'r-wordCloud': wordCloud,
  },
  name: '',
  props: {
    arrData:{
      type: Array,
      required: true
    }
  },
  data() {
    return {
      infoActive: false,
      goodsActive: false,
      putOnActive: false,
      contentActive: false,
      switchActive: true,
    }
  },
  mounted() {
    // console.log(this.$refs.board.s);
    // const arr = ['456', 123];
    // console.log(this.queryId(arr, 123));
  },
  methods: {
    queryId: function(key) {
      const arr = this.$props.arrData;
      return this.$_.findIndex(arr, item => item == key) > -1 ? true : false
    }
  }
}
</script>

<style lang='scss' scoped>
$green: #48cfae;
$skyblue: #50c0e8;
$blue: #5d9cec;
$purple: #ac92ed;
$pink: #ec87bf;
.activeBox {
  width: 300px;
  // height: 1170px;
  background: #fff;
  border-radius: 10px;
  text-align: center;
  >div {
    border-bottom: 1px dashed #cccccc;
    padding: 5px;
  }
  >div:last-child {
    border: none;
  }
  .activeInfo {
    .activeInfo-top {
      display: flex;
      justify-content: space-around;
      .activeDate {
        // display: inline-block;
      }
    }
    .activeInfo-middle, .activeInfo-bottom {
      display: flex;
      align-items: center;
      padding: 3px 0;
      >div {
        flex: 1;
      }
    }
    .activeInfo-bottom {

    }
  }
  .activeGoods {
    ul>li {
      height: 28px;
      display: flex;
      align-items: center;
      >div {
        flex: 1;
      }
      .goodsId {
        text-align: left;
      }
      .goodsStock, .goodsPrice {
        text-align: right;
      }
    }
    li.highlight {
      color: #FF6347;
    }
  }
  .activePutOn {
    .activePutOn-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .activePutOn-container {
      .title {
        text-align: right;
      }
      .chartsboard {
      }
    }
  }
  .activeContent {
    .activeContent-header {
      text-align: left;
    }
    .activeContent-container {
      .green {
        background-color: $green;
      }
      .skyblue {
        background-color: $skyblue;
      }
      .blue {
        background-color: $blue;
      }
      .purple {
        background-color: $purple;
      }
      .pink {
        background-color: $pink;
      }
      ul {
        display: flex;
        justify-content: space-around;
      }
      ul>li {
        p .icon {
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 3px;
        }
      }
      .content-table {
        margin-top: 10px;
        td {
          width: 50px;
          height: 16px;
          padding: 0 1px;
          span {
            display: block;
            width: 100%;
            height: 5px;
          }
        }
        td.highlight {
          color: #FF6347;
        }
      }
    }
  }
}
</style>
