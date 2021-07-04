// Load express
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// Load Socket.io
const { Server } = require("socket.io");
const io = new Server(server);

// Rutes
app.use('/',express.static('../client/build'))
//app.get('/public', (req, res) => {
//express.static('files')
//  res.sendFile(__dirname + '../client/build');
//});

// Sockets
io.on('connection', (socket) => {
  console.log("a user connected")
  socket.on('evidence_updated', (evidences) => {
    console.log("evidence_updated")
    socket.broadcast.emit('evidence_updated', evidences);
  });
});


// Server startup
server.listen(8089, () => {
  console.log('listening on *:8089');
});

