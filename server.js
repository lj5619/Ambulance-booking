const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected: ' + socket.id);

  // Listen for SOS requests from the User
  socket.on('sendSOS', (data) => {
    console.log('SOS received:', data);
    // Broadcast the SOS request to all connected drivers
    socket.broadcast.emit('sendSOS', {
      location: data.location,
      userId: socket.id // Optional: send the user ID with the SOS request
    });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
