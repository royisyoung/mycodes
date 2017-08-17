<template>
  <div class="input">
    <span class="icon-span">icon</span>
    <input class="msg-inp" type="text">
    <button class="send-btn" v-on:click="sendBtnHanlde">Send</button>
  </div>
</template>

<script>
export default {
  name:'input',
  props: {
    sendBtnHanlde: {
      type: Function,
      required: true
    }
  },
  methods: {
    // sendBtnHanlde: function() {
    //   alert("this is input");
    // }
  }
}
</script>

<style scoped>
.input {
  box-sizing: border-box;
  width:100%;
  height:50px;
  background:#F2F2F2;
  box-shadow:0px -1px 2px #999;
  line-height: 40px;
  padding:5px;
  display: flex;
  justify-content: space-between;
}
.icon-span{
  flex: 4;
}
.msg-inp{
  flex: 35;
  box-sizing: border-box;
  outline: none;
  height:100%;
  font-size: 30px;
  margin:0 5px;
}
.send-btn{
  flex: 8;
  box-sizing: border-box;
  height:100%;
}
</style>

