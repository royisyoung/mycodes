<template>
  <section :class="'circularFrame ' + backgroundColor">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'circularFrame',
  props: {
    backgroundColor: {
      type: String,
      default: 'default',
      required: false
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

<style lang="scss" scoped>
$defaultbg: transparent;
$wihte:#ffffff;
.circularFrame {
  position: relative;
  border-radius: 15px;
  border: 1px solid #EBEBEB;
  box-shadow: 2px 2px 6px #bcbcbc;
  padding: 20px;
}
.default {
  background-color: $defaultbg;
}
.white {
  background-color: $wihte;
}
</style>
