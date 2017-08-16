<template>
  <div class="chat">
    <x-history :messages-history="messagesHistory"/>
    <x-input :send-btn-hanlde="sendMsgHanlde.bind()"/>
  </div>
</template>

<script>
import WebSocket from "ws";
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
    this.ws = this.initChat();
    // this.ws.on('message', (data) => {

    //   let arr = this.messagesHistory;
    //   this.messagesHistory = arr.push(data);
    // })
    // this.ws.on('open', () => {
      
    //   this.ws.send('this is first send');
    // })
    // this.ws.on()
  },
  beforeMount() {
    console.log(this.ws);
  },
  mounted() {
    console.log(this.ws);
  },
  methods: {
    initChat: () => new WebSocket("ws://10.8.97.26:8088"),
    sendMsgHanlde: () => console.log(this.ws)
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
