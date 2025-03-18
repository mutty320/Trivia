import React from 'react';
import { View, Button } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const Logout = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigation.replace('SignIn');
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default Logout;
