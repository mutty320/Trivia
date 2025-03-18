import { AuthProvider } from './context/AuthContext';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
