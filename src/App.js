import 'react-native-gesture-handler'; // Ensure gesture handler is initialized
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import CaptureScreen from './src/screens/CaptureScreen';
import ReportsScreen from './src/screens/ReportsScreen';

const AuthStack = createStackNavigator();
const AppStack = createStackNavigator();

// Authentication stack: Login and SignUp
function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

// Main app stack: Capture and Reports
function AppStackScreen() {
  return (
    <AppStack.Navigator initialRouteName="Capture">
      <AppStack.Screen name="Capture" component={CaptureScreen} />
      <AppStack.Screen name="Reports" component={ReportsScreen} />
    </AppStack.Navigator>
  );
}

export default function App() {
  // For demo, using local state to track login status.
  // Replace with real auth logic (e.g., Firebase, AsyncStorage)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example: simulate login status check on app load
  useEffect(() => {
    // TODO: Replace with real auth check (e.g., token validation)
    const checkAuthStatus = async () => {
      // Simulate async auth check
      // const token = await getTokenFromStorage();
      // setIsLoggedIn(!!token);
      setIsLoggedIn(false); // default to logged out for now
    };
    checkAuthStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStackScreen />
      ) : (
        <AuthStackScreen />
      )}
    </NavigationContainer>
  );
}
