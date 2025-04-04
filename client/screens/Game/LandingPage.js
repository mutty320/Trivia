import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext'

const LandingPage = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  const handleSinglePlayer = () => {
    if (!user) {
      Alert.alert('Unauthorized', 'Please sign in to play single player.');
      navigation.replace('Login');
      return;
    }
    navigation.navigate('DefaultOrCustom');
  };

  return (
    <View>
      <Text>Landing Page</Text>
      
      {/* ✅ Drawer Menu Button - Always available */}
      <Button title="Open Profile Menu" onPress={() => navigation.openDrawer()} />
      
      {/* ✅ Multiple Players - Always available */}
      <Button 
        title="Multiple players" 
        onPress={() => navigation.navigate('JoinOrCreate')} 
      />
      
      {/* ✅ Single Player - Block if not logged in */}
      <Button 
        title="Single player" 
        onPress={handleSinglePlayer} 
      />
    </View>
  );
};

export default LandingPage;
