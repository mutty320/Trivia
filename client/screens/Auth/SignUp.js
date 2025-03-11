import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; 
import { useNavigation } from '@react-navigation/native';

const SERVER_URL = 'http://192.168.1.24:5000';

const SignUp = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [institutionName, setInstitutionName] = useState('');

  const handleSignUp = async () => {
    if (!username || !email || !password || !userType) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (userType === 'institution' && !institutionName) {
      Alert.alert('Error', 'Institution name is required');
      return;
    }

    try {
      const response = await fetch(`${SERVER_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          userType,
          institutionName: userType === 'institution' ? institutionName : undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'User registered successfully!');
        navigation.navigate('DefaultOrCustom');
      } else {
        Alert.alert('Error', data.error || 'Failed to register');
      }
    } catch (error) {
      console.error('❌ Registration Error:', error);
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* ✅ Username */}
      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />

      {/* ✅ Email */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* ✅ Password */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* ✅ User Type Dropdown */}
      <Text style={styles.label}>Choose Subscription Type</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={userType}
          onValueChange={(value) => setUserType(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Type" value="" color="#aaa" />
          <Picker.Item label="Individual" value="individual" />
          <Picker.Item label="Institution" value="institution" />
        </Picker>
      </View>

      {/* ✅ Institution Name (Only if userType = 'institution') */}
      {userType === 'institution' && (
        <>
          <Text style={styles.label}>Institution Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter institution name"
            value={institutionName}
            onChangeText={setInstitutionName}
          />
        </>
      )}

      {/* ✅ Submit Button */}
      <Button title="Sign Up" onPress={handleSignUp} color="#6200EE" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200EE',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
  },
  picker: {
    height: 45,
    backgroundColor: '#fff',
  },
});

export default SignUp;
