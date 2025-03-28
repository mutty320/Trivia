import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../services/firebase'; // ✅ Import Firebase from the new file

import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';

WebBrowser.maybeCompleteAuthSession();

const GOOGLE_CLIENT_ID_WEB = Constants.expoConfig.extra.googleClientIdWeb;
const GOOGLE_CLIENT_ID_ANDROID = Constants.expoConfig.extra.googleClientIdAndroid;
const GOOGLE_CLIENT_ID_IOS = Constants.expoConfig.extra.googleClientIdIos;

export const useGoogleAuth = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_CLIENT_ID_WEB,
    androidClientId: GOOGLE_CLIENT_ID_ANDROID,
    iosClientId: GOOGLE_CLIENT_ID_IOS,
  });

  const signInWithGoogle = async () => {
    try {
      const result = await promptAsync();

      if (result?.type === 'success') {
        const { id_token } = result.params;

        // ✅ Exchange Google token for Firebase credential
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

  return { signInWithGoogle };
};
