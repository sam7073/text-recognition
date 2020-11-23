import {RNCamera} from 'react-native-camera';
import axios from 'axios';

import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';

import styled from 'styled-components';

const Button = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: pink;
`;

const StyledView = styled.View`
  border: 1px red solid;
  position: absolute;
  z-index: 99;
  width: ${(props) => `${props.w}px`};
  height: ${(props) => `${props.h}px`};
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
`;

const App: () => React$Node = () => {
  const cameraRef = React.useRef(null);
  const [chars, setChars] = useState(['1 1 1 1']);
  const onClick = () => {
    //const interval = setInterval(takePhoto, 1000);
    takePhoto();
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
        .then(async (res) => {
          await setChars(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <RNCamera
        ref={cameraRef}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 420,
          height: 420,
        }}
        type={RNCamera.Constants.Type.back}
        captureAudio={false}
      />
      {chars.map &&
        chars.map((item, index) => {
          const arr = item.split(' ');
          return (
            <StyledView
              x={(arr[0] / 960.0) * 420}
              y={(arr[1] / 1280.0) * 400}
              w={(arr[2] / 960.0) * 420}
              h={(arr[3] / 1280.0) * 600}
              key={index}
            />
          );
        })}
      <TouchableOpacity onPress={onClick}>
        <Button />
      </TouchableOpacity>
    </>
  );
};

export default App;
