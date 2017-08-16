<template>
  <div class="history">
    <div class="header">
      <h3>this is Once of chat</h3>
    </div>
    <div class="content">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'history'
}
</script>

<style scoped>
  .history{
    width:100%;
    height:600px;
    background:#EBEBEB;
  }
  .header{
    height:80px;
    background:#F2F2F2;
    box-shadow:0px 1px 2px #999;
    display: flex;
    justify-content: space-around;
  }
  .header>h3{
    margin:auto 0;
  }
</style>

