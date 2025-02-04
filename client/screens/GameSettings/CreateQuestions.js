import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CreateQuestions = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Create Custom Questions</Text>
      <Button title="Save & Continue Dummy"/>
      <Button title="Save Game" onPress={() => navigation.navigate('CreatedConfirmation')} />
    </View>
  );
};

export default CreateQuestions;
