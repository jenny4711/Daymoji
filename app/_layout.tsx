// import React,{useState,useEffect} from 'react';
// import { Text,TouchableOpacity ,Platform,View,Appearance} from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Stack ,SplashScreen} from 'expo-router';
// import { StatusBar } from 'expo-status-bar'
// import { DateProvider } from '~/context/DataContext';
// import { ThemeProvider } from '~/Theme/ThemeProvider';
// import { QueryClientProvider ,QueryClient} from '@tanstack/react-query';
// import * as Font from 'expo-font';
// // import * as SplashScreen from 'expo-splash-screen';
// // import SplashScreenView from '../components/SplashScreenView';
// import { useTheme } from '~/Theme/ThemeProvider';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useDateContext } from '~/context/DataContext';
// import { useColorScheme } from 'react-native';
//  SplashScreen.preventAutoHideAsync();
// const queryClient = new QueryClient()
// //npm run export       
// // export const unstable_settings={
// //   initialRouteName:'index',
// // }

// function Layout({loggedIn,setShowSplash,showSplash}:any) {
//   const { colors } = useTheme();
  
 
//   return (
//     <>
   
//     <StatusBar style="auto" />
//    <GestureHandlerRootView style={{flex:1}}>
//     <Stack
//           screenOptions={{
//             headerShown: false,
//             gestureEnabled: false, // 제스처 사용 가능 여부
//             animation: 'fade',  
//             contentStyle: {
//               backgroundColor: colors.background,  // 애니메이션 도중 배경색 설정
//             },
          
//           }}
//         >
//     {!loggedIn?  <Stack.Screen name="index" options={{headerShown:false,gestureEnabled:false}} />
//     :
//        <Stack.Screen name="main" options={{headerShown:false,gestureEnabled:false}}/>}
//        <Stack.Screen name="details/[date]" options={{headerShown:false,presentation:'modal',animation:'default'}}/>
//        <Stack.Screen name="imgDetail/[img]" options={{headerShown:false,presentation:'modal',animation:'default'}}/>
//        <Stack.Screen name="setting" options={{headerShown:false,presentation:'modal',animation:'default'}}/>
 
//      </Stack>
 
//     </GestureHandlerRootView>

//     </>
//   )
// }

// export default function App(){
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [loggedIn, setLoggedIn] = useState<boolean>(false);
//   const [showSplash, setShowSplash] = useState(false);
//   const { colors, setScheme } = useTheme();
//   const {themeMode,setThemeMode}=useDateContext()
//   const colorScheme:any = useColorScheme(); 
//   SplashScreen.preventAutoHideAsync();
//   setTimeout(SplashScreen.hideAsync, 1000);



  
  


// async function checkUser(){
//   const user = await AsyncStorage.getItem('isLogin')



//   if(user){
//     setLoggedIn(true)
    
//   }else{
//     setLoggedIn(false)
  
//   }
// }

// useEffect(()=>{
//   checkUser()

// },[])


//   const checkTimeForTheme = () => {
//     const currentTime = new Date();
//     const hours = currentTime.getHours();
//     if (hours >= 6 && hours < 18) {
//       setScheme('light');
//       Appearance.setColorScheme('light');
//     } else {
//       setScheme('dark');
//       Appearance.setColorScheme('dark');
//     }
//   };

//   useEffect(() => {
//     async function saveThemeMode(){
//       // themeMode가 'auto'일 경우 시스템 테마에 따라 자동으로 설정
//       const theme = await AsyncStorage.getItem('themeMode')
//       if (theme === 'auto') {
//        checkTimeForTheme();  // 시스템 테마에 맞추어 자동으로 설정
//      } else if (theme === 'light') {
//        setScheme('light');
      
     
//     }else{
//       setScheme('dark');
     
//     }
   
//    }
//    saveThemeMode()
//    }, [themeMode,colorScheme]); 
 
//   useEffect(() => {
   
    
//     if (colorScheme) {
//       setScheme(colorScheme); // 테마를 시스템 설정에 맞춰 설정
//     }

//     // 테마 변경을 실시간으로 감지
//     const subscription = Appearance.addChangeListener(({ colorScheme }) => {
//       if (colorScheme) {
//         console.log('colorScheme%%%%%%%%%%%%%%%%%%%%%%%%%%%%%',colorScheme)
//         setScheme(colorScheme);
//       }
//     });

//     return () => subscription.remove(); // 클린업
//   }, [colorScheme]);


