<template>
  <div class="index">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to ROMS Index'
    }
  },
  mounted() {
  
  },
  create(){
    
  },
  methods:{
    //获取cookie
    getCookie:function(name) { 
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        window.sessionStorage.setItem("userName",arr[2]);
        return (arr[2]);
      }
      else
        return null;
  }
  }
}
</script>


<style scoped>

</style>
