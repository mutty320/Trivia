import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GameConfig = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Game Config</Text>
      <Button title="Set" onPress={() => navigation.navigate('DefaultOrCustom')} />
    </View>
  );
};

export default GameConfig;
