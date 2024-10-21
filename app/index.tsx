

import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Linking ,ActivityIndicator} from 'react-native';
import Login from '~/components/auth/Login';
import { Platform } from 'react-native';
import { FIREBASE_AUTH } from '../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import { useTheme } from '~/Theme/ThemeProvider';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import AppleLogin from '../components/auth/AppleLogin';
import * as WebBrowser from 'expo-web-browser';
import { Dimensions } from 'react-native';
import { useDateContext } from '~/context/DataContext';
import { saveIsToday, updateIsToday } from '~/utils/fireStoreFn';
import { MainLogo } from '~/utils/Icons';
import * as SplashScreen from 'expo-splash-screen';
const { width, height } = Dimensions.get('window');

if (Platform.OS !== 'web') {
  WebBrowser.maybeCompleteAuthSession();
}

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [checkStatus, setCheckStatus] = useState<boolean>(false);
  const [loadingAuthState, setLoadingAuthState] = useState(true); // 로그인 상태 로딩 여부를 위한 상태 추가
  const [userInfo, setUserInfo] = useState<any>(null);

  const { email, setEmail, token, setToken, setIsLoading, isLoading } = useDateContext();
  const { colors, setScheme } = useTheme();

  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = today.getDate();

  const dateS = date < 10 ? `0${date}` : date;
  const monthS = month < 10 ? `0${month}` : month;
  const currentDate = `${year}-${monthS}-${dateS}`;
  
  const yesterdayDateObj = new Date(today); // 어제 날짜 계산
  yesterdayDateObj.setDate(today.getDate() - 1);
  const yesterdayDate = yesterdayDateObj.getDate();
  const yesterdayMonth = yesterdayDateObj.getMonth() + 1;
  const yesterdayYear = yesterdayDateObj.getFullYear();
  const yesterdayDateS = yesterdayDate < 10 ? `0${yesterdayDate}` : yesterdayDate;
  const yesterdayMonthS = yesterdayMonth < 10 ? `0${yesterdayMonth}` : yesterdayMonth;
  const yesterday = `${yesterdayYear}-${yesterdayMonthS}-${yesterdayDateS}`;

  async function authStatus() {
    const status = await AsyncStorage.getItem('isLogin');
    if (status === 'true') {
      setCheckStatus(true);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    authStatus();
    setIsLoading(false);
  }, []);

  const checkTimeForTheme = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (hours >= 6 && hours < 18) {
      setScheme('light');
    } else {
      setScheme('dark');
    }
  };

  useEffect(() => {
    checkTimeForTheme();
  }, []);

  const clientID = Platform.OS === 'ios' 
    ? process.env.EXPO_PUBLIC_IOS_CLIENT_ID
    : process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: clientID,
    redirectUri: Platform.OS === 'web' ? window.location.origin : undefined,
  });

  const navigation = useNavigation<any>();

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential)
        .then(() => {
          if (Platform.OS === 'web') {
            WebBrowser.dismissBrowser(); // 웹에서 팝업 닫기
          }
        })
        .catch((error) => {
          console.log('login fail', error);
        });
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user: any) => {
      if (user) {
        setUserInfo(user);
        const token = user.stsTokenManager?.accessToken;
        const email = user?.email;

        if (Platform.OS === 'web') {
          localStorage.setItem('token', token);
          localStorage.setItem('email', email);
          setEmail(email);
          setToken(token);
        } else {
          await AsyncStorage.setItem('isLogin', 'true');
          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('email', email);
          setEmail(email);
          setToken(token);
          
          await updateIsToday({ date: yesterday, month: yesterdayMonth, isToday: false });
          await saveIsToday({ date: currentDate, month, isToday: true });
        }

        setLoadingAuthState(false); // 로그인 상태 확인 완료
        navigation.navigate('main');
      } else {
        setUserInfo(null);
        setLoadingAuthState(false); // 로그인 상태 확인 완료
      }
    });

    return () => unsubscribe();
  }, []);

  const openPolicy = async () => {
    const url = 'https://daymoji.com/privacy';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  const openService = async () => {
    const url = 'https://daymoji.com/terms';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log(`Don't know how to open this URL: ${url}`);
    }
  };

  if (isLoading || loadingAuthState) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.background }}>
        <ActivityIndicator size="large" color={colors.text} />
      </View>
    );
  }

  return (
    <>
      {!checkStatus ? (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={[styles.container, { backgroundColor: colors.background }]}>
            <View style={[styles.loginContainer, { backgroundColor: colors.background }]}>
              <View style={{ alignItems: 'center', justifyContent: 'center', width: width }}>
                <MainLogo color={colors.text} />
                <Text style={[styles.title, { color: colors.text, fontFamily: 'SFCompactRoundedBD', marginTop: 8 }]}>
                  Daymoji
                </Text>
              </View>
              <View style={open ? { display: 'none' } : {}}>{<Login promptAsync={promptAsync} />}</View>
              <View>{<AppleLogin />}</View>
              <View style={{ width: 341, height: 42, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: colors.indexOpacity, fontFamily: 'SFCompactRoundedRG', lineHeight: 21 }}>
                  By signing up, I agree to Daymoji's{' '}
                  <Text style={{ color: colors.text, opacity: 1 }} onPress={openService}>Terms of Service</Text> and{' '}
                </Text>
                <Text style={{ fontSize: 14, color: colors.text, fontFamily: 'SFCompactRoundedRG', lineHeight: 21 }} onPress={openPolicy}>
                  Privacy Policy
                </Text>
              </View>
            </View>
          </View>
        </GestureHandlerRootView>
      ) : null}
    </>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: height,
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    flexDirection: 'column',
  },
  title: {
    fontSize: 20,
    marginTop: 8,
  },
});