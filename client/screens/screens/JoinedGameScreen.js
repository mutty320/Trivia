// JoinedGameScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import socket from '../services/socket';

export default function JoinedGameScreen() {
  const [roomId, setRoomId] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Listen for question updates and score updates
    socket.on('receiveQuestion', (question) => {
      setCurrentQuestion(question);
    });

    socket.on('scoreUpdate', (newScore) => {
      setScore(newScore);
    });

    // Clean up on component unmount
    return () => {
      socket.off('receiveQuestion');
      socket.off('scoreUpdate');
    };
  }, []);

  const handleJoinRoom = () => {
    socket.emit('joinRoom', roomId);
  };

  const handleSubmitAnswer = () => {
    socket.emit('submitAnswer', roomId, answer);
    setAnswer(''); // Clear the answer input
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={roomId}
        onChangeText={setRoomId}
        placeholder="Enter Room ID"
        style={styles.input}
      />
      <Button title="Join Room" onPress={handleJoinRoom} />

      <Text>Current Question: {currentQuestion}</Text>

      <TextInput
        value={answer}
        onChangeText={setAnswer}
        placeholder="Enter your answer"
        style={styles.input}
      />
      <Button title="Submit Answer" onPress={handleSubmitAnswer} />

      <Text>Your Score: {score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
