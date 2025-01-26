// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, TextInput } from 'react-native';
// import socket from '../services/socket';

// export default function TriviaGame() {
//   const [roomId, setRoomId] = useState('');
//   const [question, setQuestion] = useState('');
//   const [answer, setAnswer] = useState('');
//   const [receivedQuestion, setReceivedQuestion] = useState('');
//   const [participants, setParticipants] = useState(0);

//   useEffect(() => {
//     socket.on('participantsUpdate', (count) => {
//       setParticipants(count);
//     });

//     socket.on('receiveQuestion', (question) => {
//       setReceivedQuestion(question);
//     });

//     socket.on('receiveAnswer', ({ playerId, answer }) => {
//       console.log(`Player ${playerId} answered: ${answer}`);
//     });

//     return () => {
//       socket.off('participantsUpdate');
//       socket.off('receiveQuestion');
//       socket.off('receiveAnswer');
//     };
//   }, []);

//   const handleJoinRoom = () => {
//     socket.emit('joinRoom', roomId);
//   };

//   const handleSendQuestion = () => {
//     socket.emit('sendQuestion', roomId, question);
//   };

//   const handleSubmitAnswer = () => {
//     socket.emit('submitAnswer', roomId, answer);
//   };

//   return (
//     <View>
//       <Text>Enter Room ID:</Text>
//       <TextInput
//         value={roomId}
//         onChangeText={setRoomId}
//         placeholder="Enter Room ID"
//       />
//       <Button title="Join Room" onPress={handleJoinRoom} />

//       <Text>Number of Participants: {participants}</Text>
//       <Text>Question: {receivedQuestion}</Text>

//       <TextInput
//         value={question}
//         onChangeText={setQuestion}
//         placeholder="Enter a question (for host)"
//       />
//       <Button title="Send Question" onPress={handleSendQuestion} />

//       <TextInput
//         value={answer}
//         onChangeText={setAnswer}
//         placeholder="Enter your answer"
//       />
//       <Button title="Submit Answer" onPress={handleSubmitAnswer} />
//     </View>
//   );
// }

// GameScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import socket from '../services/socket';

export default function GameScreen() {
  const [roomId, setRoomId] = useState('');
  const [question, setQuestion] = useState('');
  const [participants, setParticipants] = useState([]);
  const [scores, setScores] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState('');

  useEffect(() => {
    // Listen for participant updates, scores, and question responses
    socket.on('participantsUpdate', (participants) => {
      setParticipants(participants);
    });

    socket.on('scoreUpdate', (updatedScores) => {
      setScores(updatedScores); // Update the scores per player
    });

    socket.on('receiveAnswer', ({ playerId, answer, isCorrect }) => {
      // If the answer is correct, increase the player's score
      if (isCorrect) {
        setScores((prevScores) => ({
          ...prevScores,
          [playerId]: (prevScores[playerId] || 0) + 1,
        }));
      }
    });

    // Clean up on component unmount
    return () => {
      socket.off('participantsUpdate');
      socket.off('scoreUpdate');
      socket.off('receiveAnswer');
    };
  }, []);

  const handleCreateRoom = () => {
    socket.emit('createRoom'); // Emit event to create a room
    setRoomId(socket.id); // Use socket ID as room ID
  };

  const handleSendQuestion = () => {
    socket.emit('sendQuestion', roomId, question); // Send question to participants
    setCurrentQuestion(question);
    setQuestion(''); // Clear the question input
  };

  return (
    <View style={styles.container}>
      <Text>Room ID: {roomId || 'Not created yet'}</Text>
      {!roomId && <Button title="Create Room" onPress={handleCreateRoom} />}
      <Text>Number of Participants: {participants.length}</Text>

      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Enter a question"
        style={styles.input}
      />
      <Button title="Send Question" onPress={handleSendQuestion} />

      <Text>Current Question: {currentQuestion}</Text>

      <Text style={styles.scoreTitle}>Scores:</Text>
      <FlatList
        data={Object.keys(scores)}
        keyExtractor={(playerId) => playerId}
        renderItem={({ item: playerId }) => (
          <Text style={styles.scoreText}>
            {participants.find((p) => p.id === playerId)?.name || playerId}: {scores[playerId]}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  scoreTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  scoreText: { fontSize: 16, marginVertical: 5 },
});
