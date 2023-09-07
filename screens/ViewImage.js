import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, Pressable, View, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Entypo } from '@expo/vector-icons';

const ViewImage = ({ route, navigation }) => {
  const [showActions, setShowActions] = useState(true);
  const { imgURL } = route.params;

  // const imgURL =
  //   "https://img.freepik.com/free-photo/person-enjoying-warm-nostalgic-sunset_52683-100695.jpg?w=1380&t=st=1693908616~exp=1693909216~hmac=7cc7a1d87c35848b3727b4b3a8e4a6f516a1427cf1b97008c4eeea3d647c8ac6";

  return (
    <View style={styles.container}>
      <Pressable style={styles.image} onPress={() => setShowActions(!showActions)}>
        <Image source={{ uri: imgURL }} style={styles.image} resizeMode='cover' />
      </Pressable>
      {
        showActions &&
        <View style={styles.actionsContainer}>
          <View style={styles.actionContainer}>
            <Entypo name="share" size={24} color="black" />
            <Text style={styles.actionText}>share</Text>
          </View>
          <View style={styles.actionContainer}>
            <Entypo name="folder-images" size={24} color="black" />
            <Text style={styles.actionText}>move to</Text>
          </View>
          <View style={styles.actionContainer}>
            <Entypo name="trash" size={24} color="black" />
            <Text style={styles.actionText}>delete</Text>
          </View>
          <View style={styles.actionContainer}>
            <Entypo name="info-with-circle" size={24} color="black" />
            <Text style={styles.actionText}>info</Text>
          </View>
        </View>
      }
    </View>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
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
