import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

import { signOut } from 'firebase/auth';
import { auth } from '../src/services/firebase';


//import 'dotenv/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setUser(decoded);
          } else {
            console.log('🚫 Token expired');
            await AsyncStorage.removeItem('token');
            setUser(null);
          }
        }
      } catch (error) {
        console.error('❌ Error loading user:', error);
        setUser(null);
      }
    };

    loadUser();
  }, []);

  const login = async (token) => {
    await AsyncStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  const logout = async () => {
    try {
      // Sign out from Firebase (if the user used Google auth)
      if (auth.currentUser) {
        await signOut(auth);
      }
      
      await AsyncStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
