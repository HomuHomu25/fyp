import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import { TouchableOpacity, StyleSheet, View, Text, Alert } from 'react-native';

export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      takingPic: false,
    };
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      const options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };
      this.setState({ takingPic: true });
      try {
        const data = await this.camera.takePictureAsync(options);
        if (this.props.onPicture) {
          this.props.onPicture(data);
        } else {
          console.warn('onPicture prop is not provided');
        }
      } catch (err) {
        Alert.alert('Error', `Failed to take picture: ${err.message || err}`);
      } finally {
        this.setState({ takingPic: false });
      }
    } else {
      Alert.alert('Error', 'Camera is not ready or already taking a picture');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        />
        <View style={styles.captureContainer}>
          <TouchableOpacity onPress={this.takePicture} style={styles.captureButton}>
            <Text style={styles.captureText}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Camera.propTypes = {
  onPicture: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
  },
  captureContainer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#00000080',
  },
  captureButton: {
    flex: 0,
    backgroundColor: '#1e90ff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  captureText: {
    fontSize: 14,
    color: 'white',
  },
});
