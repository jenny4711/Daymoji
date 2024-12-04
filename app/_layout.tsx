import React, { useState, useEffect, useCallback } from 'react';
import { Appearance, Dimensions, LogBox, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DateProvider } from '~/context/DataContext';
import { ThemeProvider, useTheme } from '~/Theme/ThemeProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {handleTodayDate} from '~/utils/utilsFn'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, 
  Nunito_400Regular,
   Nunito_700Bold ,
   Nunito_500Medium,
Nunito_600SemiBold,

Nunito_800ExtraBold,
  
  
  } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';

const { width, height } = Dimensions.get('window');
LogBox.ignoreLogs(['Require cycle:']); // 특정 경고 무시

 SplashScreen.preventAutoHideAsync();
const queryClient = new QueryClient();

const Layout = ({ logIn }: any) => {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
     
    >
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
          contentStyle: { backgroundColor: colors.background },
        }}
      >
       
       
          <Stack.Screen name="authLogin" options={{ headerShown: false, gestureEnabled: false }} />
          <Stack.Screen name="index" options={{ headerShown: false, gestureEnabled: false, animation: 'none' }} />
      
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
  const [appInitialized, setAppInitialized] = useState(false);
  const [logIn, setLogIn] = useState<boolean >(false);
  const { setScheme, colors } = useTheme();
  const colorScheme = useColorScheme();
  SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 1000);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('isLogin');
       
        if (user === 'true') {
          setLogIn(true);
    
        } else {
          setLogIn(false);
        }
      } catch (error) {
        console.error('Error fetching login status: ', error);
      }
      setAppInitialized(true); // 앱 초기화가 완료되었음을 표시
    };
  
    checkLoginStatus();
  }, []);



  // 폰트 로드
  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    
    Nunito_800ExtraBold,
  });

  // 테마 로드
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('themeMode');
      console.log(storedTheme, 'storedTheme');

      // 기본값 설정
      if (storedTheme !== 'light' && storedTheme !== 'dark') {
        setScheme('light'); // 기본값 설정
      } else {
        setScheme(storedTheme);
      }
    };
    loadTheme();
  }, []);

  // 시스템 테마 변경 감지
  useEffect(() => {
    console.log(colorScheme, 'current colorScheme');
    setScheme(colorScheme || 'light'); // 기본값 처리
  }, [colorScheme]);



  return (
    
      <DateProvider>
        <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Layout logIn={logIn}  />
          </ThemeProvider>
        </QueryClientProvider>
      </DateProvider>
   
  );
}

















// import React,{useState,useEffect} from 'react';
// import { Text,TouchableOpacity ,Platform,View} from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { DateProvider } from '~/context/DataContext';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar'
// import { useColorScheme } from 'react-native';

// import { useTheme } from '~/Theme/ThemeProvider';

// import { useRouter } from 'expo-router';
// import { ThemeProvider } from '~/Theme/ThemeProvider';
// import { Query } from 'firebase/firestore';
// import { QueryClientProvider ,QueryClient} from '@tanstack/react-query';
// import * as Font from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// const queryClient = new QueryClient()

// function Layout() {

//   const {colors,dark,setScheme}=useTheme()
 






//   return (
//     <>
//    <StatusBar style="auto" />
//    <GestureHandlerRootView style={{flex:1}}>
//     <Stack>
//     <Stack.Screen name="index" options={{headerShown:false}} />
//       <Stack.Screen name="main" options={{headerShown:false}}/>
//       <Stack.Screen name="detail/[date]" options={{headerShown:false,presentation:'modal'}}/>
//       <Stack.Screen name="setting" options={{headerShown:false,presentation:'modal'}}/>

//     </Stack>

//    </GestureHandlerRootView>
//    </>
//   )
// }

// export default function App(){
//   SplashScreen.preventAutoHideAsync();
//   setTimeout(SplashScreen.hideAsync, 1000);

//   useEffect(()=>{
//   async function loadFonts() {
//     try{
//       await SplashScreen.preventAutoHideAsync();
//       await Font.loadAsync({
//         "SFCompactRounded":require('../assets/fonts/SFCompactRounded.ttf'),
//         "SFCompactRoundedRG":require('../assets/fonts/SF-Compact-Rounded-Regular.otf'),
//         "SFCompactRoundedBD":require('../assets/fonts/SF-Compact-Rounded-Bold.ttf'),
//         "SFCompactRoundedSB":require('../assets/fonts/SF-Compact-Rounded-Semibold.otf'),
//         "SFCompactRoundedMD":require('../assets/fonts/SF-Compact-Rounded-Medium.otf'),
//         "SFCompactRoundedHV":require('../assets/fonts/SF-Compact-Rounded-Heavy.otf'),
//       });
      
//     }catch(error){
//       console.log(error,'error-font')
//     }
//   }
//   loadFonts()
//   },[])
//   return(
//     <ThemeProvider>
//       <DateProvider>
//  <QueryClientProvider client={queryClient}>
//         <Layout/>
    
//         </QueryClientProvider>
//         </DateProvider>
//     </ThemeProvider>
//   )

// }






