import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Entypo } from '@expo/vector-icons';


import CameraShot from './screens/CameraShot';
import Home from './screens/Home';
import ViewImage from './screens/ViewImage';

const MenuButton = () => {
  return (
    <Entypo name="dots-three-vertical" size={24} color="black" />
  )
};

export default function App() {
  const Stack = createNativeStackNavigator();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: 'transparent',
    },
  };

  return (
    <NavigationContainer theme={navTheme} >
      <StatusBar
        animated={true}
        style={'auto'}
      />
      <Stack.Navigator screenOptions={{
        animation: 'slide_from_right',
      }} headerMode="screen" >
        <Stack.Screen name="Home" component={Home} options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}/>

        <Stack.Screen name="ViewImage" component={ViewImage} options={{
          headerShown: true,}}
        />
        
        <Stack.Screen name="CameraShot" component={CameraShot} options={{
        headerShown: false,
        animation: 'slide_from_right',
      }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
