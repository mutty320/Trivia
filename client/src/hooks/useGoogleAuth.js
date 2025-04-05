import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import { useAuth } from '../../context/AuthContext';
import { auth } from '../services/firebase';
import { useState, useEffect } from 'react';

import Constants from 'expo-constants';

const SERVER= 'http://192.168.1.24:5000';

// Make sure any web redirect can be handled
WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();
  

  // Set up the auth request - using ID tokens directly
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    androidClientId: Constants.expoConfig.extra.googleClientIdAndroid,
    // androidClientId: '908298948427-t30qpaqddbmlb5ln9ff1q2e9v7ltjrel.apps.googleusercontent.com',
    
    // Optional, add if you're using Expo Go:
    // expoClientId: '908298948427-u5sbl0qm2g8i8a6ji95b2ef7gtk4h5u0.apps.googleusercontent.com', 
    scopes: ['profile', 'email']
  });

  // Process the response when it changes
  useEffect(() => {
    if (response?.type === 'success') {
      // Handle the successful authentication
      handleSignIn(response.params);
    } else if (response?.type === 'error') {
      setError(response.error);
      setLoading(false);
    }
  }, [response]);

  // Helper function to handle sign-in with ID token
  const handleSignIn = async (params) => {
    try {
      const { id_token } = params;
      
      if (!id_token) {
        throw new Error('No ID token received from Google');
      }
      
      console.log('✅ Received ID token from Google');
      
      // Create Firebase credential
      const credential = GoogleAuthProvider.credential(id_token);
      
      // Sign in to Firebase
      const userCredential = await signInWithCredential(auth, credential);
      console.log('✅ Firebase Auth Success:', userCredential.user);

      // Send the ID token to your backend
      console.log('🔄 Authenticating with backend...');
      const firebaseIdToken = await userCredential.user.getIdToken(); // 👈 send THIS token to your backend

      const response = await fetch(`${SERVER}/auth/google-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken: firebaseIdToken })
      });
      


      if (!response.ok) {
        console.log("not ok ", response)
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to authenticate with server');
      }

      // Get your backend's JWT token
      const data = await response.json();
      console.log('✅ Backend authentication successful');

      // Use your existing login function to set up AuthContext
      await login(data.token);


      setLoading(false);
      return userCredential.user;

    } catch (error) {
      console.error('Authentication error:', error);
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  // Function to trigger sign-in
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🚀 Starting Google Sign-In');
      await promptAsync();
      
      // The actual sign-in will be handled in the useEffect
    } catch (error) {
      console.error('❌ Error starting Google sign-in:', error);
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  // Get user ID token for API requests
  const getIdToken = async () => {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('No authenticated user');
    }
    return await user.getIdToken();
  };

  return {
    signInWithGoogle,
    getIdToken,
    isLoading: loading,
    error,
    user: auth.currentUser
  };
};