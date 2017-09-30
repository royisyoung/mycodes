<template>
  <div class="activityWarnSetting">
    <h1>活动预警参数设置</h1>
    <div class="operation">
      活动分级：
      <select v-model="selected">
        <option value="">-- 请选择 --</option>
        <option v-for="(item,index) in options" :key="index+date" :value="item.gradeName">{{item.gradeName}}</option>
      </select>
      <div class="buttonOperaton">
        <input type="button" value="查询" @click="activityWarnQuery(selected)">
        <input type="button" value="新建" @click="activityWarnAdd()">
        <input type="button" value="导入" @click="importTempletModal()">
      </div>
    </div>
    <div class="activityWarnContent">
      <table>
        <caption>本店活动预警数据系统配置表</caption>
          <thead>
            <tr>
              <th>活动星级</th>
              <th>活动访客数均值</th>
              <th>活动访客数误差值</th>
              <th>活动客单价均值</th>
              <th>活动客单价误差值</th>
              <th>活动转化率</th>
              <th>活动转化率误差值</th>
              <th>活动备注</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableDataList" :key="(index+date)">
              <td>{{item.gradeName}}</td>
              <template v-for="(detail,key) in item.actionGradeDetailList">
                <td v-if="detail.targetId===5">{{formateNumber((detail.valueMax+detail.valueMin)/2)}}</td>
                <td v-if="detail.targetId===5">{{formateNumber((detail.valueMax-(detail.valueMax+detail.valueMin)/2)/((detail.valueMax+detail.valueMin)/2))}}</td>
                <td v-if="detail.targetId===1">{{formateNumber((detail.valueMax+detail.valueMin)/2)}}</td>
                <td v-if="detail.targetId===1">{{formateNumber((detail.valueMax-(detail.valueMax+detail.valueMin)/2)/((detail.valueMax+detail.valueMin)/2))}}</td>
                <td v-if="detail.targetId===3">{{formateNumber((detail.valueMax+detail.valueMin)/2)}}</td>
                <td v-if="detail.targetId===3">{{formateNumber((detail.valueMax-(detail.valueMax+detail.valueMin)/2)/((detail.valueMax+detail.valueMin)/2))}}</td>
              </template>
              <td>{{item.gradeNote}}</td>
              <td>
                <a href="javascript:void(0)" @click="editActivityWarnData(item.id,item)">修改</a>
                <a href="javascript:void(0)" @click="activityWarnDel(item.id,item)">删除</a>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
    <!--新建弹出框-->
    <div class="activityWarnAdd" v-show="activityWarnShow"> 
      <div class="close">
        <span>新建活动预警参数配置</span>
        <span @click="close()">×</span>
      </div>
      <form class="activityWAddContent"  @submit.prevent="submit">
        活动分级  
        <select v-model="mSelected">
          <option value=''>--请选择--</option>
          <option v-for="(item,index) in mOptions" :value="item.value" :key="(index+date)">{{item.value}}</option>
        </select>
        <br>
        活动访客数
        <input type="text" placeholder="请输入平均值" required="required" v-model="activityAddData.visitorsNumberAverage">
        <input type="text" placeholder="请输入误差值" required="required" v-model="activityAddData.visitorsNumberError">%
        <br>
        活动客单价
        <input type="text" placeholder="请输入平均值" required="required" v-model="activityAddData.averageUnitPrice">
        <input type="text" placeholder="请输入误差值" required="required" v-model="activityAddData.unitPriceError">%
        <br>
        活动转化率
        <input type="text" placeholder="请输入平均值" required="required" v-model="activityAddData.averageConversionRate">
        <input type="text" placeholder="请输入误差值" required="required" v-model="activityAddData.conversionError">%
        <br>
        活动备注
        <input type="text" placeholder="请输入活动备注" v-model="activityAddData.gradeNote">
        <br>
        <input type="hidden" v-model="activityAddData.id">
        <br>
        <div class="btnOperation">
          <input type="submit" value="确定">
          <input type="button" value="取消" @click="close">
        </div>
      </form>
    </div>

    <!--下载上传模板弹出框-->
    <div class="importTemplet" v-show="importTempletShow">
      <div class="close">
        <span>导入活动预警参数</span>
        <span @click="close()">×</span>
      </div>
      <!--<form class="importTempletContent"  method="post" @submit.prevent>
        <div>
          <div class="download">
            <a href="http://10.8.51.77:8080/RomsService/action/actionGrade/downLoadFile?fileName=%E6%B4%BB%E5%8A%A8%E9%A2%84%E8%AD%A6%E6%A8%A1%E6%9D%BF.xlsx&g_token=83b1b4da8941a86dcbc442f195a71bc2&g_userId=1&g_time=2017-09-28%2014%3A05%3A12" @click="downloadTemplet()">活动预警参数配置模板下载</a>
          </div>
          <div class="upload">
            <input type="file" name="file">
          </div>
        </div>
        <div class="btnOperation">
          <input type="submit" value="确定" @click="upload()">
          <input type="button" value="取消">
        </div>
      </form>-->
      <form enctype="multipart/form-data" method="post" action="http://10.88.26.114:8080/ROMSService/action/actionGrade/uploadFile?g_userId=1&shopId=1" >
  上传文件：<input type="file" name="file1"><br/>
