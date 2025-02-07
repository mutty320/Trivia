import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActiveGame = ({ route }) => {
  const navigation = useNavigation();
  const { gameId, playerId } = route.params;


  return (
    <View>
      <Text>Game is Live!</Text>
      <Text>Game ID: {gameId}</Text>
      <Text>Player ID: {playerId}</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ActiveGame;
