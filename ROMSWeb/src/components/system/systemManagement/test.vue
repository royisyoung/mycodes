<template>
  <div class="activityWarnSetting">
    <h1>活动预警参数设置</h1>
    <div class="operation">
      活动分级：
      <select v-model="selected">
        <!--<option v-for="(val,key) in options" :key="key+date" :value="val.id">{{val.gradeName}}</option>-->
      </select>
      <div class="buttonOperaton">
        <input type="button" value="查询" >
        <input type="button" value="新建" @click="activityWarnAdd()">
        <input type="button" value="导入">
      </div>
    </div>
    <div class="activityWarnContent">
      <!--<table>
        <caption>本店活动预警数据系统配置表</caption>
          <thead>
            <tr>
              <th>活动星级</th>
              <th>1</th>
              <th>活动访客数误差值</th>
              <th>1</th>
              <th>活动客单价误差值</th>
              <th>1</th>
              <th>活动转化率误差值</th>
              <th>活动备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item1,index1) in tableDataList" :key="(index1+date)">
              <td>{{item1.gradeName}}</td>
              <template v-for="item2 in item1.actionGradeDetailList">
                <td>{{item2[1].averageValue}}</td>
                <td>{{item2[1].limitValue}}</td>  
              </template>
              <td>{{item1.gradeNote}}</td>
              <td>
                <a href="javascript:void(0)">修改</a>
                <a href="javascript:void(0)" >删除</a>
              </td>
            </tr>
          </tbody>
      </table>-->
      <ul>
      <!-- 通过template标签，可以一次循环，输出两个li标签 -->
        <template v-for="item in items">
          <li>{{ item.msg }}</li>
          <li class="divider"></li>
        </template>
      </ul>
    </div>
    <!--新建弹出框-->
    <div class="activityWarnAdd" v-show="activityWarnShow"> 
      <div class="close">
        <span>新建活动预警参数配置</span>
        <span @click="close()">×</span>
      </div>
      <form class="activityWAddContent"  @submit.prevent="submitSave($event)">
        活动分级 
        <select v-model="activityAddData.selected">
          <option value="一星" name="">一星</option>
          <option value="二星" name="">二星</option>
          <option value="三星" name="">三星</option>
          <option value="四星" name="">四星</option>
          <option value="五星" name="">五星</option>
        </select>
        <br>
        活动访客数
        <input type="text" placeholder="请输入平均值" required="required" v-model="activityAddData.visitedCount">
        <input type="text" placeholder="请输入误差值" required="required" v-model="activityAddData.visitedCountLimit">%
        <br>
        活动客单价
        <input type="text" placeholder="请输入平均值" required="required" v-model="activityAddData.unitPrice">
        <input type="text" placeholder="请输入误差值" required="required" v-model="activityAddData.unitPriceLimit">%
        <br>
        活动转化率
        <input type="text" placeholder="请输入平均值" required="required" v-model="activityAddData.conversionPercent">
        <input type="text" placeholder="请输入误差值" required="required" v-model="activityAddData.conversionPercentLimit">%
        <br>
        活动备注
        <input type="text" placeholder="请输入活动备注" v-model="activityAddData.remarks">
        <br>
        <div class="btnOperation">
          <input type="submit" value="确定">
          <input type="button" value="取消">
        </div>
      </form>
    </div>

    <!--导入模板弹出框-->
    <div class="importTemplet" v-show="importTempletShow">
      <div class="close">
        <span>导入活动预警参数</span>
        <span @click="close()">×</span>
      </div>
      <form class="importTempletContent">
        <p>请下载活动预警参数配置模板，按格式填写后再上传导入。</p>
        <div>
          <div class="download">
            <a href="javascript:void(0)">
              活动预警参数配置模板下载
            </a>
          </div>
          <div class="upload">
            <input type="button" value="上传">
          </div>
        </div>
        <div class="btnOperation">
          <input type="button" value="确定">
          <input type="button" value="取消">
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import api from '@/api'
export default {
  data(){
    return {
      activityWarnShow:false,
      importTempletShow:false,
      //下拉列表被选中的值,获取的是value值
      selected:'',
      //select数据
      options:[],
      visitedCount:{},
      unitPrice:{},
      conversionPercent:{},
      tableDataList:[],
      //新建表单的数据
      activityAddData:{
        selected:"",
        visitedCount:"",
        visitedCountLimit:"",
        unitPrice:"",
        unitPriceLimit:"",
        conversionPercent:"",
        conversionPercentLimit:"",
        remarks:""
      }
    }
  },
  computed:{
    date:function(){
      return new Date();
    }
  },
  created(){
    //活动预警列表
    api.activityWarn.activityWarnSetting()
    .then(response=>{
      var _this=this;
      console.log(response);
      var activityList=response.data;
      //循环遍历activityList
      activityList.forEach(function(data,index){
        var actionGradeDetailList=data.actionGradeDetailList;
        var count=0;
        console.log(actionGradeDetailList);
        actionGradeDetailList.forEach(function(data,index){
            count++;
            if(count>3) {
              return;
            }
            //具体哪一项
            var targetId=data.targetId;
            //计算误差值
            var baseValue=(data.valueMax+data.valueMin)/2;
            var limitValue=(data.valueMax-baseValue)/baseValue;
            actionGradeDetailList.push({
              targetId:targetId,
              averageValue:baseValue,
              limitValue:limitValue
            })
        })
        //得到了每一行的所有对象
        console.log(actionGradeDetailList);
        //6组数据分成3种
        var visitedCount=[];
        var unitPrice=[];
        var conversionPercent=[];
        actionGradeDetailList.forEach(function(data,index){
          if(data.targetId==1) {
            visitedCount.push(data);
          }
          if(data.targetId==2){
            conversionPercent.push(data);
          }
          if(data.targetId==3){
            unitPrice.push(data);
          }
        })
        actionGradeDetailList=[];
        actionGradeDetailList.push(visitedCount);
        actionGradeDetailList.push(unitPrice);
        actionGradeDetailList.push(conversionPercent);
        console.log(actionGradeDetailList);
      })  
      
      // ---------------------------------
      // activityList.forEach(function(data,index){
      //   if(data.targetId==3){
      //     console.log(333);
      //     _this.unitPrice=data;
      //   }
      //   if(data.targetId==2){
      //     console.log(222);
      //     _this.conversionPercent=data;
      //   }
      //   if(data.targetId==1){
      //     console.log(111); 
      //     _this.visitedCount=data;        
      //   }
      // })
      // console.log(_this.unitPrice);
      // console.log(_this.conversionPercent);
      // console.log(_this.visitedCount);
      // --------------------
    })
  },

    //活动等级列表
    // api.activityWarn.activityGradeList()
    // .then(response=>{
    //   this.options=response.data;
    // })
  
  methods:{
    //点击新建 新建窗口显示
    activityWarnAdd:function(){
      this.activityWarnShow=true;
    },
   //点击导入 导入窗口显示
    importTempletAdd:function(){
      this.importTempletShow=true;
    },
    //点击关闭按钮，弹出窗口关闭
    close:function(){
      this.activityWarnShow=false;
      this.importTempletShow=false;
    },
  //   //点击查询，传入对应id
  //   activityWarnQuery:function(ids){
  //     console.log(this.selected);
  //     api.activityWarn.activityGradeList({id:ids})
  //     .then(response=>{
  //       console.log(response);
  //     })
  //   },
  //   //新建保存
    submitSave:function(event){
      console.log(event);
      var formData = new FormData(event.target);
      for(let key in this.activityAddData) {
        formData[key]=this.activityAddData[key];
      }
      console.dir(formData);
      api.activityWarn.activityWarnSave(formData)
      .then(response=>{
        console.log(response);
      })
    }
  }
}
  //   //删除
  //   activityWarnDel:function(id,item){
  //      //获取对象数组中，指定对象的下标
  //        function getRoleIndex(_arr,_obj) {
  //           var len = _arr.length;
  //           for(var i = 0; i < len; i++){
  //             if(_arr[i] == _obj){
  //               return parseInt(i);
  //             }
  //           } 
  //             return -1;
  //         };
  //     api.activityWarn.activityWarnEnable()
  //     .then(response=>{
  //       console.log(response);
  //       var index=getRoleIndex(this.tableDataList,item);
  //       console.log(index);
  //       this.tableDataList.splice(index,1);
  //     })
  //   }


  // }
