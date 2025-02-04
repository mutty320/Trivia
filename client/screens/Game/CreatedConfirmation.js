import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreatedConfirmation = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Game Created Successfully!</Text>
      <Button title="Start Game" onPress={() => navigation.navigate('ActiveGame')} />
    </View>
  );
};

export default CreatedConfirmation;
