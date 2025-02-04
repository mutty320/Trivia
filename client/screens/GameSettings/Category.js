import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Category = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Select Category</Text>
      <Button title="Next: Difficulty" onPress={() => navigation.navigate('Difficulty')} />
    </View>
  );
};

export default Category;
