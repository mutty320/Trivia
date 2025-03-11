import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainDrawerNavigator from './MainDrawerNavigator'; // ✅ Updated name

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainDrawerNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
