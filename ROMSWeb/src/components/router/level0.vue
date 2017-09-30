<template>
  <section class='level0'>
    <section>
      <r-header></r-header>
    </section>
    <section class="router-view-box">
      <router-view :key="key" ></router-view>
    </section>
  </section>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      navIndex: this.$session.navIndex.get(),
    }
  },
  mounted() {
    // console.log(this);
  },
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  }
}
</script>

<style lang='scss' scoped>
.level0 {
  
  .router-view-box{
    padding: 28px 25px;
  }
}
</style>
