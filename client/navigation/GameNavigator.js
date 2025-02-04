import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from '../screens/Game/LandingPage';
import JoinOrCreate from '../screens/Game/JoinOrCreate';
import CreateGame from '../screens/Game/CreateGame';
import JoinGame from '../screens/Game/JoinGame';
import ActiveGame from '../screens/Game/ActiveGame';

const Stack = createStackNavigator();

const GameNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LandingPage">
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="JoinOrCreate" component={JoinOrCreate} />
      <Stack.Screen name="CreateGame" component={CreateGame} />
      <Stack.Screen name="JoinGame" component={JoinGame} />
      <Stack.Screen name="ActiveGame" component={ActiveGame} />
    </Stack.Navigator>
  );
};

export default GameNavigator;
