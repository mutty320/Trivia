import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const JoinOrCreate = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Join or Create a Game</Text>
      <Button title="Create Game" onPress={() => navigation.navigate('SignInOrSignUp')} />
      <Button title="Join Game" onPress={() => navigation.navigate('JoinGame')} />
    </View>
  );
};

export default JoinOrCreate;
