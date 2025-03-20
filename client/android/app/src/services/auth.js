import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebase';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export const signInWithGoogle = async () => {
  try {
    const [request, response, promptAsync] = Google.useAuthRequest({
      expoClientId: EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
      androidClientId: EXPO_PUBLIC_GOOGLE_CLIENT_ID_ANDROID,
      iosClientId: EXPO_PUBLIC_GOOGLE_CLIENT_ID_IOS,
    });

    if (response?.type === 'success') {
      const { id_token } = response.params;

      const credential = GoogleAuthProvider.credential(id_token);
      const userCredential = await signInWithCredential(auth, credential);

      console.log('✅ User signed in:', userCredential.user);
      return userCredential.user;
    } else {
      console.error('❌ Google sign-in cancelled');
    }
  } catch (error) {
    console.error('❌ Google sign-in error:', error);
    throw error;
  }
};