// import React, { useState, useEffect } from 'react';
// import { Text, TouchableOpacity, Platform, View, Appearance ,Dimensions} from 'react-native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Stack} from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { DateProvider } from '~/context/DataContext';
// import { ThemeProvider } from '~/Theme/ThemeProvider';
// import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
// import * as Font from 'expo-font';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useTheme } from '~/Theme/ThemeProvider';
// import { useColorScheme } from 'react-native';
// import { useDateContext } from '~/context/DataContext';
// import { LogBox } from 'react-native';
// import * as SplashScreen from 'expo-splash-screen';
// const { width, height } = Dimensions.get('window');
// LogBox.ignoreLogs([
//   'Require cycle:', // 특정 경고 메시지 무시
// ]);

// SplashScreen.preventAutoHideAsync();

// const queryClient = new QueryClient();

// const Layout = ({logIn}:any) => {
//   const { colors } = useTheme();





//   return (
//     <GestureHandlerRootView  style={{ flex: 1 }}>
//       <StatusBar style="auto" />
//       <Stack
//         screenOptions={{
//           headerShown: false,
//           gestureEnabled: false,
//           animation: 'fade',
//           contentStyle: { backgroundColor: colors.background },
//         }}
//       >
//         {logIn === false ? (
//           <Stack.Screen
//             name="index"
//             options={{ headerShown: false, gestureEnabled: false}}
//           />
//         ) : (
//           <Stack.Screen
//             name="main"
//             options={{ headerShown: false, gestureEnabled: false ,animation:'none'}}
//           />
//         )}
//         <Stack.Screen
//           name="details/[date]"
//           options={{
//             headerShown: false,
//             presentation: 'modal',
//             animation: 'default',
//           }}
//         />
//         <Stack.Screen
//           name="imgDetail/[img]"
//           options={{
//             headerShown: false,
//             presentation: 'modal',
//             animation: 'default',
//           }}
//         />
//         <Stack.Screen
//           name="setting"
//           options={{
//             headerShown: false,
//             presentation: 'modal',
//             animation: 'default',
//           }}
//         />
//       </Stack>
//     </GestureHandlerRootView>
//   );
// };


// export default function App() {
//   const [fontsLoaded, setFontsLoaded] = useState(false);
//   const [appInitialized, setAppInitialized] = useState(false);
//    const [logIn, setLogIn] = useState<boolean | null>(null);
//   const { setScheme,colors } = useTheme();
//   const colorScheme = useColorScheme();
//   const appearance = Appearance.getColorScheme();
//   SplashScreen.preventAutoHideAsync();
//   // setTimeout(SplashScreen.hideAsync, 1000);

// // useEffect(()=>{
// //   const loadTheme = async () => {
// //     const storedTheme:any = await AsyncStorage.getItem('themeMode');
// //     console.log(storedTheme,'storedTheme')
// //     setScheme(storedTheme || 'auto');
// //      Appearance.setColorScheme(storedTheme || 'auto');
// //   };
// //   loadTheme();
// //   // SplashScreen.preventAutoHideAsync();
// //   // setTimeout(SplashScreen.hideAsync, 300);
// // },[])

// // console.log(appearance,'appearance')
 

//   useEffect(() => {
//     async function initializeApp() {
//       try {
//         // await SplashScreen.preventAutoHideAsync();
//          // 테마 설정 로드
//         //  const storedTheme:any = await AsyncStorage.getItem('themeMode');
//         //  if (storedTheme) {
//         //    setScheme(storedTheme);
//         //  console.log(storedTheme,'storedTheme')
//         //   await Appearance.setColorScheme(storedTheme);
//         //  } else {
//         //    setScheme(colorScheme || 'light');
//         // console.log(colorScheme,'colorScheme')
//         //     await Appearance.setColorScheme(colorScheme || 'light');
//         //  }
    
//         // 폰트 로드
//         await Font.loadAsync({
//           SFCompactRounded: require('../assets/fonts/SFCompactRounded.ttf'),
//           SFCompactRoundedRG: require('../assets/fonts/SF-Compact-Rounded-Regular.otf'),
//           SFCompactRoundedBD: require('../assets/fonts/SF-Compact-Rounded-Bold.ttf'),
//           SFCompactRoundedSB: require('../assets/fonts/SF-Compact-Rounded-Semibold.otf'),
//           SFCompactRoundedMD: require('../assets/fonts/SF-Compact-Rounded-Medium.otf'),
//           SFCompactRoundedHV: require('../assets/fonts/SF-Compact-Rounded-Heavy.otf'),
//         });

       

//         // 로그인 상태 확인
//         const user = await AsyncStorage.getItem('isLogin');
//         setLogIn(user ? true : false);
//         setFontsLoaded(true);
//         setAppInitialized(true);
//       } catch (error) {
//         console.error("App initialization failed:", error);
//       } finally {
      
//        await SplashScreen.hideAsync(); // 모든 초기화가 끝난 후에 스플래시 화면 숨기기
//       }
//     }

//     initializeApp();
//   }, []);

//   if (!fontsLoaded || !appInitialized) {
//     // 초기화가 끝날 때까지 아무것도 렌더링하지 않음
//     return <View style={{width:width,height:height,backgroundColor:colors.background}}/>;
//   }

//   return (
//     <ThemeProvider>
//       <DateProvider>
//         <QueryClientProvider client={queryClient}>
//           <Layout logIn={logIn} />
//         </QueryClientProvider>
//       </DateProvider>
//     </ThemeProvider>
//   );
// }