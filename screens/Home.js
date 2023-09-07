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
import { addImage, createTable, db, deleteAllImages, getAllImages } from "../database/database";
import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';

const imgURL =
  "https://img.freepik.com/free-photo/person-enjoying-warm-nostalgic-sunset_52683-100695.jpg?w=1380&t=st=1693908616~exp=1693909216~hmac=7cc7a1d87c35848b3727b4b3a8e4a6f516a1427cf1b97008c4eeea3d647c8ac6";

const Home = ({ navigation }) => {
  const [groupedImages, setGroupedImages] = useState([])
  const [folderData, setFolderData] = useState([])
  const [currentShownFolder, setCurrentShownFolder] = useState([])

  useEffect(() => {
    createTable();
    getAllImages((data) => {
      console.log('groups',groupByAlbum(data));
      setGroupedImages(groupByAlbum(data));
    })

  }, [])
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
    const data = groupedImages.map(({ folderName, elements: images }) => ({
      folderName,
      firstImage: images[0].uri,
      length: images.length
    }));
    console.log('data',data)
    return data;
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>My Images</Text>
        </View>
        <View style={styles.foldersContainer}>
          <Text style={styles.foldersContainerText}>Albums</Text>
          <FlatList
            horizontal
            data={foldersData()}
            renderItem={({ item }) => {
              return (
                <View style={styles.folder}>
                  <Image
                    source={{ uri: item.firstImage }}
                    style={styles.folderPicture}
                    resizeMode="cover"
                  />
                  <Text style={styles.folderText}>{item.folderName}</Text>
                  <Text>({item.length})</Text>
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <SafeAreaView style={styles.picturesContainer}>
          <FlatList
            data={dummyData}
            contentContainerStyle={styles.pictureList}
            numColumns={2}
            style={styles.pictureList}
            renderItem={({ item }) => {
              return (
                <View style={styles.pictureContainer}>
                  <TouchableOpacity onPress={() => {navigation.navigate('ViewImage', {imgURL: item.picture})}}>
                    <Image
                      source={{ uri: item.picture }}
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

        <Pressable style={styles.buttonTakeshot} onPress={() => navigation.navigate('CameraShot')}>
          <Ionicons name="camera" size={48} color="black" />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

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
    paddingBottom: 10,
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
  },
});

const dummyData = [
  {
    title: "Camera",
    picture: imgURL,
    count: 5,
  },
  {
    title: "Selfies",
    picture: "file:///data/user/0/host.exp.exponent/files/images/1694006119933.jpg",
    count: 15,
  },
  {
    title: "Family",
    picture: "https://picsum.photos/id/101/200",
    count: 3,
  },
  {
    title: "Gents",
    picture: "https://picsum.photos/id/11/200",
    count: 25,
  },
  {
    title: "Cars",
    picture: "https://picsum.photos/id/30/200",
    count: 11,
  },
  {
    title: "Tech",
    picture: imgURL,
    count: 9,
  },
  {
    title: "Cheatsheets",
    picture: imgURL,
    count: 18,
  },
];

const dummyPics = [
  {
    title: "Soweto",
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/10/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1002/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1006/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1008/200",
      },
    ],
  },
  {
    title: "Selfies",
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1011/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1012/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1013/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1015/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1016/200",
      },
    ],
  },
  {
    title: "Family",
    data: [
      {
        key: "1",
        text: "Item text 1",
        uri: "https://picsum.photos/id/1020/200",
      },
      {
        key: "2",
        text: "Item text 2",
        uri: "https://picsum.photos/id/1024/200",
      },

      {
        key: "3",
        text: "Item text 3",
        uri: "https://picsum.photos/id/1027/200",
      },
      {
        key: "4",
        text: "Item text 4",
        uri: "https://picsum.photos/id/1035/200",
      },
      {
        key: "5",
        text: "Item text 5",
        uri: "https://picsum.photos/id/1038/200",
      },
    ],
  },
];
