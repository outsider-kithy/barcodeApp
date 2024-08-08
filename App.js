import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Linking } from 'react-native';
import { Button } from 'react-native-paper';

export default function App() {
  const cameraRef = useRef(null);
  const [qr, setQR] = useState(null);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>アプリがカメラへのアクセスを求めています。</Text>
        <Button style={styles.button} onPress={requestPermission} title="アクセスを許可する" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
          ref={cameraRef}
          onBarcodeScanned={(data) => {
          console.log(data);
          //data.dataにブラウザでアクセス
          setQR(data.data);
        }}
        style={styles.camera}>
          {/* 上部のオーバーレイ */}
          <TouchableOpacity style={styles.overlayTop}>
            <Text style={styles.text}>QRコードにかざしてください</Text>
          </TouchableOpacity>

          {/* 下部のオーバーレイ */}
          <TouchableOpacity style={styles.overlayBottom}>
            {qr && <Text style={styles.text}>読み取り結果</Text> }
            {qr && <Text style={styles.resultText}>{qr}</Text> }
            {qr && <Button icon="link" style={styles.accessButton} onPress={() => Linking.openURL(qr)} >アクセス</Button> }
          </TouchableOpacity>
      </CameraView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  overlayTop:{
    position: 'absolute',
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  overlayBottom:{
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
    width: '100%',
    alignItems: 'center',
  },
  accessButton: {
    color: '#ffffff',
    width: 100,
    backgroundColor: 'blue',
    marginTop: 16,
    opacity: 1,
  },
  
  text: {
    fontSize: 16,
    color: 'white',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});
