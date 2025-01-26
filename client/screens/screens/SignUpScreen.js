import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';

export default function SignUpScreen() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('individual'); // Default to individual
  const [institutionName, setInstitutionName] = useState(''); // Only used if userType is 'institution'
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://192.168.1.24:5000/auth/signup', {
        username,
        email,
        password,
        userType,
        institutionName: userType === 'institution' ? institutionName : undefined,
      });

      // If signup is successful, store the token and update the auth state
      const { token, user } = response.data;
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      setIsAuthenticated(true); // Update global authentication state

      // Navigate to Home screen after successful signup
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Signup error:', error.response);
      setMessage('Signup failed. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Username" value={username} onChangeText={setUsername} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

      {/* Picker for user type */}
      <Picker selectedValue={userType} onValueChange={(value) => setUserType(value)} style={styles.input}>
        <Picker.Item label="Individual" value="individual" />
        <Picker.Item label="Institution" value="institution" />
      </Picker>

      {/* Institution name input, shown only if userType is 'institution' */}
      {userType === 'institution' && (
        <TextInput 
          placeholder="Institution Name" 
          value={institutionName} 
          onChangeText={setInstitutionName} 
          style={styles.input} 
        />
      )}

      <Button title="Sign Up" onPress={handleSignup} />
      <Button
        title="Alrady have an account? Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
      {message ? <Text>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
});
