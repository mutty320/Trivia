import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinGame = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Join Game</Text>
      <Button title="Join Successful!" onPress={() => navigation.navigate('ActiveGame')} />
    </View>
  );
};

export default JoinGame;
