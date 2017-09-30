<template>
  <section class='baseDialogFrame'>
    <r-circularFrame class="dialog-container" background-color="white">
      <slot></slot>
    </r-circularFrame>
  </section>
</template>

<script>
import baseFrame from '../../common/base/baseFrame'
import circularFrame from '../../common/base/circularFrame'
export default {
  components: {
    'r-baseFrame': baseFrame,
    'r-circularFrame': circularFrame,
  },
  name: 'baseDialogFrame',
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.baseDialogFrame {
  background-color: rgba(105,105,105,.3);
  position: absolute;
  left:0;right:0;
  top:0;bottom:0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  .dialog-container {
    box-shadow: 1px 1px 3px #000;
    position: absolute;
    min-width: 500px;
    min-height: 50px;
    max-width: 840px;
  }
}
</style>
