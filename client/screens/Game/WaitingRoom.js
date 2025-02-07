import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert } from 'react-native';
import { io } from 'socket.io-client';

const socket = io('http://your-backend-url');

const WaitingRoom = ({ route, navigation }) => {
  const { gamePin, playerId } = route.params;
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    //  Listen for updates when a new player joins
    socket.on(`game_${gamePin}_update`, (data) => {
      setPlayers(data.activePlayers);
    });

    //  Listen for when the game starts
    socket.on(`game_${gamePin}_start`, (data) => {
      Alert.alert('Game is Starting!', 'Get ready!');
      navigation.navigate('ActiveGame', { gameId: data.gameId, playerId });
    });

    return () => {
      socket.off(`game_${gamePin}_update`);
      socket.off(`game_${gamePin}_start`);
    };
  }, [gamePin]);

  return (
    <View>
      <Text>Waiting for host to start the game...</Text>
      <Text>Players in Room:</Text>
      <FlatList
        data={players}
        keyExtractor={(item) => item.playerId}
        renderItem={({ item }) => <Text>{item.playerName}</Text>}
      />
    </View>
  );
};

export default WaitingRoom;
