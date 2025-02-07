const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http'); // Import the HTTP module to create the server
const { Server } = require('socket.io');
require("dotenv").config(); 

const app = express(); // Create an Express app

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(cors()); // Enable CORS to allow requests from React Native
app.use(bodyParser.json()); // Parse incoming JSON data

// Connect to MongoDB
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl, {})
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas", err);
  });

// Your Express routes
// const signupRout = require('./routers/signup');

const joinGame = require('./routers/joinGame');
// const authRoutes = require('./routers/authRoutes');
// const triviaGameRoutes = require('./routers/triviaGameRoutes');
// const categoryRoutes = require('./routers/categoryRoutes');
// const freeTriviaRoutes = require('./routers/freeTriviaRoutes');

app.use('/join', joinGame);
// app.use('/auth', authRoutes);
// app.use('/trivia-games', triviaGameRoutes);
// app.use('/categories', categoryRoutes);
// app.use('/free-trivia', freeTriviaRoutes);



// Create an HTTP server to work with both Express and Socket.IO
const server = http.createServer(app); // Create the HTTP server with the Express app

// Initialize Socket.IO and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (adjust as needed for security)
  },
});

// Store participants count for each room
const participants = {};

// Set up Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle user joining a room
  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);

    // Increment the participants count for the room
    if (!participants[roomId]) {
      participants[roomId] = 0;
    }
    participants[roomId]++;

    // Broadcast the updated participants count to the room
    io.to(roomId).emit('participantsUpdate', participants[roomId]);
    console.log(`User ${socket.id} joined room ${roomId}, Total participants: ${participants[roomId]}`);
  });

  // Handle sending questions to the room
  socket.on('sendQuestion', (roomId, question) => {
    console.log(`Broadcasting question to room ${roomId}: ${question}`);
    io.to(roomId).emit('receiveQuestion', question);
  });

  // Handle receiving answers from participants
  socket.on('submitAnswer', (roomId, answer) => {
    console.log(`Received answer from ${socket.id} in room ${roomId}: ${answer}`);
    io.to(roomId).emit('receiveAnswer', { playerId: socket.id, answer });
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);

    // Find the room(s) the user was in and decrement participants count
    const rooms = Array.from(socket.rooms).slice(1); // Exclude the default room
    rooms.forEach((roomId) => {
      if (participants[roomId]) {
        participants[roomId]--;

        // Broadcast the updated count to everyone in the room
        io.to(roomId).emit('participantsUpdate', participants[roomId]);
        console.log(`Updated participants in room ${roomId}: ${participants[roomId]}`);

        // Clean up the room if no participants remain
        if (participants[roomId] === 0) {
          delete participants[roomId];
        }
      }
    });
  });
});

// Start the server with both Express and Socket.IO
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
//to tun server node server.js
// to run client npx expo start --web