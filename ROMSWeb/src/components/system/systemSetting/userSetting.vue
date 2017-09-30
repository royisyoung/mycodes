<template>
  <div class="userSetting">
    <h1>用户设置</h1>
    <div class="operation">
      用户账号：<input type="text" v-model="userCount">
      <button class="query" @click="query()">查询</button>
      <button class="new" @click="newAdd()">新建</button>
    </div>
    <div class="table" >
      <span>用户列表</span>
      <table border='1' class="tableContent">
        <thead>
          <tr>
            <th>用户名称</th>
            <th>店铺</th>
            <th>角色</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in myData" :key="index+date" :id="index">
            <td>{{item.userName}}</td>
            <td></td>
            <td></td>
            <td>
              <a href="javascript:void(0)" @click="editUser(item.id,index)">编辑</a>
              <a href="javascript:void(0)" @click="del(item.id,item)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="clearfix">
      <div class="block pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="rowCount">
        </el-pagination>
    </div>
    </div>
    <div class="userSettingAdd" v-show="userShow"> 
      <div class="close"><span @click="close()">×</span></div>
      <form class="content" @submit.prevent="onSubmit()">
        用&nbsp;&nbsp;户&nbsp;&nbsp;名：<input type="text" name="userName" v-model="user.userName"><br>
        邮&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;箱：<input type="text" name="email" v-model="user.email"><br>
        头&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;像：<input type="text" name="faceImage" v-model="user.faceImage">
        <input type="hidden" name="userId" v-model="user.userId">
        <input type="submit" class="save" value="保存"></input>
      </form>
    </div>  
  </div>
</template>

<script>
import api from '@/api'
  export default {
    data(){
      return {
        //搜索条件
        userCount:"",
        //总记录数
        rowCount:0,
        //总页数
        pageCount:0,
        //从第几页开始
        pageNo:1,
        //默认每页显示的数量
        pagesize:5,
        currentPage:1,
        userShow:false,
        myData:[],
        user:{
          email:"",
          faceImage:"",
          userName:"",
          userId:""
        }
      }
    },
    created() {
      console.log(this.pageNo,this.pagesize);
      this.getUserList(this.pageNo,this.pagesize);
    },
    computed:{
      date:function(){
        return new Date()
      }
    },
    methods:{
      //公共获取列表的方法
      getUserList:function(pageNo,pagesize,userCount){
        api.user.userList({
          pageNo:pageNo,
          pageSize:pagesize,
          userName:this.userCount
        })
        .then(response=> {
          console.log(response);
          this.rowCount=response.data.rowCount;
          this.myData = response.data.list;
        })
      },
      //查询功能
      query:function(){
        this.getUserList(this.currentPage,this.pagesize,this.userCount);
      },
      // 新增对话框
      newAdd:function(){
        console.log(this.$);
        this.userShow=true;
      },
      // 关闭对话框
      close:function(){
        this.userShow=false;
      },
      onSubmit:function(){
        // 新增保存功能
        if(this.user.id==undefined || this.user.id== ""){
          var email=this.user.email,
              faceImage=this.user.faceImage,
              userName=this.user.userName;
          console.log(email,faceImage,userName)
          api.user.userAdd({
            email:email,
            faceImage:faceImage,
            userName:userName
          })
          .then(response=>{
            this.myData.push(this.user);  
            this.userShow=false;
            this.user={
            email:"",
            faceImage:"",
            userName:"",
            userId:""
            }   
          })
        }
        //编辑保存功能
        else{
          console.log(email,faceImage,userName,this.user.id)
          api.user.userUpdate({
            email:this.user.email,
            faceImage:this.user.faceImage,
            userName:this.user.userName,
            id:this.user.id
          })
          .then(response=>{
            for(var i=0;i<this.myData.length;i++){
              console.log(this.myData[i].id,this.user.id);
              if(this.myData[i].id==this.user.id) {
                this.myData[i]=this.user;
              }
            }
            this.userShow=false;
            this.user={
              email:"",
              faceImage:"",
              userName:"",
              userId:""
            }
          })
        }
      },
  
      // 删除功能
      del:function(id,item) {
        console.log(id);
        // 获取对象数组中，指定对象的下标
        function getUserIndex(_arr,_obj) {
          var len = _arr.length;
          for(var i = 0; i < len; i++){
            if(_arr[i] == _obj){
              return parseInt(i);
            }
          } 
            return -1;
        }; 
        var index=getUserIndex(this.myData,item);
        console.log(index);
        api.user.userDel({
          ids:id,
          disabledFlag:1
        })
        .then(response=>{
          this.myData.splice(index,1);
        })
      },

      //编辑功能
      editUser:function(userId,index){
        console.log("这是编辑功能");
        this.userShow=true;
        console.log(userId);
        api.user.userEdit({
          id:userId
        })
        .then(response=> {
          console.log(this.user);
          this.user=JSON.parse(JSON.stringify(this.myData[index]));
       })
      },

      //每页显示数据量变更
      handleSizeChange:function(val){
        this.pagesize = val;
        this.getUserList(this.pageNo, this.pagesize,this);
      },

      //代码变更
      handleCurrentChange: function(val) {
        this.currentPage= val;
        this.getUserList(this.currentPage, this.pagesize,this);
      } 
    } 
  }
</script>

<style lang="scss" scoped>
  .userSetting {
    position:relative;
    h1 {
      font-size:18px;
    }
    >.operation {
      margin-top:20px;
      margin-bottom:40px;
      font-size:16px;
      >input[type="text"] {
        width:220px;
        height:30px;
        outline:none;
        border:1px solid #ccc;
        margin-right:50px;
        border-radius:5px;
      }
      >.query,.new {
        display:inline-block;
        width: 60px;
        height: 30px;
        font-size:14px;
      }
      >.query {
        margin-right:20px;
      }
    }
    >.table {
      >span {
        font-size:14px;
      }
      .tableContent {
        width:97%;
        margin-top:10px;
      }
      .tableContent,th,td {
        border:1px solid #999;
        font-size:14px;
      }
      th,td {
        height:30px;
        width:25%;
        text-align:center;
      }
    }
    >.userSettingAdd {
      >.close {
        width: 100%;
        height:30px;
        border-bottom:1px solid #999;
        margin-bottom:10px;
        >span {
          display: block;
          float:right;
          margin-right:5px;
        }
      }
      >.content {
        text-align:center;
        margin-top:5px;
        >input {
          margin:5px 0;
        }
        >.save {
          margin-left:50px;
          margin-right:30px;
        }
      }
      width: 300px;
      height: 300px;
      background-color: #fff;
      position: absolute;
      left:50%;
      top:50%;
      margin-left:-150px;
    }
    // 分页部分
    .pagination {
      float:right;
      padding-right:23px;
    }
    
  }

 
</style>


