import { Camera, CameraType } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

const CameraShot = () => {
  const [type, setType] = useState(CameraType.back);
  const [picture, setPicture] = useState(null);
  const [hasPermissions, setHasPersmissions] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [showRecentPicture, setShowRecentPicture] = useState(false);
  let recentPicture = picture || null;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.getCameraPermissionsAsync();
      setHasPersmissions(status)
    })()
  }, [])

  const takePicture = async () => {
    if (cameraRef) {
      const options = {
        base4: true,
        exif: false,
        quality: 1
      }
      const takePicture = await cameraRef.takePictureAsync(options);
      recentPicture = takePicture;
      setPicture(takePicture);
      setShowRecentPicture(true);
    }
  };

  const saveRecentPicture = () => {
    setShowRecentPicture(false);
  }

  const deleteRecentPicture = () => {
      setShowRecentPicture(false);
      setPicture(null);
  }

  if (!hasPermissions) {
    // Camera permissions are still loading
    return <View />;
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  if (hasPermissions) {
    return (
      <View style={styles.container}>
        <StatusBar style="light" />
        <Camera style={styles.camera} type={type} ref={(ref) => setCameraRef(ref)}>
          <View style={styles.buttonsContainer}>
            <Pressable style={styles.buttonRecentShots} onPress={() => { }}>
              {
                picture ?
                  <Image source={picture} style={styles.recentPictures} />
                  :
                  <Ionicons name="images" size={24} color="#ddd" />
              }
            </Pressable>
            <Pressable style={styles.buttonTakeshot} onPress={takePicture}>
              <Ionicons name="camera" size={48} color="black" />
            </Pressable>
            <Pressable style={styles.buttonFlip} onPress={toggleCameraType}>
              <Ionicons name="camera-reverse-outline" size={30} color="#ddd" />
            </Pressable>
          </View>
        </Camera>

        {
          showRecentPicture &&
          <View style={styles.recentPictureContainer}>
            <Image source={recentPicture} style={styles.recentPicture} />
            <View style={styles.recentPictureButtons}>
              <Pressable style={styles.buttonSaveRecent} onPress={saveRecentPicture}>
                <Ionicons name="save-outline" size={30} color="rgba(0,255,0,.6)" />
              </Pressable>

              <Pressable style={styles.buttonDeleteRecent} onPress={deleteRecentPicture}>
                <Ionicons name="ios-trash-outline" size={30} color="rgba(255,0,0,.6)" />
              </Pressable>
            </View>
          </View>
        }
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonsContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '6%',
    marginBottom: '8%',
  },
  buttonRecentShots: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  buttonTakeshot: {
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.5)',
  },
  buttonFlip: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  recentPictureContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recentPicture: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  recentPictureButtons: {
    width: '60%',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
  },
  recentPictures: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  buttonDeleteRecent: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  buttonSaveRecent: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.5)',
  }
});

export default CameraShot;