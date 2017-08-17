<template>
  <div class="chat">
    <x-history :messages-history="messagesHistory"/>
    <x-input :send-btn-hanlde="sendMsgHanlde"/>
  </div>
</template>

<script>
export default {
  name: 'chat',
  data () {
    return {
      ws: {},
      messagesHistory: [
        {
          id: 1,
          content: 'test1'
        },{
          id: 2,
          content: 'test2'
        },{
          id: 1,
          content: 'test3'
        },
      ],
    }
  },
  created() {
  },
  beforeMount() {

  },
  mounted() {
    
  },
  methods: {
    sendMsgHanlde: () => {
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.chat{
  border:3px solid #C7C7C7;
  width:500px;
  margin:auto 0;
  border-radius: 5px;
  overflow:hidden;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
