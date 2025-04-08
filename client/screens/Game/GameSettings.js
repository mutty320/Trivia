import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GameSettings = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Do you want to play or create a new game?</Text>
      <Button title="Choose game settings" onPress={() => navigation.navigate('Category')} />
      <Button title="Play Default" onPress={() => navigation.navigate('ActiveGame')} />
    </View>
  );
};

export default GameSettings;
