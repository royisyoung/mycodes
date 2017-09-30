<template>
  <section id="level1">
    <r-circularFrame class="side">
      <r-sidebar></r-sidebar>
    </r-circularFrame>
    <r-circularFrame background-color="white" id="container">
      <router-view :key="key"></router-view>
    </r-circularFrame>
  </section>
</template>

<script>
import circularFrame from '@/components/common/base/circularFrame'
export default {
  components: {'r-circularFrame': circularFrame},
  name: 'level1',
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  }
}
</script>

<style lang="scss" scoped>
#level1 {
  $sideWith: 200px;
  position: relative;
  #container {
    margin-left: $sideWith + 25;
  }
  .side {
    position: absolute;
    left: 0;
    width: $sideWith;
    height: 590px;
  }
}

// @media only screen and (max-width: 500px) {
//   #level1 {
//     $sideWith: 132px;
//   }
// }
</style>
