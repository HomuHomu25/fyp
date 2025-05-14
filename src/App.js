import 'react-native-gesture-handler'; // Ensure gesture handler is initialized
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider, useAuth } from './src/context/AuthContext';

import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Capture" component={CaptureScreen} />
      <AppStack.Screen name="Reports" component={ReportsScreen} />
    </AppStack.Navigator>
  );
}

function RootNavigator() {
  const { userToken, isLoading } = useAuth();

  if (isLoading) {
    // You can return a splash screen or loading indicator here
    return null; // Or a loading spinner component
  }

  return (
    <NavigationContainer>
      {userToken == null ? <AuthStackScreen /> : <AppStackScreen />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
