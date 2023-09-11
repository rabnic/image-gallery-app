import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  SectionList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createTable, db, getAllImages, deleteTable } from "../database/database";
import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';

const imgURL =
  "https://img.freepik.com/free-photo/person-enjoying-warm-nostalgic-sunset_52683-100695.jpg?w=1380&t=st=1693908616~exp=1693909216~hmac=7cc7a1d87c35848b3727b4b3a8e4a6f516a1427cf1b97008c4eeea3d647c8ac6";

const Home = ({ route, navigation }) => {
  const [groupedImages, setGroupedImages] = useState([])
  const [folderData, setFolderData] = useState([])
  const [currentShownFolder, setCurrentShownFolder] = useState('Camera')

  // Fetch data if reload is requested
  // if (route.params?.doReload) {
  //   console.log('Reloading');
  //   getAllImages((data) => {
  //     setGroupedImages(groupByAlbum(data));
  //     route.params.doReload = false;
  //   })
  // }

  // Reload data from database when home screen is focused
  useEffect(() => {
    createTable();
    const unsubscribe = navigation.addListener('focus', () => {
      getAllImages((data) => {
        setGroupedImages(groupByAlbum(data));
      })
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);


  // Group the images by album name
  const groupByAlbum = (array) => {
    return array.reduce((acc, obj) => {
      const album = obj.album;
      if (acc[album]) {
        acc[album].push(obj);
      } else {
        acc[album] = [obj];
      }
      return acc;
    }, {});
  }

  const foldersData = () => {
    let foldersArray = [];
    Object.keys(groupedImages).forEach(key => {
      foldersArray.push(
        {
          album: key,
          firstImage: groupedImages[key][0].uri,
          length: groupedImages[key].length
        }
      )
    })
 
    return foldersArray;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>My Images</Text>
        </View>
        {
          Object.keys(groupedImages).length > 0 ?
          <>
            <View style={styles.foldersContainer}>
              <Text style={styles.foldersContainerText}>Albums</Text>
              <FlatList
                horizontal
                data={foldersData()}
                renderItem={({ item }) => {
                  return (
                    <View style={[styles.folder, item.album === currentShownFolder ? { borderBottomWidth: 2 } : null]}>
                      <TouchableOpacity onPress={() => setCurrentShownFolder(item.album)}>
                        <Image
                          source={{ uri: item.firstImage }}
                          style={styles.folderPicture}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                      <Text style={styles.folderText}>{item.album}</Text>
                      <Text>({item.length})</Text>
                    </View>
                  );
                }}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <SafeAreaView style={styles.picturesContainer}>
              <FlatList
                data={groupedImages[currentShownFolder]}
                contentContainerStyle={styles.pictureList}
                numColumns={2}
                style={styles.pictureList}
                renderItem={({ item }) => {
                  return (
                    <View style={styles.pictureContainer} key={item.id}>
                      <TouchableOpacity onPress={() => { navigation.navigate('ViewImage', { image:{...item}, albums: Object.keys(groupedImages) }) }}>
                        <Image
                          source={{ uri: item.uri }}
                          style={styles.picture}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index}
                showsVerticalScrollIndicator={true}
              />
            </SafeAreaView>
          </>
          :
          <NoImagesView />
        }

        <Pressable style={styles.buttonTakeshot} onPress={() => navigation.navigate('CameraShot')}>
          <Ionicons name="camera" size={48} color="black" />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

const NoImagesView = () => {
  return (
    <View style={styles.noImages}>
        <Text style={styles.noImagesText}>No Images shot! {'\n'} Press camera below to start.</Text>
        <Ionicons name="images" size={74} color="gray" />
    </View>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
  },
  headerContainer: {
    height: 90,
    // backgroundColor: 'brown',
    justifyContent: "flex-end",
    alignItems: "center",
  },
  headerContainerText: {
    fontSize: 30,
    fontWeight: "600",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 0,
  },
  foldersContainer: {
    // backgroundColor: 'yellow',
    minHeight: 150,
    paddingHorizontal: 8,
    // paddingBottom: 10,
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
  },
  foldersContainerText: {
    fontSize: 24,
    marginBottom: 8,
  },
  folderPicture: {
    width: 100,
    height: 100,
    borderRadius: 4,
  },
  folder: {
    marginRight: 10,
    paddingBottom: 2,
    alignItems: "center",
  },
  folderText: {
    fontWeight: "700",
    letterSpacing: 1,
  },
  buttonTakeshot: {
    position: "absolute",
    right: 25,
    bottom: 25,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(155,150,155,.5)",
  },
  picturesContainer: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,.9)",
    paddingTop: 10,
    paddingHorizontal: 4,
    width: "100%",
  },
  pictureList: {
    // paddingHorizontal: 8,
    // paddingTop: 4,
    // backgroundColor: 'gray',
    marginHorizontal: 'auto',
  },
  pictureContainer: {
    flex: 1,
    margin: 3,
    gap: 5,
  },
  picture: {
    flex: 1,
    width: '100%',
    height: 190,
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,.5 )',
    borderWidth: .1
  },
  noImages: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImagesText: {
    fontSize: 22,
    letterSpacing: 1.5,
    textAlign: 'center',
    marginBottom: 30,
  }
});

