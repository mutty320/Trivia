import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext'

const LandingPage = () => {
  const navigation = useNavigation();
  const { user } = useAuth();



  return (
    <View>
      <Text>Landing Page</Text>
      
      
      {/* ✅ Single Player - Block if not logged in */}
      <Button 
        title="Single player" 
        onPress={() => navigation.navigate('JoinOrPlay')} 
      />

      <Button
        title="Host multiple players"
        onPress={() => {
          if (!user) {
            Alert.alert('Sign in required', 'Please sign in to host a game.');
            navigation.replace('Login');
          } else {
            navigation.navigate('HostGame');
          }
        }}
      />

      {/* ✅  create a new game 
      <Button 
        title="Create game" 
        onPress={() => navigation.navigate('CreateGame')} 
      />
      */}
      
    </View>
  );
};

export default LandingPage;
