import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Timer = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Set Game Timer</Text>
      <Button title="Next: Game Config" onPress={() => navigation.navigate('GameConfig')} />
    </View>
  );
};

export default Timer;