<input type="hidden" value="1" name="g_userId">
<input type="hidden" value="1" name="shopId">
<input type="submit" value="提交">
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
      fileValue:"",
      //下拉列表被选中的值,获取的是value值
      selected:'',
      //select数据
      options:[
        {gradeName:"一星"},
        {gradeName:"二星"},                                        
        {gradeName:"三星"},
        {gradeName:"四星"},
        {gradeName:"五星"},
        {gradeName:"六星"}
      ],
      //弹出框的select的数据
      mSelected:'',
      mOptions:[
        {value:"一星"},
        {value:"二星"},
        {value:"三星"},
        {value:"四星"},
        {value:"五星"},
        {value:"六星"}
      ],
      visitedCount:{},
      unitPrice:{},
      conversionPercent:{},
      tableDataList:[],
      //新建表单的数据
      activityAddData:{
        visitorsNumberAverage:"",
        visitorsNumberError:"",
        averageUnitPrice:"",
        unitPriceError:"",
        averageConversionRate:"",
        conversionError:"",
        gradeNote:"",
        id:""
      },
      file:""
    }
  },
  computed:{
    date:function(){
      return new Date();
    }
  },
  created(){
    //进入页面获取列表
    this.getActivityWarnList({
      shopId:1,
      pageNo:1,
      pageSize:5
    })
    console.log(this.formateNumber(500));
  },
  methods:{
    //小数
      //三位一逗且保留两位有效数字
    formateNumber : function(number){
      // number = number.replace(/\,/g, "");
      if(isNaN(number) || number == "")return "";
      number = Math.round(number * 100) / 100;
      return number;
    },

    //保留两位有效数字
    outputcents : function (amount) {
      amount = Math.round(((amount) - Math.floor(amount)) * 100);
      return (amount < 10 ? '.0' + amount : '.' + amount);
    },
    //公共获取列表
    getActivityWarnList:function(params){
      api.activityWarn.activityWarnSetting(params)
      .then(response=>{
        console.log(response);
        this.tableDataList=response.data.list;
      })
    },
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
      //弹出框里面的内容为空,下拉列表也为空
      this.activityAddData={};
      this.mSelected='';

    },
    //点击查询，传入对应gradeName
    activityWarnQuery:function(gradeName){
      this.tableDataList=[];
      this.getActivityWarnList({
        shopId:1,
        gradeName:gradeName,
        pageNo:1,
        pageSize:5
      })
    },
    //删除
    activityWarnDel:function(id,item){
      api.activityWarn.activityWarnEnable(id);
      // 获取对象数组中，指定对象的下标
        function getRoleIndex(_arr,_obj) {
          var len = _arr.length;
          for(var i = 0; i < len; i++){
            if(_arr[i] == _obj){
              return parseInt(i);
            }
          } 
            return -1;
        };    
        var index= getRoleIndex(this.tableDataList,item)
        this.tableDataList.splice(index,1);
    },
    //新建保存
    submit:function(){
      //判断id不存在的话就是新建保存，存在就是编辑保存
      if(this.activityAddData.id==undefined || this.activityAddData.id==""){
        //算出最大值和最小值
          var actionGradeArray=[];
          var obj1={},obj2={},obj3={},activitySaveData={};
          //客单价
          var averageUnitPrice=this.activityAddData.averageUnitPrice;
          var unitPriceError=this.activityAddData.unitPriceError;
          var uvalueMax=(unitPriceError/100)*averageUnitPrice+Number(averageUnitPrice);
          var uvalueMin=averageUnitPrice*2-uvalueMax;
          obj1={
            targetId:1,
            averageUnitPrice:averageUnitPrice,
            valueMax:uvalueMax,
            valueMin:uvalueMin
          }
          //访客数
          var visitorsNumberAverage=this.activityAddData.visitorsNumberAverage;
          var visitorsNumberError=this.activityAddData.visitorsNumberError;
          var vvalueMax=(visitorsNumberError/100)*visitorsNumberAverage+Number(visitorsNumberAverage);
          var vvalueMin=visitorsNumberAverage*2-vvalueMax;
          obj2={
            targetId:5,
            visitorsNumberAverage:visitorsNumberAverage,
            valueMax:vvalueMax,
            valueMin:vvalueMin
          }
          //转化率
          var averageConversionRate=this.activityAddData.averageConversionRate;
          var conversionError=this.activityAddData.conversionError;
          var cvalueMax=(conversionError/100)*averageConversionRate+Number(averageConversionRate);
          var cvalueMin=averageConversionRate*2-cvalueMax;
          obj3={
            targetId:3,
            averageConversionRate:averageConversionRate,
            valueMax:cvalueMax,
            valueMin:cvalueMin
          },
          activitySaveData={
            visitorsNumberAverage:obj2.valueMax,
            visitorsNumberError:obj2.valueMin,
            averageUnitPrice:obj1.valueMax,
            unitPriceError:obj1.valueMin,
            averageConversionRate:obj3.valueMax,
            conversionError:obj3.valueMin,
            gradeName:this.mSelected,
            gradeNote:this.activityAddData.gradeNote, 
            shopId:1
          },
          console.log(activitySaveData);
        api.activityWarn.activityWarnSave(activitySaveData)
        .then(response=>{
          console.log(activitySaveData);
          //将对象放在这个数组当中

          //把这些对象放在一个数组里面，然后在放在一个对象里
          actionGradeArray.push(obj2);
          actionGradeArray.push(obj1);
          actionGradeArray.push(obj3);
          var obj4={};
          obj4.gradeName=this.mSelected;
          obj4.gradeNote=this.activityAddData.gradeNote;
          obj4.actionGradeDetailList=actionGradeArray;
          this.tableDataList.push(obj4);
          console.log(this.tableDataList);
          console.log(obj4); 
          console.log(this.tableDataList);//数据正常
          this.activityWarnShow=false;
        })
      }
      else {
        var _this=this;
        this.activityAddData.shopId=1;
        console.log(this.activityAddData);
          //算出最大值和最小值
          var actionGradeArray=[];
          var obj1={},obj2={},obj3={},activitySaveData={};
          //客单价
          var averageUnitPrice=this.activityAddData.averageUnitPrice;
          var unitPriceError=this.activityAddData.unitPriceError;
          var uvalueMax=(unitPriceError/100)*averageUnitPrice+Number(averageUnitPrice);
          var uvalueMin=averageUnitPrice*2-uvalueMax;
          obj1={
            targetId:1,
            averageUnitPrice:averageUnitPrice,
            valueMax:uvalueMax,
            valueMin:uvalueMin
          }
          //访客数
          var visitorsNumberAverage=this.activityAddData.visitorsNumberAverage;
          var visitorsNumberError=this.activityAddData.visitorsNumberError;
          var vvalueMax=(visitorsNumberError/100)*visitorsNumberAverage+Number(visitorsNumberAverage);
          var vvalueMin=visitorsNumberAverage*2-vvalueMax;
          obj2={
            targetId:5,
            visitorsNumberAverage:visitorsNumberAverage,
            valueMax:vvalueMax,
            valueMin:vvalueMin
          }
          //转化率
          var averageConversionRate=this.activityAddData.averageConversionRate;
          var conversionError=this.activityAddData.conversionError;
          var cvalueMax=(conversionError/100)*averageConversionRate+Number(averageConversionRate);
          var cvalueMin=averageConversionRate*2-cvalueMax;
          obj3={
            targetId:3,
            averageConversionRate:averageConversionRate,
            valueMax:cvalueMax,
            valueMin:cvalueMin
          },
          activitySaveData={
            visitorsNumberAverage:obj2.valueMax,
            visitorsNumberError:obj2.valueMin,
            averageUnitPrice:obj1.valueMax,
            unitPriceError:obj1.valueMin,
            averageConversionRate:obj3.valueMax,
            conversionError:obj3.valueMin,
            gradeName:this.mSelected,
            gradeNote:this.activityAddData.gradeNote, 
            shopId:1,
            id:this.activityAddData.id
          },
        api.activityWarn.activityWarnEditSave(activitySaveData)
        .then(response=>{
          console.log("这里是编辑保存功能")
          console.log(response);
           this.tableDataList.forEach(function(data,index){
            if(data.id==_this.activityAddData.id){
              // //将对象放在这个数组当中
              // var actionGradeArray=[];
              // var obj1={},obj2={},obj3={};
              // //客单价
              // var averageUnitPrice=_this.activityAddData.averageUnitPrice;
              // var unitPriceError=_this.activityAddData.unitPriceError;
              // var uvalueMax=(unitPriceError/100)*averageUnitPrice+Number(averageUnitPrice);
              // var uvalueMin=averageUnitPrice*2-uvalueMax;
              // obj1={
              //   targetId:1,
              //   averageUnitPrice:averageUnitPrice,
              //   valueMax:uvalueMax,
              //   valueMin:uvalueMin
              // }
              // //访客数
              // var visitorsNumberAverage=_this.activityAddData.visitorsNumberAverage;
              // var visitorsNumberError=_this.activityAddData.visitorsNumberError;
              // var vvalueMax=(visitorsNumberError/100)*visitorsNumberAverage+Number(visitorsNumberAverage);
              // var vvalueMin=visitorsNumberAverage*2-vvalueMax;
              // obj2={
              //   targetId:5,
              //   visitorsNumberAverage:visitorsNumberAverage,
              //   valueMax:vvalueMax,
              //   valueMin:vvalueMin
              // }
              // //转化率
              // var averageConversionRate=_this.activityAddData.averageConversionRate;
              // var conversionError=_this.activityAddData.conversionError;
              // var cvalueMax=(conversionError/100)*averageConversionRate+Number(averageConversionRate);
              // var cvalueMin=averageConversionRate*2-cvalueMax;
              // obj3={
              //   targetId:3,
              //   averageConversionRate:averageConversionRate,
              //   valueMax:cvalueMax,
              //   valueMin:cvalueMin
              // }

              //把这些对象放在一个数组里面，然后在放在一个对象里
              actionGradeArray.push(obj2);
              actionGradeArray.push(obj1);
              actionGradeArray.push(obj3);
              var obj4={};
              obj4.gradeName=_this.mSelected;
              obj4.actionGradeDetailList=actionGradeArray;
              //让data和obj4相等
              obj4.gradeNote=_this.activityAddData.gradeNote;
              console.log(obj4);
              _this.tableDataList[index]=obj4;
            }
          })
          this.activityWarnShow=false;
        })
      }
    },
    //点击编辑，获取用户信息
    editActivityWarnData:function(id,item){
      console.log(id);
      var _this=this;
      this.activityWarnShow=true;
      api.activityWarn.activityWarnEdit({
        id:id
      })
      .then(response=>{
        var _this=this;
        console.log(response);
        //把数据渲染到弹出框中
        this.mSelected=response.data[0].gradeName;
        console.log(this.mSelected);
        this.activityAddData.gradeNote=response.data[0].gradeNote;
        this.activityAddData.id=response.data[0].id;
        //遍历对应的actionGradeDetailList
        response.data[0].actionGradeDetailList.forEach(function(data,index){
          if(data.targetId==5){
            //访客数
            _this.activityAddData.visitorsNumberAverage=_this.formateNumber((data.valueMax+data.valueMin)/2);
            console.log(_this.activityAddData.visitorsNumberAverage)
            _this.activityAddData.visitorsNumberError=_this.formateNumber((data.valueMax-(data.valueMax+data.valueMin)/2)/((data.valueMax+data.valueMin)/2)*100);
          }
          //客单价
          if(data.targetId==1) {
            _this.activityAddData.averageUnitPrice=_this.formateNumber((data.valueMax+data.valueMin)/2);
            _this.activityAddData.unitPriceError=_this.formateNumber((data.valueMax-(data.valueMax+data.valueMin)/2)/((data.valueMax+data.valueMin)/2)*100);
          }
          //转化率
          if(data.targetId==3){
            _this.activityAddData.averageConversionRate=_this.formateNumber((data.valueMax+data.valueMin)/2);
             _this.activityAddData.conversionError=_this.formateNumber((data.valueMax-(data.valueMax+data.valueMin)/2)/((data.valueMax+data.valueMin)/2)*100);
          }
        })
        console.log(_this.activityAddData);
      })
    },
    //导入功能
    importTempletModal:function(){
      this.importTempletShow=true;
    },
    //下载模板
    downloadTemplet:function(){
      api.activityWarn.downloadTemplet({
        
      })
      .then(response=>{
        console.log("请求成功");
      })
    }
    //上传模板修改
    // upload:function(){
    //   this.$.ajax({
    //     url:'http://10.88.26.114:8080/ROMSService/action/actionGrade/uploadFile?g_userId=1&shopId=1',
    //     type:'post',
    //     contentType:'multipart/form-data',
    //     success:function(data){
    //       console.log(data);
    //     },
    //     error:function(error){
    //       console.log(error);
    //     }
    //   })
    // }
    // },
    //  //上传模板
    // getFile(event) {
    //   this.file = event.target.files[0];
    //   console.log(this.file);
    // },
    // submitForm(event) {
    //   event.preventDefault();
    //   var formData = new FormData();
    //   console.log(formData);
    //   formData.append('g_token','7f4b9c2ab3b9a9d4389adb439b88ce6a');
    //   formData.append('g_time','2017-09-27 12:12:12');
    //   formData.append('g_userId',1);
    //   formData.append('shopId',1);
    //   formData.append('file', this.file);
      // formData.file=this.file;
      // formData.g_token= "7f4b9c2ab3b9a9d4389adb439b88ce6a";
      // formData.g_time="2017-09-27 10:12:12";
      // formData.g_userId=1;
      // formData.shopId=1;
      // console.log(formData.get("g_token"));
      //为什么formData值为空  是有值的
  
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
  
      // this.$http.post('http://10.8.51.85:8080/RomsService/action/actionGrade/uploadFile', formData, config).then(function (res) {
      //   console.log("进来")
      //   console.log(res);
      // })
    //      this.$.ajax({  
    //       url: 'http://10.8.51.85:8080/RomsService/action/actionGrade/uploadFile' ,  
    //       type: 'POST',  
    //       data: formData,  
    //       async: false,  
    //       cache: false,  
    //       contentType: false,  
    //       processData: false,  
    //       success: function (returndata) {  
    //           alert(returndata);  
    //       },  
    //       error: function (returndata) {  
    //           alert(returndata);  
    //       }  
    //  }); 
    // }
    // doUpload:function(){
    //   var formData = new FormData(this.$( "#uploadForm" )[0]);  
    //   this.$.ajax({  
    //       url: 'http://10.8.51.85:8080/RomsService/action/actionGrade/uploadFile' ,  
    //       type: 'POST',  
    //       data: formData,  
    //       async: false,  
    //       cache: false,  
    //       contentType: false,  
    //       processData: false,  
    //       success: function (returndata) {  
    //           alert(returndata);  
    //       },  
    //       error: function (returndata) {  
    //           alert(returndata);  
    //       }  
    //  });  
    // }
   

  }
}

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


