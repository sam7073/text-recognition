/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import {RNCamera} from 'react-native-camera';
import axios from 'axios';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components';

const Button = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: pink;
`;

const App: () => React$Node = () => {
  const cameraRef = React.useRef(null);
  const onClick = () => {
    setInterval(takePhoto, 1000);
  };
  const takePhoto = async () => {
    if (cameraRef) {
      const cap = await cameraRef.current
        .takePictureAsync({
          quality: 1,
          exif: true,
          base64: true,
        })
        .catch((err) => {
          console.log(err);
        });
      const base64 = cap.base64;

      await axios
        .post('http://10.0.2.2:3001/upload', {img: base64})
        .then((res) => {
          console.log(res);
          console.log('asd1');
        })
        .catch((err) => {
          console.log(err);
          console.log('asd2');
        });
      console.log('asd3');
    }
  };
  return (
    <>
      <RNCamera
        ref={cameraRef}
        style={{width: 420, height: 420}}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      <TouchableOpacity onPress={onClick}>
        <Button />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
