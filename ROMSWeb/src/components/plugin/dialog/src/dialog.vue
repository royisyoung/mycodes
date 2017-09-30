<template>
  <r-base class="dialog">
    <section class="header">
      <div class="title">{{title}}</div>
      <div class="close" @click="close">
        <img src="../../../assets/imgs/common/delete.png" alt="">
      </div>
    </section>
    <section class="content">
      <slot></slot>
    </section>
    <section class="bottom">
      <button class="confirm" @click="confirm">确定</button>
      <button class="cancel" @click="close">取消</button>
    </section>
  </r-base>
</template>

<script>
import base from '../../common/notice/base'
export default {
  components: {
    'r-base': base
  },
  name: 'dialog',
  props: {
    title: {
      type: String,
      required: true,
    },
    confirmHandle: {
      type: Function,
      required: false
    },
    closeHandle: {
      type: Function,
      required: false
    }
  },
  data() {
    return {
      
    }
  },
  methods: {
    confirm: function() {
      this.$props.confirmHandle();
      this.$props.closeHandle();
    },
    close: function() {
      this.$props.closeHandle();
    }
  }
}
</script>

<style lang='scss' scoped>
.header {
  // position: absolute;
  // top:0; left:0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  border-bottom: 1px dashed #ccc;
}
.content {}
.bottom {
  // position: absolute;
  // left:0;bottom:0;
  margin-top: 8px;
  // border-top: 1px dashed #ccc;
  // padding-top: 15px;
  display: flex;
  justify-content: flex-end;
  
}
</style>
