import React, { useState,  useEffect } from 'react';
import { StyleSheet, Text,  View, Linking } from 'react-native';
import Login from '~/components/Login';
import { Platform } from 'react-native';
import { FIREBASE_AUTH } from '../config/firebase';
import * as Google from 'expo-auth-session/providers/google';
import { useTheme } from '~/Theme/ThemeProvider';
import { Link, useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import AppleLogin from '../components/AppleLogin';
import * as WebBrowser from 'expo-web-browser';
import Logo from '../components/Logo';
import { Dimensions } from 'react-native';
import { useDateContext } from '~/context/DataContext';
const {width,height}=Dimensions.get('window')



if (Platform.OS !== 'web') {

  WebBrowser.maybeCompleteAuthSession();
}


const Page = () => {
const [open,setOpen] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>(null);
  const {email,setEmail,token,setToken}=useDateContext()
const {colors}=useTheme() 
  const clientID = Platform.OS === 'ios' 
  ? process.env.EXPO_PUBLIC_IOS_CLIENT_ID
  : process.env.EXPO_PUBLIC_WEB_CLIENT_ID;

 
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
   clientId: clientID,

  });
const navigation = useNavigation<any>();
console.log(width,height)

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
     
      signInWithCredential(FIREBASE_AUTH, credential);
     
    }
  }, [response]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user:any) => {
   
      if (user) {
       console.log(user,'user')
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
   
   <GestureHandlerRootView style={{ flex: 1 }}>
       
       <View style={[styles.container,{backgroundColor:colors.background}]}>
        
         <View style={[styles.loginContainer,{backgroundColor:colors.background}]}>
          <View style={{width:'100%'}}>
      
          <View style={{alignItems:'center',justifyContent:'center',width:width,backgroundColor:colors.background}}>
         <Logo/>
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
    backgroundColor:'white',

    flexDirection: 'column',
   
    height:'100%'
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
