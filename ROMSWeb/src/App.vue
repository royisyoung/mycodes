<template>
  <div id="app">
    <router-view :key="key" ></router-view>
  </div>
</template>

<script>
import '@/assets/style/normalize.css';
export default {
  name: 'app',
  mounted() {
    console.log(this);
  },
  computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  },
  created: function () {
  },
  methods:{
    
  } 
}
</script>

<style lang="scss">
@import './assets/style/style.scss';
body{
  background: #f0f0f0;
}
#app {
  min-width: 1600px;
}
</style>
