import React,{useState,useEffect} from 'react';
import {Dimensions, View, Text,Image,TouchableOpacity ,StyleSheet,Alert} from 'react-native'
import { FIREBASE_AUTH } from '../../config/FirebaseConfig';
import { signOut } from 'firebase/auth'
import { useNavigation ,useRouter} from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDateContext } from '~/context/DataContext';
import { useTheme } from '~/Theme/ThemeProvider';
import RNRestart from 'react-native-restart';
const {width,height}=Dimensions.get('window')
const LogOutSec = () => {
  const [userEmail,setUserEmail]=useState<string>('') 
  const {setEmail,email,setLoadingForSetting,hasEmail,setHasEmail}=useDateContext()
  // const [hasEmail,setHasEmail]=useState<boolean>(false)
const {colors}=useTheme()
const router=useRouter()
useEffect(()=>{
  const getUserEmail=async()=>{
const getEmail=await AsyncStorage.getItem('email')
// const [localPart,domain]:any=getEmail?.split('@')
// if(localPart.length <=2){
// return setUserEmail(getEmail ||'')
// }
// return setUserEmail(`${localPart.slice(0,2)}...@${domain}`)
console.log(getEmail,'getEmail')
setEmail(getEmail)
if(getEmail === null){
setHasEmail(false)
}else{
  setHasEmail(true)
}

}
getUserEmail()
},[])

const navigation=useNavigation()
const handleLogOut=async()=>{
  Alert.alert('Log Out', 'Are you sure you want to log out? You will need to sign in again to access your account', [
    {
      text: 'Cancel',
      onPress: () => console.log('Ask me later pressed'),
    },
    
    {text: 'Log Out',style:'destructive',onPress: async() =>{
      
      await signOut(FIREBASE_AUTH).then(async()=>{
       
       await AsyncStorage.setItem('isLogin','false')
       await AsyncStorage.setItem('token','')
        await AsyncStorage.setItem('email','')
        await AsyncStorage.setItem('themeMode', 'auto');
        setEmail('')
      
        AsyncStorage.removeItem('email').then(()=>{
          RNRestart.Restart();
          // return (navigation as any).replace('authLogin')
        }).catch((error)=>{
          console.log(error,'logout')
        })
        // return (navigation as any).navigate('index')
          }).catch((error)=>{
            console.log(error,'-logout')
          })
    }
    },
  ])


}

console.log(hasEmail,'hasEmail')
console.log(email,'email')
  return (
<TouchableOpacity disabled={!hasEmail?true:false} activeOpacity={1} onPress={handleLogOut} style={{opacity:!hasEmail?0.5:1,justifyContent:'center',alignItems:'center',paddingVertical:24,width:width-48,backgroundColor:colors.inputBk2,borderRadius:24,marginTop:16}}>
    <Text style={[styles.TextStyle,{color:colors.text}]}>Log out </Text>
  </TouchableOpacity>



  
  );
}



export default LogOutSec;

const styles=StyleSheet.create({
  container: {
  
    flexDirection:'row',
    width:width-48,
    justifyContent:"space-between",
    alignItems:'center',
    paddingHorizontal:14,
    borderRadius:5,
    height:70,
    borderBottomWidth:0.2,
    borderBottomColor:'gray',
  


  },
  profile:{
   
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
  },
  btn:{
    backgroundColor:'black',
    justifyContent:'center',
    alignItems:'center',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10,
    borderRadius:100,
    height:40,
    width:68,
    // marginRight:18
   
   
  },
  TextStyle: {
    fontSize:16,
  
    lineHeight:19.09
  }

})
