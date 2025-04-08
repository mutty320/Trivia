import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinOrPlay = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Join or Create a Game</Text>
      <Button title="Choose a game" onPress={() => navigation.navigate('GameSettings')} />
      <Button title="Join Game" onPress={() => navigation.navigate('JoinWithPin')} />
    </View>
  );
};

export default JoinOrPlay;
