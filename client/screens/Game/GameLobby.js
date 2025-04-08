import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import socket from '../../services/socket';

const GameLobby = ({ route, navigation }) => {
  const { gameId, gamePin, hostId } = route.params;
  const { user } = useAuth();
  const [game, setGame] = useState(null);
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch game details
    fetch(`http://192.168.1.24:5000/game/${gameId}`)
      .then(response => response.json())
      .then(data => setGame(data.game))
      .catch(error => Alert.alert('Error', 'Failed to load game details.'));

    // Listen to updated player list
    socket.on('updatePlayers', (data) => {
      setPlayers(data.players);
    });

    return () => {
      socket.off('updatePlayers');
    };
  }, [gameId]);

  const sendMessage = () => {
    socket.emit('hostMessage', { gamePin, message });
  };

  const startGame = () => {
    if (!game) return;

    socket.emit('startGame', {
      gamePin,
      hostId: user.userId // 👈 use logged-in user's ID as host ID
    });

    navigation.navigate('WaitingRoom', { gamePin });
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
