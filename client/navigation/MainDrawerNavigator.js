import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import GameNavigator from './GameNavigator';
import BillingInfo from '../screens/Profile/BillingInfo';
import PersonalInfo from '../screens/Profile/PersonalInfo';
import MyGames from '../screens/Profile/MyGames';
import Logout from '../screens/Auth/Logout';
import { Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

const MainDrawerNavigator = ({ navigation }) => {
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', (e) => {
      const currentRoute = e.data.state?.routes?.[e.data.state.index]?.name;

      // ✅ Only block protected routes — NOT LandingPage or GameNavigator
      if (!user && ['BillingInfo', 'PersonalInfo', 'MyGames'].includes(currentRoute)) {
        Alert.alert('Unauthorized', 'Please sign in to access this feature.');
        navigation.replace('Login');
      }
    });

    return unsubscribe;
  }, [user, navigation]);

  return (
    <Drawer.Navigator initialRouteName="Game">
      {/* ✅ Landing Page + GameNavigator are public */}
      <Drawer.Screen name="Game" component={GameNavigator} />

      {/* ✅ Protected Routes (shown only when user is authenticated) */}
      {user ? (
        <>
          <Drawer.Screen name="BillingInfo" component={BillingInfo} />
          <Drawer.Screen name="PersonalInfo" component={PersonalInfo} />
          <Drawer.Screen name="MyGames" component={MyGames} />
          <Drawer.Screen name="Logout" component={Logout} />
        </>
      ) : (
        // ✅ Keep Logout accessible for anonymous users (in case they want to log in)
        <Drawer.Screen name="Logout" component={Logout} />
      )}
    </Drawer.Navigator>
  );
};

export default MainDrawerNavigator;
