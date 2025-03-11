import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DefaultOrCustom = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Default or Custom Game Settings</Text>
      <Button title="Use Default Settings" onPress={() => navigation.navigate('CreatedConfirmation')} />
      <Button title="Customize Settings" onPress={() => navigation.navigate('Category')} />
      <Button title="after settings now create qustions" onPress={() => navigation.navigate('CreateQuestions')} />

    </View>
  );
};

export default DefaultOrCustom;
