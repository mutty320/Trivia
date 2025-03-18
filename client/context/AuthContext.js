import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

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
    await AsyncStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
