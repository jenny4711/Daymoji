

import React, { useState, useEffect } from 'react';
import { Appearance, Dimensions, LogBox, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DateProvider } from '~/context/DataContext';
import { ThemeProvider, useTheme } from '~/Theme/ThemeProvider';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Nunito_400Regular, Nunito_700Bold, Nunito_500Medium, Nunito_600SemiBold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';

const queryClient = new QueryClient();

const Layout = ({ logIn }: any) => {
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
        <Stack.Screen name="authLogin" />
        <Stack.Screen name="index" options={{ animation: 'none' }} />
        <Stack.Screen name="details/[date]" options={{ presentation: 'modal', animation: 'default' }} />
        <Stack.Screen name="imgDetail/[img]" options={{ presentation: 'modal', animation: 'default' }} />
        <Stack.Screen name="setting" options={{ presentation: 'modal', animation: 'default' }} />
      </Stack>
    </GestureHandlerRootView>
  );
};

export default function App() {
  const [appInitialized, setAppInitialized] = useState(false);
  const [logIn, setLogIn] = useState<boolean>(false);
  const { setScheme, colors } = useTheme();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const prepareApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        const user = await AsyncStorage.getItem('isLogin');
        setLogIn(user === 'true');
        setAppInitialized(true);
        setTimeout(SplashScreen.hideAsync, 1000);
      } catch (error) {
        console.error('Error initializing app:', error);
      }
    };

    prepareApp();
  }, []);

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Nunito_800ExtraBold,
  });

  const checkTimeForTheme = async() => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
  
  
    if (hours >= 6 && hours < 18) {
  
      setScheme('light'); // 오전 6시부터 오후 6시까지는 light mode
       await AsyncStorage.setItem('themeMode', 'auto');
    } else {
      setScheme('dark'); // 오후 6시부터 오전 6시까지는 dark mode
       await AsyncStorage.setItem('themeMode', 'auto');
    }
  };

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem('themeMode');
   
      if(storedTheme === 'auto' || storedTheme === null){
        await checkTimeForTheme()
      }
      setScheme(storedTheme === 'light'  ? 'light':'dark');
    };
    loadTheme();
  }, []);

  useEffect(() => {
    setScheme(colorScheme || 'light');
  }, [colorScheme]);

  if (!fontsLoaded || !appInitialized) {
    return null; // 또는 로딩 컴포넌트
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <DateProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <Layout logIn={logIn} />
          </ThemeProvider>
        </QueryClientProvider>
      </DateProvider>
    </GestureHandlerRootView>
  );
}



