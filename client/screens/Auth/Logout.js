import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
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
          onPress: () => handleLogout(),
        },
      ],
      { cancelable: false }
    );
  }, []);

  const handleLogout = () => {
    // ✅ Clear user data (Adjust based on your auth system)
    console.log("User logged out"); 

    // ✅ Redirect to login screen
    navigation.reset({
      index: 0,
      routes: [{ name: "SignIn" }], // ✅ Change to the actual login screen name
    });
  };

  return (
    <View>
      <Text>Logging Out...</Text>
    </View>
  );
};

export default Logout;
