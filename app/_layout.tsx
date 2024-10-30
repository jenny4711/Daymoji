
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
import { useDateContext } from '~/context/DataContext';
const { width, height } = Dimensions.get('window');

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 100);
const queryClient = new QueryClient();

const Layout = ({logIn}:any) => {
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
        {logIn === false ? (
          <Stack.Screen
            name="index"
            options={{ headerShown: false, gestureEnabled: false }}
          />
        ) : (
          <Stack.Screen
            name="main"
            options={{ headerShown: false, gestureEnabled: false ,animation:'none'}}
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
   const [logIn, setLogIn] = useState<boolean | null>(null);
  const { setScheme,colors } = useTheme();
  const colorScheme = useColorScheme();
  const appearance = Appearance.getColorScheme();


useEffect(()=>{
  const loadTheme = async () => {
    const storedTheme:any = await AsyncStorage.getItem('themeMode');
    setScheme(storedTheme || 'auto');
  };
  loadTheme();
},[])


   SplashScreen.preventAutoHideAsync();
  setTimeout(SplashScreen.hideAsync, 100);

  useEffect(() => {
    async function initializeApp() {
      try {

         // 테마 설정 로드
        //  const storedTheme:any = await AsyncStorage.getItem('themeMode');
        //  if (storedTheme) {
        //    setScheme(storedTheme);
        //  console.log(storedTheme,'storedTheme')
        //   await Appearance.setColorScheme(storedTheme);
        //  } else {
        //    setScheme(colorScheme || 'light');
        // console.log(colorScheme,'colorScheme')
        //     await Appearance.setColorScheme(colorScheme || 'light');
        //  }
    
        // 폰트 로드
        await Font.loadAsync({
          SFCompactRounded: require('../assets/fonts/SFCompactRounded.ttf'),
          SFCompactRoundedRG: require('../assets/fonts/SF-Compact-Rounded-Regular.otf'),
          SFCompactRoundedBD: require('../assets/fonts/SF-Compact-Rounded-Bold.ttf'),
          SFCompactRoundedSB: require('../assets/fonts/SF-Compact-Rounded-Semibold.otf'),
          SFCompactRoundedMD: require('../assets/fonts/SF-Compact-Rounded-Medium.otf'),
          SFCompactRoundedHV: require('../assets/fonts/SF-Compact-Rounded-Heavy.otf'),
        });

       

        // 로그인 상태 확인
        const user = await AsyncStorage.getItem('isLogin');
        setLogIn(user ? true : false);
     
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
          <Layout logIn={logIn} />
        </QueryClientProvider>
      </DateProvider>
    </ThemeProvider>
  );
}
