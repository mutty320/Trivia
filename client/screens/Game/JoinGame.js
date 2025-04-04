import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { io } from 'socket.io-client';

const SERVER_URL = 'http://192.168.1.24:5000';  // ✅ Use your PC's local IP
const socket = io(SERVER_URL, { transports: ['websocket'], autoConnect: true });

const JoinGame = ({ navigation }) => {
  const [gamePin, setGamePin] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleJoinGame = async () => {
    console.log("🛠 Attempting to join game...");
    try {
      const response = await fetch(`${SERVER_URL}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gamePin, playerName }),
      });

      console.log("🔍 Raw Response:", response);

      const data = await response.json();
      console.log("✅ Server Response Data:", data);

      if (response.ok) {  
        console.log("🎉 Success! Navigating to Waiting Room...");
        Alert.alert('Success', 'Joined the game!');
        socket.emit('joinGame', { gamePin, playerId: data.playerId, playerName });
        navigation.navigate('WaitingRoom', { gamePin, playerId: data.playerId });
      } else {
        console.log("❌ Server returned an error:", data.error);
        Alert.alert('Error', data.error || 'Failed to join game.');
      }
    } catch (error) {
      console.error("❌ Catch Block Error:", error);
      Alert.alert('Error', 'Something went wrong. Check your network.');
    }
  };

  return (
    <View>
      <Text>Enter Game PIN:</Text>
      <TextInput value={gamePin} onChangeText={setGamePin} placeholder="Game PIN" />
      <Text>Enter Your Name:</Text>
      <TextInput value={playerName} onChangeText={setPlayerName} placeholder="Your Name" />
      <Button title="Join Game" onPress={handleJoinGame} />
    </View>
  );
};

export default JoinGame;
