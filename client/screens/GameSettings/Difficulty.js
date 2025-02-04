import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Difficulty = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Choose Difficulty</Text>
      <Button title="Next: Type" onPress={() => navigation.navigate('Type')} />
    </View>
  );
};

export default Difficulty;
