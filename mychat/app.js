const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('hello!');
  console.log(res);
});

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;

  console.log(host, port);
  console.log(`server running at http://${host}:${port}`);
});