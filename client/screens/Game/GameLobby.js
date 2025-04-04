import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { io } from 'socket.io-client';

const socket = io('http://192.168.1.24:5000');

const GameLobby = ({ route, navigation }) => {
  const { gameId } = route.params;
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://192.168.1.24:5000/game/${gameId}`)
      .then(response => response.json())
      .then(data => setGame(data.game))
      .catch(error => Alert.alert('Error', 'Failed to load game details.'));

    socket.on('updatePlayers', (data) => {
      setPlayers(data.players);
    });

    return () => {
      socket.off('updatePlayers');
    };
  }, [gameId]);

  const sendMessage = () => {
    socket.emit('hostMessage', { gamePin: game.gamePin, message });
  };

  const startGame = () => {
    if (!game) return;
    
    socket.emit('startGame', { gamePin: game.gamePin });
    navigation.navigate('WaitingRoom', { gamePin: game.gamePin });
  };

  if (!game) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>Game Overview</Text>
      <Text>Name: {game.gameName}</Text>
      <Text>Category: {game.category}</Text>
      <Text>Questions: {game.questions.length}</Text>

      <Text>Players Joined:</Text>
      <FlatList
        data={players}
        keyExtractor={item => item.playerId}
        renderItem={({ item }) => <Text>{item.playerName}</Text>}
      />

      <TextInput
        placeholder="Message players..."
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send Message" onPress={sendMessage} />
      <Button title="Start Game" onPress={startGame} />
    </View>
  );
};

export default GameLobby;
