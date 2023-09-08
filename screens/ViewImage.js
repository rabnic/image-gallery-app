import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, Pressable, View, Image, TouchableOpacity, TextInput, Button, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';
import { deleteImage, updateAlbum } from '../database/database';

const ViewImage = ({ route, navigation }) => {
  const [showActions, setShowActions] = useState(true);
  const [showMoveTo, setMoveTo] = useState(false);
  const [newFolder, setNewFolder] = useState('');
  const { uri, id, albums } = route.params;
  console.log('albums:', albums);

  // const imgURL =
  //   "https://img.freepik.com/free-photo/person-enjoying-warm-nostalgic-sunset_52683-100695.jpg?w=1380&t=st=1693908616~exp=1693909216~hmac=7cc7a1d87c35848b3727b4b3a8e4a6f516a1427cf1b97008c4eeea3d647c8ac6";

  const confirmDeleteAlert = () =>
    Alert.alert('Confirm Delete', 'Do you want to delete this image?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Yes', onPress: () => handleDeleteImage(), style: 'destructive' },
    ]);

  const handleDeleteImage = () => {
    deleteImage(id);
    navigation.navigate('Home', { doReload: true });
  }

  const handleMoveToFolder = (toFolder) => {
    updateAlbum(id, toFolder);
    navigation.navigate('Home', { doReload: true });
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.image} onPress={() => setShowActions(!showActions)}>
        <Image source={{ uri: uri }} style={styles.image} resizeMode='cover' />
      </Pressable>
      {
        showActions &&
        <>
          <View style={styles.actionsContainer}>
            <View style={styles.actionContainer}>
              <Entypo name="share" size={24} color="black" />
              <Text style={styles.actionText}>share</Text>
            </View>
            <View style={styles.actionContainer}>
              <Entypo name="folder-images" size={24} color="black" />
              <Text style={styles.actionText}>move to</Text>
            </View>
            <TouchableOpacity onPress={confirmDeleteAlert}>
              <View style={styles.actionContainer}>
                <Entypo name="trash" size={24} color="black" />
                <Text style={styles.actionText}>delete</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.actionContainer}>
              <Entypo name="info-with-circle" size={24} color="black" />
              <Text style={styles.actionText}>info</Text>
            </View>
          </View>

          <View style={styles.moveToFolderContainer}>
            <Text style={styles.moveToFolderTextHeader}>Create New Folder</Text>
            <View style={styles.createFolderContainer}>
              <TextInput
                style={styles.textInput}
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
                  return (
                    <TouchableOpacity style={styles.albumsContainer} onPress={() => handleMoveToFolder(item)}>
                      <Text style={styles.folderName}>{item}</Text>
                    </TouchableOpacity>
                  )
                }} />
              </>
            }
          </View>
        </>
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
  folderName: {
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