// }

</script>

<style lang="scss" scoped>
  $borderColor:#b5b5b5;
  .activityWarnSetting {
    position:relative;
    height:550px;
    >h1 {
      font-size:18px;
      font-weight:bold;
    }
    >.operation {
      margin-top:40px;
      margin-bottom:40px;
      font-size:14px;
      >select {
        width:150px;
      }
      >.buttonOperaton {
        float:right;
        margin-right:3%;
        >input[type="button"] {
          width:70px;
          height:30px;
          margin-right:20px;
        }
      }
    }
    >.activityWarnContent {
      >table {
        width:100%;
        >caption {
          color:#000;
          margin-bottom:20px;
          font-size:14px;
        } 
        td,th {
          font-size:14px;
          font-weight:normal;
          border:1px solid $borderColor;
          text-align:center;
          height:30px;
        }
      }
    }
    >.activityWarnAdd {
      position:absolute;
      left:50%;
      top:50%;
      background-color:#fff;
      transform:translate(-50%,-50%);
      width: 270px;
      border: 1px solid $borderColor;
      >.close {
        width: 100%;
        height:30px;
        padding-left:20px;
        padding-right:5px;
        border-bottom:1px solid $borderColor;
        margin-bottom:10px;
        opacity:1;
        >span:first-child {
          font-size:14px;
          color:#191717;
          font-weight:normal;
        }
        >span:last-child {
          display:block;
          float:right;
        }
      }
      >.activityWAddContent {
        padding-left:20px;
        padding-bottom:20px;
        box-sizing:border-box;
        margin-top:5px;
        >select {
          width:160px;
          margin-left:5px;
        }
        >input{
          padding-left:10px;
          margin:10px 0;
          &:nth-of-type(1),&:nth-of-type(3),&:nth-of-type(5){
            width:150px;
          }
          &:nth-of-type(2),&:nth-of-type(4),&:nth-of-type(6) {
            margin-left:64px;
            margin-right:10px;
          }
          &:nth-of-type(7) {
            width:160px;
          }
        }
        >.btnOperation {
          text-align:center;
          >input[type="button"] {
          width:50px;
          height: 20px;
          text-align:center;
          }
        }
        >.save {
          margin-left:50px;
          margin-right:30px;
        }
      } 
    }
    >.importTemplet {
      position:absolute;
      left:50%;
      top:50%;
      background-color:#fff;
      transform:translate(-50%,-50%);
      width: 406px;
      border: 1px solid $borderColor;
      >.close {
        width: 100%;
        height:30px;
        padding-left:20px;
        padding-right:5px;
        border-bottom:1px solid $borderColor;
        margin-bottom:10px;
        opacity:1;
        >span:first-child {
          font-size:14px;
          color:#191717;
          font-weight:normal;
        }
        >span:last-child {
          display:block;
          float:right;
        }
      }
      >.importTempletContent {
        font-size:14px;
        padding:20px;
        >div {
          padding-left:25px;
          padding-top:15px;
          .download,.upload {
            vertical-align:middle;
            text-align:center;
            display:inline-block;
            width:150px;
            height:60px;
            padding-top:10px;
            border:1px solid $borderColor;
            background-color:#ccc;
            a {
              display:inline-block;
              width:84px;
              height:40px;
            }
            input[type="button"] {
              width:100px;
              height:30px;
              background-color: #fff;
              border:none;
            }
           }
        }
        .btnOperation {
          text-align:center;
          input {
            width: 100px;
            height:30px;
          }
        }
      }
    }
  } 
</style>


