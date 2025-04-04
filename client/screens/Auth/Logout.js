import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    // ✅ Show confirmation when opening Logout screen
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => navigation.goBack(), // ✅ Go back to previous screen if canceled
        },
        {
          text: "Log Out",
          onPress: async () => {
            await handleLogout();
          },
        },
      ],
      { cancelable: false }
    );
  }, []);

  const handleLogout = async () => {
    try {
      await logout(); // ✅ Call the actual logout function from AuthContext
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }], // ✅ Navigate to Login after logout
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to log out. Try again.');
    }
  };

  return (
    <View>
      <Text>Logging Out...</Text>
    </View>
  );
};

export default Logout;
