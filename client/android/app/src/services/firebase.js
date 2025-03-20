import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfhUYKwDHiCy-3eKDNuUViDfLTbWS8gzA",
  authDomain: "triviaapp-454116.firebaseapp.com",
  projectId: "triviaapp-454116",
  storageBucket: "triviaapp-454116.appspot.com",
  messagingSenderId: "908298948427",
  appId: "1:908298948427:web:5a38b2eb9246291fa4e2ce",
  measurementId: "G-9KLYTGEG4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
