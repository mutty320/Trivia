import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Type = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Select Game Type</Text>
      <Button title="Next: Timer" onPress={() => navigation.navigate('Timer')} />
    </View>
  );
};

export default Type;
