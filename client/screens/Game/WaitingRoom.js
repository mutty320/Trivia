import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';

import socket from '../../services/socket'

const WaitingRoom = ({ route, navigation }) => {
  const { gamePin } = route.params;
  const [players, setPlayers] = useState([]);
  const [hostMessage, setHostMessage] = useState('');
  const [hostDisconnected, setHostDisconnected] = useState(false);

  useEffect(() => {
    socket.on('updatePlayers', (data) => {
      setPlayers(data.players);
    });

    socket.on('customMessage', (data) => {
      setHostMessage(data.message);
    });

    socket.on('hostDisconnected', (data) => {
      Alert.alert('Host Disconnected', data.message);
      setHostDisconnected(true);
    });

    socket.on('gameStarted', () => {
      Alert.alert('Game is Starting!', 'Get ready!');
      navigation.navigate('ActiveGame');
    });

    return () => {
      socket.off('updatePlayers');
      socket.off('customMessage');
      socket.off('hostDisconnected');
      socket.off('gameStarted');
    };
  }, [gamePin]);

  return (
    <View>
      <Text>Waiting for game to start...</Text>
      {hostMessage !== '' && <Text>Host Message: {hostMessage}</Text>}
      {hostDisconnected && <Text style={{ color: 'red' }}>⚠️ The host has disconnected.</Text>}
      <FlatList
        data={players}
        keyExtractor={item => item.playerId}
        renderItem={({ item }) => <Text>{item.playerName}</Text>}
      />
    </View>
  );
};

export default WaitingRoom;
