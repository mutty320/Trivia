import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Sign Up Screen</Text>
      <Button title="Next" onPress={() => navigation.navigate('DefaultOrCustom')} />
    </View>
  );
};

export default SignUp;
