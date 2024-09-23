import React,{useState,useEffect} from 'react';
import {Dimensions, View, Text,Image,TouchableOpacity ,StyleSheet} from 'react-native'
import { FIREBASE_AUTH } from '~/config/firebase';
import { signOut } from 'firebase/auth'
import { useNavigation } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '~/Theme/ThemeProvider';
const {width,height}=Dimensions.get('window')
const LogOutSec = () => {
  const [userEmail,setUserEmail]=useState<string>('') 
const {colors}=useTheme()
useEffect(()=>{
  const getUserEmail=async()=>{
const getEmail=await AsyncStorage.getItem('email')
const [localPart,domain]:any=getEmail?.split('@')
if(localPart.length <=2){
return setUserEmail(getEmail ||'')
}
return setUserEmail(`${localPart.slice(0,2)}...@${domain}`)




}
getUserEmail()
},[])

const navigation=useNavigation()
const handleLogOut=async()=>{
  await signOut(FIREBASE_AUTH).then(()=>{
return (navigation as any).navigate('index')
  }).catch((error)=>{
    console.log(error,'-logout')
  })
}



  return (
    <View style={[styles.container,{backgroundColor:colors.inputBk}]}>
   
      
        <View style={styles.profile}>
          

            <View style={{ backgroundColor:'white' ,width: 45, height: 45 ,borderRadius:50,marginRight:8,marginLeft:6,justifyContent:'center',alignItems:'center'}} >
              <Feather name="user" size={32} color="black" />
            </View>
          

        <View style={{flexDirection:'column'}}>
          <Text style={{color:colors.text,fontWeight:400,fontSize:14,marginLeft:3,lineHeight:21}}>{userEmail}</Text>
        </View>
        </View>

        <TouchableOpacity style={styles.btn} onPress={handleLogOut}>
          <Text style={{ color:'white',fontSize:12,fontWeight:700}}>Log out</Text>

        </TouchableOpacity>
    </View>
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
   
   
  }

})
