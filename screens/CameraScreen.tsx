import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
//add camera package
//native module을 가져와야 하나 
//새로 만들어 볼까 추후 고민
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';

type RootStackParamList = {
  Main: undefined;
  Camera: undefined;
  VR: undefined;
};

type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

type Props = {
  navigation: MainScreenNavigationProp;
};
const CameraScreen: React.FC<Props> = () => {
  const { hasPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  if (!hasPermission) {
    return <View style={styles.container}><Text>카메라 권한이 필요합니다</Text></View>;
  }

  if (!device) {
    return <View style={styles.container}><Text>카메라를 사용할 수 없습니다</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default CameraScreen;