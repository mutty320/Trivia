import { io } from 'socket.io-client';

// Replace with your backend server's URL
// const SOCKET_URL = 'http://localhost:5000';  
const SOCKET_URL = 'http://192.168.1.24:5000';  

// Initialize the socket connection
const socket = io(SOCKET_URL, {
  transports: ['websocket'], // Ensure WebSocket transport is used
  jsonp: false,
  autoConnect: true,
});

export default socket;
