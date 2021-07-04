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
app.use('/overlay',express.static('../overlay/build'))
//app.get('/public', (req, res) => {
//express.static('files')
//  res.sendFile(__dirname + '../client/build');
//});

// Sockets
let sockets = {}
let hashes = {}
io.on('connection', (socket) => {
  console.log("CONNECTED")
  socket.on('evidence_updated', (evidences) => {
    console.log("EVIDENCE")
    sockets[evidences.hash].forEach(hash_socket => {
      if ( hash_socket.connected ) {
        hash_socket.emit('evidence_updated', evidences);
      }
    });
  });

  socket.on('register', (hash) => {
    console.log("REGISTER: " + hash)
    let hash_sockets = sockets[hash]
    if (!hash_sockets) {
      hash_sockets = []
      sockets[hash] = hash_sockets
    }
    hashes[socket] = hash
    hash_sockets.push(socket)
  });

  socket.on("disconnect", (reason) => {
    console.log("DISCONNECTED")
    hash = hashes[socket]
    if (!hash) { return; }

    sockets = sockets[hash]
    if (!sockets) { return; }

    new_sockets = []
    sockets.forEach(hash_socket => {
      if ( hash_socket.connected ) {
        new_sockets.push(hash_socket)
      }
    });
    sockets[hash] = new_sockets
  });
});


// Server startup
server.listen(8089, () => {
  console.log('listening on *:8089');
});

