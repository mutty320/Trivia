import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DefaultOrCustom from '../screens/GameSettings/DefaultOrCustom';
import CreateQuestions from '../screens/GameSettings/CreateQuestions';
import GameConfig from '../screens/GameSettings/GameConfig';

const Stack = createStackNavigator();

const SettingsNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="DefaultOrCustom">
      <Stack.Screen name="DefaultOrCustom" component={DefaultOrCustom} />
      <Stack.Screen name="CreateQuestions" component={CreateQuestions} />
      <Stack.Screen name="GameConfig" component={GameConfig} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
