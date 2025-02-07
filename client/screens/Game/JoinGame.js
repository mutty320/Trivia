import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const JoinGame = ({ navigation }) => {
  const [gamePin, setGamePin] = useState('');
  const [playerName, setPlayerName] = useState('');

  const handleJoinGame = async () => {
    try {
      const response = await fetch('http://localhost:5000/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gamePin, playerName }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Joined the game!');

        //Connect to WebSocket & join game room
        socket.emit('joinGame', { gamePin, playerId: data.playerId, playerName });

        //Navigate to Waiting Room
        navigation.navigate('WaitingRoom', { gamePin, playerId });
      } else {
        Alert.alert('Error', data.error || 'Failed to join game.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
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

     
