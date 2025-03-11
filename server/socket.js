let ioInstance; // This will store the Socket.IO instance

const initializeSocket = (server) => {
  ioInstance = require('socket.io')(server, {
    cors: { origin: "*" }
  });

  return ioInstance;
};

const getIO = () => {
  if (!ioInstance) {
    throw new Error("Socket.io not initialized!");
  }
  return ioInstance;
};

module.exports = { initializeSocket, getIO };
