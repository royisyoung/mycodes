const express = require('express');
const webSocketServer = require('ws').Server;
const http = require('http');
const port = process.env.PORT || 5000;

const hello = require('index.html');

//创建一个express应用
const app = express();
  app.use(express.static(__dirname + '/../'));
  app.get('/someGetRequest', function(req, res, next) {
    console.log('receiving get request');
  });
  app.post('/somePostRequest', function(req, res, next) {
    console.log('receiving post request');
  })
  //设置该应用监听80端口
  app.listen(80);
  console.log('app listening on %d', 80);

//创建一个http服务
const server = http.createServer(app);
  server.listen(port);
  console.log('http server listening on %d', port);

var userId;
//创建一个websocket服务
const wss = new webSocketServer({server: server});
  wss.on('connection', function(ws) {

    alert(ws);

    console.info('websocket connection open');

    const timestamp = new Date().getTime();
    userId = timestamp;

    ws.send(JSON.stringify({msgType: "onOpenConnection", msg: {connectionId: timestamp}}));

    ws.on('message', function(data, flags) {
      console.log('websocket received a message');
      const clientMsg = data;

      ws.send(JSON.stringify({msg: {connectionId: userId}}));
    });

    ws.on("close", function() {
      console.log('websocket connection close');
    })

  });
  console.log('websocket server created');
  