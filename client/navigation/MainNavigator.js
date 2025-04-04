import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainDrawerNavigator from './MainDrawerNavigator';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import ForgotPassword from '../screens/Auth/ForgotPassword';
import SignInOrSignUp from '../screens/Auth/SignInOrSignUp';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainDrawer">
        {/* ✅ Landing Page is public */}
        <Stack.Screen 
          name="MainDrawer" 
          component={MainDrawerNavigator} 
          options={{ headerShown: false }}
        />

        {/* ✅ Authentication screens */}
        {!user && (
          <>
            <Stack.Screen name="SignInOrSignUp" component={SignInOrSignUp} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
