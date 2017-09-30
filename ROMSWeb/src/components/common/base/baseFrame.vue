<template>
  <section class="baseFrame">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'baseFrame',
  props: {
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
.baseFrame {
  position: relative;
  padding: 0 10px;
}
</style>
