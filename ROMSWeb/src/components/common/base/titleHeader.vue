<template>
  <section class='titleHeader'>
    <div class="title">
      <h2 class="text">{{title}}</h2>
      <slot name="left"></slot>
    </div>
    <div class="content">
      <slot name="right"></slot>
    </div>
  </section>
</template>

<script>
import baseFrame from '../../common/base/baseFrame'
export default {
  components: {
    'r-baseFrame': baseFrame
  },
  name: '',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.titleHeader {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom:1px dashed #ccc;
  padding: 10px 0;
  .text {
    padding:0 20px;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
