import React from 'react';
import { AuthProvider } from './context/AuthContext';
import AppNavigator from './navigators/AppNavigator';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;


// npx expo start --web