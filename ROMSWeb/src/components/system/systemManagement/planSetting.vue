<template>
  <div class="planSetting">
    <h1>计划设置</h1>
    <div class="operation">
      时间
      <select v-model="ySelected">
        <option value="">-- 请选择 --</option>
        <option v-for="(item,index) in yOptions" :key="(index+date)" :value="item.y">{{item.value}}</option>
      </select>
      <select v-model="mSelected">
        <option value="">-- 请选择 --</option>
        <option v-for="(item,index) in mOptions" :key="(index+date)" :value="item.m">{{item.value}}</option>
      </select>
      <div class="buttonOperaton">
        <input type="button" value="查询" @click="queryPlanList(ySelected,mSelected)">
        <input type="button" value="新建" @click="planSettingAdd">
        <input type="button" value="导入" @click="importTempletAdd">
      </div>
    </div>
    <div class="planSettingContent">
      <table>
          <thead>
            <tr>
              <th>年份</th>
              <th>月份</th>
              <th>客单价平均值</th>
              <th>客单价误差值</th>
              <th>转化率平均值</th>
              <th>转化率误差值</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in planDataList" :key="index+date">
              <td>{{item.y}}</td>
              <td>{{item.m}}</td>
              <template v-for="(detail,key) in item.planBenchmarkDetails">
                <td v-if="detail.targetId==1">{{formateNumber((detail.valueMax+detail.valueMin)/2)}}</td>
                <td v-if="detail.targetId==1">{{formateNumber((detail.valueMax-(detail.valueMax+detail.valueMin)/2)/((detail.valueMax+detail.valueMin)/2))}}</td>
                <td v-if="detail.targetId==3">{{formateNumber((detail.valueMax+detail.valueMin)/2)}}</td>
                <td v-if="detail.targetId==3">{{formateNumber((detail.valueMax-(detail.valueMax+detail.valueMin)/2)/((detail.valueMax+detail.valueMin)/2))}}</td>
              </template>
              <td>
                <a href="javascript:void(0)" @click="editPlanData(item.id)">修改</a>
                <a href="javascript:void(0)" @click="delPlanData(item.id,item)">删除</a>
              </td>
            </tr>
          </tbody>
      </table>
    </div>
    <!--新建弹出框-->
    <div class="planSettingAdd" v-show="planSettingShow"> 
      <div class="close" @click="close()">
        <span>新建计划配置</span>
        <span>×</span>
      </div>
      <form class="planSettingAddContent" @submit.prevent="submit">
        计划年份 
        <select v-model="mySelected">
        <option value="">-- 请选择 --</option>
        <option v-for="(item,index) in myOptions" :key="(index+date)" :value="item.y">{{item.value}}</option>
      </select>
        <br>
        计划月份
       <select v-model="mmSelected">
        <option value="">-- 请选择 --</option>
        <option v-for="(item,index) in mmOptions" :key="(index+date)" :value="item.m">{{item.value}}</option>
      </select>
        <br>
        计划客单价
        <input type="text" v-model="modalAddData.averageUnitPrice">
        <br>
        <input type="text" v-model="modalAddData.unitPriceError">%
        <br>
        计划转化率
        <input type="text" v-model="modalAddData.averageConversionRate">
        <br>
        <input type="text" v-model="modalAddData.conversionError">%
        <br>
        <input type="hidden" v-model="modalAddData.id">
        <br>
        <div class="btnOperation">
          <input type="submit" value="确定">
          <input type="button" value="取消" @click="cancelPlan">
        </div>
      </form>
    </div>

    <!--导入模板弹出框-->
    <div class="importTemplet" v-show="importTempletShow">
      <div class="close">
        <span>导入活动预警参数</span>
        <span @click="close()">×</span>
        <a href="http://10.8.51.102:8080/ROMSService/planBenchmark/downLoadFile?g_token=e94023c8272b06e2d5babc661a585b98&g_userId=1&g_time=2017-09-26%2017%3A12%3A12&fileName=计划配置模板.xlsx">下载</a>
      </div>
      <form  enctype="multipart/form-data" method="post" action="http://10.8.51.102:8080/ROMSService/planBenchmark/uploadFile?g_userId=1&shopId=1">
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
      planSettingShow:false,
      importTempletShow:false,
      //下拉列表被选中的对象
      g_userId:1,
      ySelected:'',
      yOptions:[
        {y:2022,value:"2022年"},
        {y:2021,value:"2021年"},
        {y:2020,value:"2020年"},
        {y:2019,value:"2019年"},
        {y:2018,value:"2018年"},
        {y:2017,value:"2017年"},
        {y:2016,value:"2016年"},
        {y:2015,value:"2015年"},
        {y:2014,value:"2014年"},
        {y:2013,value:"2013年"},
        {y:2012,value:"2012年"},
        {y:2011,value:"2011年"}
      ],
      mSelected:'',
      mOptions:[
        {m:12,value:"12月"},
        {m:11,value:"11月"},
        {m:10,value:"10月"},
        {m:9,value:"9月"},
        {m:8,value:"8月"},
        {m:7,value:"7月"},
        {m:6,value:"6月"},
        {m:5,value:"5月"},
        {m:4,value:"4月"},
        {m:3,value:"3月"},
        {m:2,value:"2月"},
        {m:1,value:"1月"},
      ],
      mySelected:'',
      mmSelected:'',
      myOptions:[
        {y:2022,value:"2022年"},
        {y:2021,value:"2021年"},
        {y:2020,value:"2020年"},
        {y:2019,value:"2019年"},
        {y:2018,value:"2018年"},
        {y:2017,value:"2017年"},
        {y:2016,value:"2016年"},
        {y:2015,value:"2015年"},
        {y:2014,value:"2014年"},
        {y:2013,value:"2013年"},
        {y:2012,value:"2012年"},
        {y:2011,value:"2011年"}
      ],
      mmOptions:[
        {m:12,value:"12月"},
        {m:11,value:"11月"},
        {m:10,value:"10月"},
        {m:9,value:"9月"},
        {m:8,value:"8月"},
        {m:7,value:"7月"},
        {m:6,value:"6月"},
        {m:5,value:"5月"},
        {m:4,value:"4月"},
        {m:3,value:"3月"},
        {m:2,value:"2月"},
        {m:1,value:"1月"},
      ],
      modalAddData:{
        averageUnitPrice:"",
        unitPriceError:"",
        averageConversionRate:"",
        conversionError:"",
        id:""
      },
      planDataList:[]
    }
  },
  computed:{
    date:function(){
      return new Date();
    }
  },
  created(){
    this.getPlanList({
      shopId:1,
      pageNo:1,
      pageSize:5
    })
  },
  methods:{
    //点击新建 新建窗口显示
    planSettingAdd:function(){
      this.planSettingShow=true;
    },
    //点击导入 导入窗口显示
    importTempletAdd:function(){
      this.importTempletShow=true;
    },
    //点击关闭按钮，弹出窗口关闭
    close:function(){
      this.planSettingShow=false;
      this.importTempletShow=false;
    },
    //点击取消按钮，弹出框关闭
    cancelPlan:function(){
      this.planSettingShow=false;
    },
    //公共获取列表
    getPlanList:function(params){
      api.planSetting.planDataList(params)
      .then(response=>{
        console.log(response);
        this.planDataList=response.data.list;
      })
    },
    //三位一逗且保留两位有效数字
    formateNumber : function(number){
      // number = number.replace(/\,/g, "");
      if(isNaN(number) || number == "")return "";
      number = Math.round(number * 100) / 100;
        return number;
    },
    //格式化数字三位一逗
    outputnumber : function (number) {
        if (number.length <= 3)
            return (number == '' ? '0' : number);
        else {
            var mod = number.length % 3;
            var output = (mod == 0 ? '' : (number.substring(0, mod)));
            for (var i = 0; i < Math.floor(number.length / 3); i++) {
                if ((mod == 0) && (i == 0))
                    output += number.substring(mod + 3 * i, mod + 3 * i + 3);
                else
                    output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
            }
            return (output);
        }
    },
    //保留两位有效数字
    outputcents : function (amount) {
      amount = Math.round(((amount) - Math.floor(amount)) * 100);
      return (amount < 10 ? '.0' + amount : '.' + amount);
    },
    //点击查询的时候
    queryPlanList:function(ySelected,mSelected){
      console.log("这是查询功能");
      console.log(ySelected,mSelected);
      this.getPlanList({
        shopId:1,
        pageNo:1,
        pageSize:5,
        y:ySelected,
        m:mSelected
      });
    },
    //点击删除的时候
    delPlanData:function(id,item){
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
      api.planSetting.delPlanData(id)
      .then(response=>{
        var index= getRoleIndex(this.planDataList,item)
        this.planDataList.splice(index,1);
      })
    },
    //新建保存
    submit:function(){
      var _this=this;
      this.modalAddData.y=this.mySelected;
      this.modalAddData.m=this.mmSelected;
      this.modalAddData.shopId=1;
      //当this.modalAddData.id值为空或是undefined 为新增保存,否则为编辑保存
      if(this.modalAddData.id==undefined || this.modalAddData.id=="") {
        var planArray=[];
            var obj1={},obj2={},obj3={},modalSaveData={};
            //客单价
            var averageUnitPrice=this.modalAddData.averageUnitPrice;  
            var unitPriceError=this.modalAddData.unitPriceError;
            var uvalueMax=(unitPriceError/100)*averageUnitPrice+Number(averageUnitPrice);
            var uvalueMin=averageUnitPrice*2-uvalueMax;
            obj1={
            targetId:1,
            averageUnitPrice:averageUnitPrice,
            unitPriceError:unitPriceError,
            valueMax:uvalueMax,
            valueMin:uvalueMin
            }
           //转化率
            var averageConversionRate=this.modalAddData.averageConversionRate;
            var conversionError=this.modalAddData.conversionError;
            var cvalueMax=(conversionError/100)*averageConversionRate+Number(averageConversionRate);
            var cvalueMin=averageConversionRate*2-cvalueMax;
            obj2={
              targetId:3,
              averageConversionRate:averageConversionRate,
              conversionError:conversionError,
              valueMax:cvalueMax,
              valueMin:cvalueMin
            }
            modalSaveData={
              averageUnitPrice:obj1.valueMin,
              unitPriceError:obj1.valueMax,
              averageConversionRate:obj2.valueMin,
              conversionError:obj2.valueMax,
              y:this.mySelected,
              m:this.mmSelected,
              shopId:1
            }
            console.log(modalSaveData);
        api.planSetting.savePlanData(modalSaveData)
        .then(response=>{
          if(response.code==100000) {
            planArray.push(obj1);
            planArray.push(obj2);
            obj3.planBenchmarkDetails=planArray;
            obj3.y=this.mySelected;
            obj3.m=this.mmSelected;
            this.planDataList.push(obj3);
            this.planSettingShow=false;
            this.modalAddData={};
          }
        })
      }
      //编辑保存
      else {
        var planArray=[];
            var obj1={},obj2={},obj3={},modalSaveData={};
            //客单价
            var averageUnitPrice=this.modalAddData.averageUnitPrice;  
            var unitPriceError=this.modalAddData.unitPriceError;
            var uvalueMax=(unitPriceError/100)*averageUnitPrice+Number(averageUnitPrice);
            var uvalueMin=averageUnitPrice*2-uvalueMax;
            obj1={
            targetId:1,
            averageUnitPrice:averageUnitPrice,
            unitPriceError:unitPriceError,
            valueMax:uvalueMax,
            valueMin:uvalueMin
            }
           //转化率
            var averageConversionRate=this.modalAddData.averageConversionRate;
            var conversionError=this.modalAddData.conversionError;
            var cvalueMax=(conversionError/100)*averageConversionRate+Number(averageConversionRate);
            var cvalueMin=averageConversionRate*2-cvalueMax;
            obj2={
              targetId:3,
              averageConversionRate:averageConversionRate,
              conversionError:conversionError,
              valueMax:cvalueMax,
              valueMin:cvalueMin
            }
            modalSaveData={
              averageUnitPrice:obj1.valueMin,
              unitPriceError:obj1.valueMax,
              averageConversionRate:obj2.valueMin,
              conversionError:obj2.valueMax,
              y:this.mySelected,
              m:this.mmSelected,
              shopId:1,
              id:this.modalAddData.id
            }
        api.planSetting.editSavePlanData(modalSaveData)
        .then(response=>{
          //遍历整个数据集，找到对应的id
          this.planDataList.forEach(function(data,index){
            if(data.id==modalSaveData.id) {
              // //拆对象
              // obj1={
              //   targetId:1,
              //   averageUnitPrice:Number(_this.modalAddData.averageUnitPrice),
              //   conversionError:Number(_this.modalAddData.conversionError)
              // },
              // obj2={
              //   targetId:3,
              //   averageConversionRate:Number(_this.modalAddData.averageConversionRate),
              //   unitPriceError:Number(_this.modalAddData.unitPriceError)
              // }
              data.planBenchmarkDetails=[];
              data.planBenchmarkDetails.push(obj1);
              data.planBenchmarkDetails.push(obj2);
              data.y=_this.mySelected;
              data.m=_this.mmSelected;
              console.log(_this.planDataList)
            }

          })
        })
        this.planSettingShow=false;
        this.modalAddData={};
      }
    },
    //编辑保存
    editPlanData:function(id){
      var _this=this;
      console.log(id);
      this.planSettingShow=true;
      api.planSetting.editPlanData(id)
      .then(response=>{
        console.log(response.data);
        this.mySelected=response.data.y;
        this.mmSelected=response.data.m;
        this.modalAddData.id=response.data.id;
        //遍历planBenchmarkDetails,把数据渲染到弹出框中
        response.data.planBenchmarkDetails.forEach(function(data,index){
          if(data.targetId==1) {
            _this.modalAddData.averageUnitPrice=_this.formateNumber((data.valueMax+data.valueMin)/2);
            _this.modalAddData.unitPriceError=(_this.formateNumber((data.valueMax-(data.valueMax+data.valueMin)/2)/((data.valueMax+data.valueMin)/2)))*100;
            console.log(_this.modalAddData.unitPriceError);
          }
          if(data.targetId==3){
            _this.modalAddData.averageConversionRate=_this.formateNumber((data.valueMax+data.valueMin)/2);
            _this.modalAddData.conversionError=(_this.formateNumber((data.valueMax-(data.valueMax+data.valueMin)/2)/((data.valueMax+data.valueMin)/2)))*100;
          }
        })
        console.log(_this.modalAddData);
      })
    },
    upload:function(){
      api.activityWarn.upload({
        shopId:1,
        g_userId:1
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  $borderColor:#b5b5b5;
  .planSetting {
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
    >.planSettingContent {
      >table {
        width:100%;
        td,th {
          font-size:14px;
          font-weight:normal;
          border:1px solid $borderColor;
          text-align:center;
          height:30px;
        }
      }
    }
    >.planSettingAdd {
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
      >.planSettingAddContent {
        padding-left:20px;
        padding-bottom:20px;
        box-sizing:border-box;
        margin-top:5px;
        >select {
          width:160px;
          margin-left:5px;
          margin-bottom:10px;
        }
        >input{
          padding-left:10px;
          margin:10px 0;
          &:nth-of-type(1),&:nth-of-type(3){
            width:150px;
          }
          &:nth-of-type(2),&:nth-of-type(4) {
            margin-left:64px;
            margin-right:10px;
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
          margin-top:10px;
          padding-left:25px;
          .download,.upload {
            padding-top:10px;
            text-align:center;
            display:inline-block;
            vertical-align:middle;
            width:160px;
            height:80px;
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



