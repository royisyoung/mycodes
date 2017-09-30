<template>
  <section id="level2">
    <section>
      <r-tabbox></r-tabbox>
    </section>
    <section>
      <router-view :key="key"></router-view>
    </section>
  </section>
</template>

<script>
export default {
  name: 'level2',
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
#level2 {
  position: relative;
}
</style>