//   useEffect(()=>{
//     async function loadFonts() {
//       try{
//         // await SplashScreen.preventAutoHideAsync();
//         await Font.loadAsync({
//           "SFCompactRounded":require('../assets/fonts/SFCompactRounded.ttf'),
//           "SFCompactRoundedRG":require('../assets/fonts/SF-Compact-Rounded-Regular.otf'),
//           "SFCompactRoundedBD":require('../assets/fonts/SF-Compact-Rounded-Bold.ttf'),
//           "SFCompactRoundedSB":require('../assets/fonts/SF-Compact-Rounded-Semibold.otf'),
//           "SFCompactRoundedMD":require('../assets/fonts/SF-Compact-Rounded-Medium.otf'),
//           "SFCompactRoundedHV":require('../assets/fonts/SF-Compact-Rounded-Heavy.otf'),
//         });
//         setFontsLoaded(true);
//          await SplashScreen.hideAsync();
//         setShowSplash(false)
//       }catch(error){
//         console.log(error,'error-font')
//       }
//     }
//     loadFonts()
//     },[])


  
//     if (!fontsLoaded) {
      
//       return null; // 또는 로딩 스피너를 보여줄 수도 있습니다.
//     }
//   return(
    

// <ThemeProvider>
//     <DateProvider>
// <QueryClientProvider client={queryClient}>
//       <Layout loggedIn={loggedIn} showSplash={showSplash} setShowSplash={setShowSplash}/>
  
//       </QueryClientProvider>
//       </DateProvider>
//   </ThemeProvider>

//   )
// }












import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, Platform, View, Appearance ,Dimensions} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack, SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DateProvider } from '~/context/DataContext';
import { ThemeProvider } from '~/Theme/ThemeProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import * as Font from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '~/Theme/ThemeProvider';
import { useColorScheme } from 'react-native';

const { width, height } = Dimensions.get('window');

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 1000);
const queryClient = new QueryClient();

const Layout = ({ loggedIn }) => {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        {loggedIn === false ? (
          <Stack.Screen
            name="index"
            options={{ headerShown: false, gestureEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="main"
            options={{ headerShown: false, gestureEnabled: false }}
          />
        )}
        <Stack.Screen
          name="details/[date]"
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'default',
          }}
        />
        <Stack.Screen
          name="imgDetail/[img]"
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'default',
          }}
        />
        <Stack.Screen
          name="setting"
          options={{
            headerShown: false,
            presentation: 'modal',
            animation: 'default',
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
};


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [appInitialized, setAppInitialized] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const { setScheme,colors } = useTheme();
  const colorScheme = useColorScheme();
  const appearance = Appearance.getColorScheme();

  useEffect(() => {
    async function initializeApp() {
      try {
        // 폰트 로드
        await Font.loadAsync({
          SFCompactRounded: require('../assets/fonts/SFCompactRounded.ttf'),
          SFCompactRoundedRG: require('../assets/fonts/SF-Compact-Rounded-Regular.otf'),
          SFCompactRoundedBD: require('../assets/fonts/SF-Compact-Rounded-Bold.ttf'),
          SFCompactRoundedSB: require('../assets/fonts/SF-Compact-Rounded-Semibold.otf'),
          SFCompactRoundedMD: require('../assets/fonts/SF-Compact-Rounded-Medium.otf'),
          SFCompactRoundedHV: require('../assets/fonts/SF-Compact-Rounded-Heavy.otf'),
        });

        // 테마 설정 로드
        const storedTheme:any = await AsyncStorage.getItem('themeMode');
        if (storedTheme) {
          setScheme(storedTheme);
          console.log('storedTheme',storedTheme)
          await Appearance.setColorScheme(storedTheme);
        } else {
          setScheme(colorScheme || 'light');
          console.log('colorScheme-else^^^^^^^^^^',colorScheme)
          await Appearance.setColorScheme(colorScheme || 'light');
        }

        // 로그인 상태 확인
        const user = await AsyncStorage.getItem('isLogin');
        setLoggedIn(user ? true : false);
      } catch (error) {
        console.error("App initialization failed:", error);
      } finally {
        setFontsLoaded(true);
        setAppInitialized(true);
        SplashScreen.hideAsync(); // 모든 초기화가 끝난 후에 스플래시 화면 숨기기
      }
    }

    initializeApp();
  }, []);

  if (!fontsLoaded || !appInitialized) {
    // 초기화가 끝날 때까지 아무것도 렌더링하지 않음
    return <View style={{width:width,height:height,backgroundColor:colors.background}}/>;
  }

  return (
    <ThemeProvider>
      <DateProvider>
        <QueryClientProvider client={queryClient}>
          <Layout loggedIn={loggedIn} />
        </QueryClientProvider>
      </DateProvider>
    </ThemeProvider>
  );
}
