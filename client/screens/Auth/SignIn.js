import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useGoogleAuth } from '../../src/hooks/useGoogleAuth';


import { onAuthStateChanged } from 'firebase/auth';
//import { auth } from '../../src/services/firebase';


const SERVER_URL = 'http://192.168.1.24:5000';

const SignIn = ({ navigation }) => {
  const { login } = useAuth();
  //const { signInWithGoogle , isLoading} = useGoogleAuth();
  const { signInWithGoogle, isLoading, error, auth } = useGoogleAuth();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // const { user } = useAuth();
  //   useEffect(() => {
  //       if (user) {
  //         console.log('✅ User signed in with Google:', user);
  //         navigation.replace('MainDrawer');
  //       }
  //   }, [user]);

  // ✅ Handle Email/Password Login
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
        await login(data.token);

        console.log('✅ User set in context. Navigating...');
        setTimeout(() => {
          navigation.replace('MainDrawer');
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
 //=====================================
  const handleGoogleSignIn = async () => {
    try {
      // Just start the sign-in process
      await signInWithGoogle();
      
      // If successful, the useEffect in the hook will handle the rest
      // and update the AuthContext

      navigation.replace('MainDrawer');
    } catch (error) {
      console.error('❌ Google Sign-In Error:', error);
      Alert.alert('Error', 'Google Sign-In failed');
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

      {/* ✅ Google Sign-In Button */}
      <View style={styles.googleButton}>
        <Button 
          title="Sign in with Google" 
          onPress={handleGoogleSignIn} 
          color="#DB4437"
        />
      </View>

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
  googleButton: {
    marginVertical: 20,
  },
});

export default SignIn;