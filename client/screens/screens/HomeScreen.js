import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('authToken');
    await AsyncStorage.removeItem('user');

    setIsAuthenticated(false); // Update global authentication state

    // Reset the navigation stack to the SignIn screen
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <View style={styles.container}>
      <Text>Welcome to the Trivia App!</Text>
      <Button title="Add Game" onPress={() => navigation.navigate('AddGame')} />
      <Button title="Start Trivia Game" onPress={() => navigation.navigate('TriviaGame')} />
      <Button title="Join Game" onPress={() => navigation.navigate('JoinedGame')} /> {/* New Button */}
      <Button title="Log out" onPress={handleLogout} />
      <Button title="Clear Storage" onPress={() => navigation.navigate('ClearStorage')} />
      <Button title="Play Free Trivia" onPress={() => navigation.navigate('FreeTrivia')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
