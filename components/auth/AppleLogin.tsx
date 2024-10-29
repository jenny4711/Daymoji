import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React, { useState, useEffect } from 'react';
import { OAuthProvider } from 'firebase/auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import  {jwtDecode} from 'jwt-decode'
import {FIREBASE_AUTH} from '../../config/firebase'
import { signInWithCredential } from 'firebase/auth';
import { useNavigation } from 'expo-router';
import { AppleIcon } from '~/utils/Icons';
import { useTheme } from '~/Theme/ThemeProvider';
const AppleLogin = () => {
  const [appleAuthAvailable, setAppleAuthAvailable] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const {colors,dark}=useTheme()
const navigation=useNavigation()
  useEffect(() => {
    const checkAvailable = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setAppleAuthAvailable(isAvailable);
    };
    checkAvailable();
  }, []);

  const login = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      const { identityToken, email, fullName }:any= credential;
      setUserToken(identityToken);
     console.log(email,'email')
      if (identityToken) {
        const provider = new OAuthProvider('apple.com');
        const firebaseCredential = provider.credential({
          idToken: identityToken,
        });
        await signInWithCredential(FIREBASE_AUTH, firebaseCredential);
      }
    } catch (error) {
      console.log(error, 'errorAppleLogin');
    }
  };

  const getAppleAuthContent = () => {
    try {
      if (!userToken) {
        return (
          
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={50}
            style={styles.btn}
            onPress={login}
            
            
          />
        );
      } else {
        // userToken이 문자열인지 확인
        if (typeof userToken === 'string') {
          const decodedToken = jwtDecode(userToken);
          console.log(decodedToken, 'decodedToken');

          const current = Date.now() / 1000;
         
        } else {
          console.log('Invalid token format');
          return <Text>Invalid token format</Text>;
        }
      }
    } catch (error) {
      console.log(error, 'errorAppleLogin');
    }
  };





  return (
    <View>
    {appleAuthAvailable ? (
      // 커스텀 버튼을 사용하여 Apple 로그인 처리
      <TouchableOpacity style={[styles.btn,{backgroundColor:colors.text}]} onPress={login}>
        <AppleIcon size={24} color={colors.background}/>
        <Text style={[styles.customButtonText,{fontFamily:"SFCompactRoundedBD",color:colors.background,fontSize:16,marginLeft:8}]}>Sign up with Apple</Text>
      </TouchableOpacity>
    ) : (
      <Text>Apple Login is not available</Text>
    )}
  </View>
  )
}

export default AppleLogin


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    marginVertical:16,
   
    borderRadius: 100, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
  fontSize:16,
      width:345,
    height: 70,
   
  },
  customButtonText: {
    color: 'white',
    fontSize: 16, // 글꼴 크기 조정
    fontWeight: 'bold',
    marginLeft:2.5
  },
});
