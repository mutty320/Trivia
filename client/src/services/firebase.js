import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBfhUYKwDHiCy-3eKDNuUViDfLTbWS8gzA',
  authDomain: 'triviaapp-454116.firebaseapp.com',
  projectId: 'triviaapp-454116',
  storageBucket: 'triviaapp-454116.appspot.com',
  messagingSenderId: '908298948427',
  appId: '1:908298948427:android:27969851180412b0a4e2ce',
  //appId: '1:908298948427:web:5a38b2eb9246291fa4e2ce',
  measurementId: 'G-9KLYTGEG4J'
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  popupRedirectResolver: undefined,

});

export { app, auth };