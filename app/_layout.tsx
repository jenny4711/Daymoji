import React,{useState,useEffect} from 'react';
import { Text,TouchableOpacity ,Platform,View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import * as SplashScreen from 'expo-splash-screen';

export const unstable_settings={
  initialRouteName:'index',
}

function Layout() {
  return (
    <>
    <StatusBar style="auto" />
    <GestureHandlerRootView style={{flex:1}}>
     <Stack>
     <Stack.Screen name="index" options={{headerShown:false}} />
       <Stack.Screen name="main" options={{headerShown:false}}/>
       <Stack.Screen name="detail/[date]" options={{headerShown:false,presentation:'modal'}}/>
       <Stack.Screen name="setting" options={{headerShown:false,presentation:'modal'}}/>
 
     </Stack>
 
    </GestureHandlerRootView>
    </>
  )
}

export default function App(){
  return(
    <Layout/>
  )
}
