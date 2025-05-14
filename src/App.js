import 'react-native-gesture-handler'; // Ensure gesture handler is initialized
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CaptureScreen from './screens/CaptureScreen';
import ReportsScreen from './screens/ReportsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Capture">
        <Stack.Screen name="Capture" component={CaptureScreen} />
        <Stack.Screen name="Reports" component={ReportsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
