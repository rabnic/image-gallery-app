import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { deleteImage, updateAlbum } from '../database/database';
import * as Sharing from 'expo-sharing';

const ViewImage = ({ route, navigation }) => {
  const [showActions, setShowActions] = useState(true);
  const [showMoveTo, setShowMoveTo] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [newFolder, setNewFolder] = useState('');
  const [isFolderInputValid, setIsFolderInputValid] = useState(true);
  const {image, albums } = route.params;
  // console.log('albums:', albums);

  const imageInfoData = [`Name: ${image.name}`,`Album: ${image.album}`,`Date: ${image.date}`,`Location: ${image.location}`,]
  const confirmDeleteAlert = () => {
    Alert.alert('Confirm Delete', 'Do you want to delete this image?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => handleDeleteImage(), style: 'destructive' },
    ]);
  }

  const handleShowInfo = () => {
    Alert.alert('Image Info', imageInfoData.join('\n'), [
      { text: 'Ok', onPress: () => setShowInfo(false)},
    ]);
  };

  const handleDeleteImage = () => {
    deleteImage(image.id);
    navigation.navigate('Home', { doReload: true });
  }

  const handleMoveToFolder = (toFolder) => {
    if (toFolder.trim() === '') {
      setIsFolderInputValid(false)
      return;
    }
    updateAlbum(image.id, toFolder);
    navigation.navigate('Home', { doReload: true });
  }

  const handleFileSharing = () => {
    if (Sharing.isAvailableAsync()) {
      Sharing.shareAsync(image.uri)
    }
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.image} onPress={() => { setShowActions(!showActions); setShowMoveTo(false) }}>
        <Image source={{ uri: image.uri }} style={styles.image} resizeMode='cover' />
      </Pressable>
      {
        showActions &&
        <View style={styles.actionsContainer}>
          <TouchableOpacity onPress={handleFileSharing}>
            <View style={styles.actionContainer}>
              <Entypo name="share" size={24} color="black" />
              <Text style={styles.actionText}>share</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => setShowMoveTo(true)}>
            <View style={styles.actionContainer}>
              <Entypo name="folder-images" size={24} color="black" />
              <Text style={styles.actionText}>move to</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmDeleteAlert}>
            <View style={styles.actionContainer}>
              <Entypo name="trash" size={24} color="black" />
              <Text style={styles.actionText}>delete</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShowInfo}>
            <View style={styles.actionContainer}>
              <Entypo name="info-with-circle" size={24} color="black" />
              <Text style={styles.actionText}>info</Text>
            </View>
          </TouchableOpacity>

        </View>
      }
      {
        showMoveTo &&
        <View style={styles.moveToFolderContainer}>
          <Text style={styles.moveToFolderTextHeader}>Create New Folder</Text>
          <View style={styles.createFolderContainer}>
            <TextInput
              style={[styles.textInput, !isFolderInputValid && {borderColor: 'red', borderWidth: .7}]}
              placeholder="Type new folder"
              onChangeText={newText => setNewFolder(newText)}
              value={newFolder}
            />
            <Button title='Create' onPress={() => handleMoveToFolder(newFolder)} color={'#000'} />
          </View>
          {
            albums.length > 1 &&
            <>
              <Text style={styles.moveToFolderTextHeader}>Move To Folder</Text>
              <FlatList data={albums} renderItem={({ item }) => {
                if (image.album === item) return null;

                return (
                  <TouchableOpacity style={styles.albumsContainer} onPress={() => handleMoveToFolder(item)}>
                    <Text style={styles.album}>{item}</Text>
                  </TouchableOpacity>
                )
              }} />
            </>
          }
        </View>
      }
    </View>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  moveToFolderContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    width: '70%',
  },
  moveToFolderTextHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 5,
  },
  createFolderContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 15,
  },
  textInput: {
    flex: 1,
    borderWidth: .5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    fontSize: 16,
    paddingLeft: 5,
  },
  albumsContainer: {
    borderBottomWidth: .5,
    height: 28,
    marginVertical: 8
  },
  album: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
    position: "relative",
  },
  image: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  actionsContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    bottom: 0,
    left: 0,
    height: 80,
    width: '100%',
    backgroundColor: "white",
  },
  actionContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  actionText: {
    color: "rgba(0,0,0,.5)",
  }
});
