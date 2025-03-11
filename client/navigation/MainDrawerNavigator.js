import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GameNavigator from './GameNavigator'; // ✅ Import game stack
import BillingInfo from '../screens/Profile/BillingInfo';
import PersonalInfo from '../screens/Profile/PersonalInfo';
import MyGames from '../screens/Profile/MyGames';
import Logout from '../screens/Auth/Logout'; // ✅ Import Logout screen

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Game">
      {/* ✅ Game Screens */}
      <Drawer.Screen name="Game" component={GameNavigator} />
      {/* ✅ Profile Screens */}
      <Drawer.Screen name="BillingInfo" component={BillingInfo} />
      <Drawer.Screen name="PersonalInfo" component={PersonalInfo} />
      <Drawer.Screen name="MyGames" component={MyGames} />
      {/* ✅ Logout Button */}
      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
