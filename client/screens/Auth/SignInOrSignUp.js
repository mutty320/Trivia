import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInOrSignUp = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Log In or Sign Up</Text>
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
      <Button title="Log In" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

export default SignInOrSignUp;
