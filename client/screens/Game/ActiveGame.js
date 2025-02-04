import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ActiveGame = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Active Game</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default ActiveGame;
