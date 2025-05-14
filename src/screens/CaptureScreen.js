import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './CaptureScreen.styles';

const CaptureScreen = ({ navigation }) => {
  const handleNavigate = () => {
    navigation.navigate('NextScreen'); // Replace 'NextScreen' with the actual screen name
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Capture Screen</Text>
      {/* Add camera/image picker functionality here */}
      <Button
        title="Go to Next Screen"
        onPress={handleNavigate}
        accessibilityLabel="Navigate to the next screen"
      />
    </View>
  );
};

export default CaptureScreen;
