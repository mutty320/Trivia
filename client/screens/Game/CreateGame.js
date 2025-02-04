import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateGame = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Create Game</Text>
      <Button title="Game Created!" onPress={() => navigation.navigate('CreatedConfirmation')} />
    </View>
  );
};

export default CreateGame;
