import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PlayOrCreate = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Do you want to play or create a new game?</Text>
      <Button title="Play Existing Game" onPress={() => navigation.navigate('JoinGame')} />
      <Button title="Create New Game" onPress={() => navigation.navigate('CreateGame')} />
    </View>
  );
};

export default PlayOrCreate;
