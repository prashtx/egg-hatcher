/*jslint node: true */
'use strict';

var express = require('express');
var io = require('socket.io');

var port = process.env.PORT || 3000;

var app = express();
var server = require('http').createServer(app);
var io = io.listen(server);

app
.use(express.logger())
.use(express.urlencoded());

app.post('/', function (req, res) {
  var payload = JSON.parse(req.body.payload);
  io.sockets.emit('newcommit', payload);

  res.send(200);
});

server.listen(port, function () {
  console.log('Listening on ' + port);
});

io.sockets.on('connection', function (socket) {
  socket.emit('welcome', {time: (new Date()).toString()});
});
