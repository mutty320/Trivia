import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import SignInOrSignUp from '../screens/Auth/SignInOrSignUp';

const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignInOrSignUp" component={SignInOrSignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
