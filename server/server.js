const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Import HTTP module
const { initializeSocket, getIO } = require('../server/socket'); // ✅ Import socket helper
require("dotenv").config(); 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {})
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas", err));

// Import models
const TriviaGame = require('./models/GameSchema');

// ✅ Create HTTP Server & Initialize WebSocket
const server = http.createServer(app);
const io = initializeSocket(server); // ✅ Now io is properly initialized

// ✅ Import and use routers
const myGamesRoutes = require('./routers/myGamesRoutes');
app.use('/my-games', myGamesRoutes);

const joinGame = require('./routers/joinGame');
app.use('/join', joinGame);

const authRoutes = require('./routers/authRoutes');
const protect = require('./middleware/authMiddleware');

app.use('/auth', authRoutes);

// Example of a protected route:
app.get('/protected', protect, (req, res) => {
  res.json({ message: `Welcome ${req.user.userType}!`, userId: req.user.userId });
});

// ✅ Store game rooms & players in memory
const gameRooms = {};

// ✅ Handle WebSocket Connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

// ✅ Player joins the waiting room
socket.on('joinRoom', async ({ gamePin, playerId, playerName, hostId }) => {
  const game = await TriviaGame.findOne({ gamePin });

  if (!game) {
    socket.emit('error', { message: 'Game not found' });
    return;
  }

  socket.join(gamePin);

  if (!gameRooms[gamePin]) {
    gameRooms[gamePin] = {
      players: [],
      hasStarted: false,
      hostId // 👈 trust client to send logged-in user as host
    };
  }

  if (gameRooms[gamePin].hasStarted) {
    socket.emit('error', { message: 'This game has already started!' });
    return;
  }

  gameRooms[gamePin].players.push({ playerId, playerName, socketId: socket.id });

  io.to(gamePin).emit('updatePlayers', { players: gameRooms[gamePin].players });

  socket.emit('waitingRoom', { message: 'Waiting for the host to start the game...', gamePin, playerId });
});

  // ✅ Host sends messages to players
  socket.on('hostMessage', ({ gamePin, message }) => {
    io.to(gamePin).emit('customMessage', { message });
  });

// ✅ 🎮 Host Starts the Game
socket.on('startGame', ({ gamePin, hostId }) => {
  const room = gameRooms[gamePin];
  if (!room) return;

  if (hostId !== room.hostId) {
    socket.emit('error', { message: 'Only the host can start the game.' });
    return;
  }

  room.hasStarted = true;
  io.to(gamePin).emit('gameStarted', { message: 'Game is starting!' });
});

  // ✅ Host disconnect handling (Players get notified)
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);

    Object.keys(gameRooms).forEach((gamePin) => {
      const room = gameRooms[gamePin];
      room.players = room.players.filter(p => p.socketId !== socket.id);

      if (socket.id === room.hostId) {
        io.to(gamePin).emit('hostDisconnected', { message: 'The host has left the game. You can wait or leave.' });
      }

      io.to(gamePin).emit('updatePlayers', { players: room.players });

      if (room.players.length === 0) {
        delete gameRooms[gamePin];
      }
    });
  });
});

// ✅ Start the server with both Express and Socket.IO
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// To run server: node server.js
// To run client: npx expo start --web
//run emulater - npx react-native run-android
