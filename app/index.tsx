import React, { useState,  useEffect } from 'react';
import { StyleSheet, Text,  View, Linking,Button } from 'react-native';
import Login from '~/components/auth/Login';
import { Platform } from 'react-native';
import { FIREBASE_AUTH } from '../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import { useTheme } from '~/Theme/ThemeProvider';
import { Link, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import AppleLogin from '../components/auth/AppleLogin';
import * as WebBrowser from 'expo-web-browser';
import Logo from '../components/auth/Logo';
import { Dimensions } from 'react-native';
import { useDateContext } from '~/context/DataContext';
import Head from 'expo-router/head';
import { saveIsToday,updateIsToday } from '~/utils/fireStoreFn';
import { MainLogo } from '~/utils/Icons';
const {width,height}=Dimensions.get('window')



if (Platform.OS !== 'web') {

  WebBrowser.maybeCompleteAuthSession();
}


const Page = () => {
const [open,setOpen] = useState<boolean>(false)

  const [userInfo, setUserInfo] = useState<any>(null);
  const {email,setEmail,token,setToken}=useDateContext()
const {colors}=useTheme() 
const today = new Date()
const month = today.getMonth()+1
const year = today.getFullYear()
const date = today.getDate()

const dateS = date < 10 ? `0${date}` : date;
const monthS = month < 10 ? `0${month}` : month;
const currentDate = `${year}-${monthS}-${dateS}`
// 어제 날짜 계산 (Date 객체를 사용하여 날짜를 조작)
const yesterdayDateObj = new Date(today); // 오늘 날짜를 복사
yesterdayDateObj.setDate(today.getDate() - 1); // 어제로 설정

// 어제 날짜 형식화
const yesterdayDate = yesterdayDateObj.getDate();
const yesterdayMonth = yesterdayDateObj.getMonth() + 1;
const yesterdayYear = yesterdayDateObj.getFullYear();
const yesterdayDateS = yesterdayDate < 10 ? `0${yesterdayDate}` : yesterdayDate;
const yesterdayMonthS = yesterdayMonth < 10 ? `0${yesterdayMonth}` : yesterdayMonth;
const yesterday = `${yesterdayYear}-${yesterdayMonthS}-${yesterdayDateS}`;
console.log("Today:", monthS);
console.log("Yesterday:",yesterdayMonth);


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
     
      signInWithCredential(FIREBASE_AUTH, credential).then(()=>{
        console.log('success')
        if (Platform.OS === 'web') {
          WebBrowser.dismissBrowser();  // 팝업 닫기 (웹 환경에서 팝업 닫는 로직 추가)
        }
      }).catch((error)=>{console.log('login fail',error)})
     
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user:any) => {
   
      if (user) {
      
        setUserInfo(user);
       const token = user.stsTokenManager?.accessToken
      const email = user?.email
if(Platform.OS === 'web'){
  localStorage.setItem('token',token)
  localStorage.setItem('email',email)
  setEmail(email)
  setToken(token)
}else{
  await AsyncStorage.setItem('token',token)
  await AsyncStorage.setItem('email',email)

  setEmail(email)
  setToken(token)
  
    await updateIsToday({date:yesterday,month:yesterdayMonth,isToday:false})
    await saveIsToday({date:currentDate,month,isToday:true})



}
   
    
      return  ( navigation as any).navigate('main')
    
   
      } else {
        setUserInfo(null);
      }
    });
    return () => unsubscribe();
  }, []);

const openPolicy =async () => {
  const url = 'https://example.com'; // 열고자 하는 URL
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
   console.log(`Don't know how to open this URL: ${url}`);
  }
  
}

const openService =async () => {
  const url = 'https://youtube.com'; // 열고자 하는 URL
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
   console.log(`Don't know how to open this URL: ${url}`);
  }
  
}




 
  return (
    <>
   <Head>
      <title>Daymoji Login</title>
      <meta name="description" content="Index" />
    </Head>
   <GestureHandlerRootView style={{ flex: 1 }}>
       
       <View style={[styles.container,{backgroundColor:colors.background}]}>
        
         <View style={[styles.loginContainer,{backgroundColor:colors.background}]}>
          <View style={{width:'100%'}}>
      
          <View style={{alignItems:'center',justifyContent:'center',width:width,backgroundColor:colors.background}}>
         {/* <Logo/> */}
         <MainLogo color={colors.text}/>
          <Text style={[styles.title,{color:colors.text,fontFamily:"SFCompactRoundedBD",marginTop:8}]}>Daymoji</Text>
          </View>
    
       
           </View>
      


           <View style={open?{display:'none'}:{}}>{<Login promptAsync={promptAsync} />}</View>
           <View>{<AppleLogin />}</View>
           <View style={{width:341,height:42,backgroundColor:colors.background,justifyContent:'center',alignItems:'center',marginTop:16}}>
      <Text style={{fontSize:14,color:'gray',fontFamily:"SFCompactRoundedRG",lineHeight:21}} >By signing up. I agree to Daymoji's <Text style={{color:colors.text}} onPress={openService}>Terms of Service</Text> and  </Text>
      <Text style={{fontSize:14,color:colors.text,fontFamily:"SFCompactRoundedRG",lineHeight:21}} onPress={openPolicy}>PrivacyPolicy</Text>
     </View>
        
         </View>
    
       </View>
     </GestureHandlerRootView>
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
   
    height:height
  },
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#e6e6e6',
marginBottom:137,
    flexDirection: 'column',

  },
  
 
  title: {
    fontSize: 20,
   
    marginTop: 8,
  },
  logo:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  }

});
