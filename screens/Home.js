import { View, Text, StyleSheet, Image, FlatList, SectionList, SafeAreaView, Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';


const imgURL = 'https://img.freepik.com/free-photo/person-enjoying-warm-nostalgic-sunset_52683-100695.jpg?w=1380&t=st=1693908616~exp=1693909216~hmac=7cc7a1d87c35848b3727b4b3a8e4a6f516a1427cf1b97008c4eeea3d647c8ac6';

const Home = () => {

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerContainerText}>
            My Images
          </Text>
        </View>
        <View style={styles.foldersContainer}>
          <Text style={styles.foldersContainerText}>
            Folders
          </Text>
          <FlatList
            horizontal
            data={dummyData}
            renderItem={({ item }) => {
              return (
                <View style={styles.folder}>
                  <Image source={{ uri: item.picture }} style={styles.folderPicture} resizeMode="cover" />
                  <Text style={styles.folderText}>
                    {item.title}
                  </Text>
                  <Text>({item.count})</Text>
                </View>)
            }}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <View style={styles.picturesContainer}>
          <FlatList
             data={dummyData}
            //  contentContainerStyle={{flexDirection: 'row'}}
             style={styles.pictureList}
             renderItem={({ item }) => {
              return (
                <View style={styles.folder}>
                  <Image source={{ uri: item.picture }} style={styles.picture} resizeMode="cover" />
                </View>)
            }}
            showsVerticalScrollIndicator={true}
          />
        </View>

        <Pressable style={styles.buttonTakeshot} onPress={() => { }}>
          <Ionicons name="camera" size={48} color="black" />
        </Pressable>
      </SafeAreaView>
    </View>
  )
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
  },
  headerContainer: {
    height: 90,
    // backgroundColor: 'brown',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainerText: {
    fontSize: 30,
    fontWeight: '600',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 0,
  },
  foldersContainer: {
    // backgroundColor: 'yellow',
    minHeight: 150,
    padding: 10,
    borderBottomColor: 'black',
    borderBottomWidth: .5,
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
    marginHorizontal: 8,
    alignItems: 'center',
  },
  folderText: {
    fontWeight: '700',
    letterSpacing: 1,
  },
  buttonTakeshot: {
    position: 'absolute',
    right: 25,
    bottom: 25,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(155,150,155,.5)',
  },
  picturesContainer: {
    flex: 1,
    backgroundColor: 'rgba(230,230,230,.5)',
    padding: 15,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  pictureList: {
    width: '100%',
    borderWidth: 1,
    
  },
  pictureContainer: {
    width: '100%',
    height: 200,
  }, 
  picture: {
    width: '50%',
    height: 200,
  }
})

const dummyData = [
  {
    title: 'Soweto',
    picture: imgURL,
    count: 5,
  },
  {
    title: 'Selfies',
    picture: 'https://picsum.photos/id/10/200',
    count: 15,
  },
  {
    title: 'Family',
    picture: 'https://picsum.photos/id/101/200',
    count: 3,
  },
  {
    title: 'Gents',
    picture: 'https://picsum.photos/id/11/200',
    count: 25,
  },
  {
    title: 'Cars',
    picture: 'https://picsum.photos/id/30/200',
    count: 11,
  },
  {
    title: 'Tech',
    picture: imgURL,
    count: 9,
  },
  {
    title: 'Cheatsheets',
    picture: imgURL,
    count: 18,
  },
  {
    title: 'Logos',
    picture: imgURL,
    count: 20,
  },
  {
    title: 'Icons',
    picture: imgURL,
    count: 5,
  },
  {
    title: 'Plants',
    picture: imgURL,
    count: 5,
  },
]

const dummyPics = [
  {
    title: 'Soweto',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/10/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Selfies',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    title: 'Family',
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
      },

      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
]