import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const SERVER_URL = 'http://192.168.1.24:5000';

const SignIn = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('✅ Login successful:', data);

        // ✅ Wait until login completes and user state is set
        await login(data.token);

        console.log('✅ User set in context. Navigating...');
        
        // ✅ Ensure navigation only happens AFTER user state is updated
        setTimeout(() => {
          navigation.replace('MainDrawer'); // ✅ Replace stack with main drawer
        }, 0);
      } else {
        Alert.alert('Error', data.error || 'Login failed.');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      Alert.alert('Error', 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>

      {/* ✅ Email Input */}
      <Text style={styles.label}>Email:</Text>
      <TextInput 
        value={email} 
        onChangeText={setEmail} 
        style={styles.input} 
        autoCapitalize="none"
        keyboardType="email-address"
      />

      {/* ✅ Password Input */}
      <Text style={styles.label}>Password:</Text>
      <TextInput 
        value={password} 
        onChangeText={setPassword} 
        style={styles.input} 
        secureTextEntry 
      />

      {/* ✅ Sign In Button */}
      <Button 
        title={loading ? 'Signing In...' : 'Sign In'}
        onPress={handleSignIn}
        disabled={loading}
        color="#6200EE"
      />

      {/* ✅ Sign Up Link */}
      <Text 
        style={styles.link}
        onPress={() => navigation.navigate('SignUp')}
      >
        Don't have an account? Sign Up
      </Text>

      {/* ✅ Forgot Password Link */}
      <Text 
        style={styles.link}
        onPress={() => navigation.navigate('ForgotPassword')}
      >
        Forgot Password?
      </Text>
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
  link: {
    color: '#6200EE',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});

export default SignIn;
