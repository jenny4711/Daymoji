import React,{useState,useEffect} from 'react';
import { Text,TouchableOpacity ,Platform,View} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar'
import { DateProvider } from '~/context/DataContext';
import { ThemeProvider } from '~/Theme/ThemeProvider';
import { QueryClientProvider ,QueryClient} from '@tanstack/react-query';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useTheme } from '~/Theme/ThemeProvider';
 SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient()
//npm run export       
export const unstable_settings={
  initialRouteName:'index',
}

function Layout() {
  return (
    <>
    <StatusBar style="auto" />
    <GestureHandlerRootView style={{flex:1}}>
     <Stack>
      <Stack.Screen name="index" options={{headerShown:false,gestureEnabled:false}} />
       <Stack.Screen name="main" options={{headerShown:false,gestureEnabled:false}}/>
       <Stack.Screen name="details/[date]" options={{headerShown:false,presentation:'modal'}}/>
       <Stack.Screen name="imgDetail/[img]" options={{headerShown:false,presentation:'modal'}}/>
       <Stack.Screen name="setting" options={{headerShown:false,presentation:'modal'}}/>
 
     </Stack>
 
    </GestureHandlerRootView>
    </>
  )
}

export default function App(){
  const [fontsLoaded, setFontsLoaded] = useState(false);
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 1000);
 



  useEffect(()=>{
    async function loadFonts() {
      try{
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          "SFCompactRounded":require('../assets/fonts/SFCompactRounded.ttf'),
          "SFCompactRoundedRG":require('../assets/fonts/SF-Compact-Rounded-Regular.otf'),
          "SFCompactRoundedBD":require('../assets/fonts/SF-Compact-Rounded-Bold.ttf'),
          "SFCompactRoundedSB":require('../assets/fonts/SF-Compact-Rounded-Semibold.otf'),
          "SFCompactRoundedMD":require('../assets/fonts/SF-Compact-Rounded-Medium.otf'),
          "SFCompactRoundedHV":require('../assets/fonts/SF-Compact-Rounded-Heavy.otf'),
        });
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }catch(error){
        console.log(error,'error-font')
      }
    }
    loadFonts()
    },[])
  
    if (!fontsLoaded) {
      return null; // 또는 로딩 스피너를 보여줄 수도 있습니다.
    }
  return(
    <ThemeProvider>
    <DateProvider>
<QueryClientProvider client={queryClient}>
      <Layout/>
  
      </QueryClientProvider>
      </DateProvider>
  </ThemeProvider>
  )
}
