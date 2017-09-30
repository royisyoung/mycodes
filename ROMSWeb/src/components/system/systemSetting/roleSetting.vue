<template>
  <div class="roleSetting">
    <h1>角色设置<input type="button" value="新建角色" @click="roleAdd()"></h1>
    <div class="roleTable">
      <table>
        <thead>
          <tr>
            <th>角色名称</th>
            <th>权限分配</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(role,index) in roleFuncData" :key="index+date">
            <td valign="top">{{role.roleName}}</td>
            <td>
              <table>
                <tr v-for="(func,index) in role.functionList" :key="index+date">
                  <td>{{func.name}}
                    <table class="secondAuthority">
                      <tr>
                        <td v-for="(child,index) in func.children" :key="index+date">
                          <input type="checkbox" v-model="child.hasFunction">{{child.name}}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
            <td valign="top">
              <a href="javascript:void(0)" @click="updateRole(role)">保存</a></br>
              <a href="javascript:void(0)" @click="roleDel(role.id,role)">删除</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="roleSettingAdd" v-show="roleShow"> 
      <div class="close"><span @click="close()">×</span></div>
      <form class="roleContent" @submit.prevent="onSubmit()">
        角色名称：<input type="text" name="roleName" v-model="roleSave.roleName"><br>
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
        roleData:{},
        roleShow:false,
        roleSave:{
          roleName:"",
          shopId:5,
        },
        secondAuthority:[],
        obj: {
        },
        roleFuncData:[]
      }
    },
    created(){
      api.roles.roleSetting()
        .then(response=>{
          var tabRoleFuncData = response.data;
          //循环遍历返回角色权限数据结构
          tabRoleFuncData.forEach(function(data,index) {
            var funcList = fnLisp(data.functionList,0);
            data.functionList = funcList.reverse();
          });
          this.roleFuncData=tabRoleFuncData;
          //递归函数返回树形数据结构
          function fnLisp(data,pid){
            var result = [] , temp;
            for(var i in data){
              if(data[i].parentId==pid){
                result.push(data[i]);
                  temp = fnLisp(data,data[i].id);           
                    if(temp.length>0){
                      data[i].children=temp;
                     }           
                  }       
              }
              return result;
          };
      })  
    },
    computed:{
      date:function(){
        return new Date();
      }
    },
    methods:{
      //关闭模态框
      close:function(){
        this.roleShow=false;
      },
     
      //弹出模态框
      roleAdd:function(){
        this.roleShow=true;
      },
      //修改角色权限
      updateRole : function(role){
        var roleList = role.functionList;
        var hasFunc = [];
        roleList.forEach(function(data,index){
          if(data.children && data.children.length>0){
            data.children.forEach(function(data,index){
              if(data.hasFunction)
                hasFunc.push(data.id);
            });
          }
        });
        var str = hasFunc.toString();
        api.roles.updateRole({
          shopId:1,
          roleId:role.id,
          functionIds:str,
        })
        .then(response=>{
          let _this=this;
          api.roles.roleSetting()
          .then(function(response){
            var tabRoleFuncData = response.data;
            //循环遍历返回角色权限数据结构
            tabRoleFuncData.forEach(function(data,index) {
              var funcList = fnLisp(data.functionList,0);
              data.functionList = funcList.reverse();
            });
            _this.roleFuncData=tabRoleFuncData;
            //递归函数返回树形数据结构
            function fnLisp(data,pid){
                var result = [] , temp;
                for(var i in data){
                    if(data[i].parentId==pid){
                        result.push(data[i]);
                        temp = fnLisp(data,data[i].id);           
                        if(temp.length>0){
                            data[i].children=temp;
                        }           
                    }       
                }
                return result;
            };
          })
          this.roleShow=false;
        })
      },
      //删除角色功能
      roleDel:function(id,role){
        //获取对象数组中指定对象的下标
        function getRoleIndex(_arr,_obj) {
            var len = _arr.length;
            for(var i = 0; i < len; i++){
                if(_arr[i] == _obj){
                  return parseInt(i);
                }
            }
            return -1;
        };
        api.roles.roleDel({
          id:id
        })
        .then(response=>{
           var index = getRoleIndex(this.roleFuncData,role);
            console.log(index);
            this.roleFuncData.splice(index,1);
        })
      },
      //新增保存功能
      onSubmit:function(){
        api.roles.roleSave({
          roleName:this.roleSave.roleName,
          shopId:this.roleSave.shopId
        })
        .then(response=>{
          api.roles.roleSetting()
          .then(response=>{
            var tabRoleFuncData = response.data;
            //循环遍历返回角色权限数据结构
            tabRoleFuncData.forEach(function(data,index) {
              var funcList = fnLisp(data.functionList,0);
              data.functionList = funcList.reverse();
            });
            this.roleFuncData=tabRoleFuncData;
            //递归函数返回树形数据结构
            function fnLisp(data,pid){
                var result = [] , temp;
                for(var i in data){
                    if(data[i].parentId==pid){
                        result.push(data[i]);
                        temp = fnLisp(data,data[i].id);           
                        if(temp.length>0){
                            data[i].children=temp;
                        }           
                    }       
                }
                return result;
            };
          })
          this.roleShow=false;
          this.roleSave.roleName="";
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  $borderColor:#b5b5b5;
  .roleSetting {
    color:#7d7d7d;
    position:relative;
    h1 {
      font-size:16px;
      padding-left:16px;
      padding-bottom:12px;
      border-bottom:1px dashed #b5b5b5;
      >input[type="button"] {
        background-color:transparent;
        margin-left:92%;
        width:100px;
        height:30px;
        box-shadow: 0 0 10px #c6dade;
        border:1px solid #c6dade;
      }
    }
    .roleTable {
      margin-top:20px;
      margin-left:40px;
      >table {
        width:100%;
        font-size:14px;
        >thead {
          th {
            font-weight:normal;
          }
        }
        >tbody {
          >tr {
            >td {
              &:first-child,&:last-child{
                padding-top:10px;
              }
            }
          }
        }
        .authorityTable {
          width:20%;
          td {
            height:40px;;
            input[type="checkbox"] {
              margin-right:5px;
            }
          }
        }
        >tbody {
          >tr {
            border-bottom:1px dashed $borderColor;
            &:last-child{
            border-bottom:none;
            }
          }
        }
      }
    }
    >.roleSettingAdd {
      position:absolute;
      left:50%;
      top:50%;
      background-color:#fff;
      transform:translate(-50%,-50%);
      width: 250px;
      height: 200px;
      border: 1px solid $borderColor;
      >.close {
        width: 100%;
        height:30px;
        border-bottom:1px solid $borderColor;
        margin-bottom:10px;
        >span {
          display: block;
          float:right;
          margin-right:5px;
        }
      }
       >.roleContent {
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
    }
    .secondAuthority {
      width:600px;
      float:right;
      margin-left:50px;
    }
  }
</style>




