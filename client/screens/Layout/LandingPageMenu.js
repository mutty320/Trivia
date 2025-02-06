import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

// Import Screens
import LandingPage from '../Game/LandingPage';
import BillingInfo from '../Profile/BillingInfo';
import PersonalInfo from '../Profile/PersonalInfo';

const Drawer = createDrawerNavigator();

const LandingPageMenu = () => {
  return (
    <Drawer.Navigator initialRouteName="LandingPage">
      <Drawer.Screen name="LandingPage" component={LandingPage} />
      <Drawer.Screen name="BillingInfo" component={BillingInfo} />
      <Drawer.Screen name="PersonalInfo" component={PersonalInfo} />
    </Drawer.Navigator>
  );
};

export default LandingPageMenu;
