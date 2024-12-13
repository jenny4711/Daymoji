import { View, Text ,TouchableOpacity,Linking,Dimensions} from 'react-native'
import React from 'react'
import {deleteAccount,deletedAllItem} from '~/utils/fireStoreFn'
import { getAuth, deleteUser } from 'firebase/auth'
import { useTheme } from '~/Theme/ThemeProvider';
import { useNavigation } from 'expo-router'
const {width}=Dimensions.get('window')
import AsyncStorage from '@react-native-async-storage/async-storage'
import { signOut } from 'firebase/auth'
import firebase from 'firebase-admin';
import { useDateContext } from '~/context/DataContext';
import { useDeletedAllData } from '~/hooks/useData';
import RNRestart from 'react-native-restart';
const DeleteAcct = () => {

  const navigation = useNavigation()
const {monthF,yearF,setLoadingForSetting,hasEmail}=useDateContext()
const {colors}=useTheme()
const deletedAllMutation=useDeletedAllData(monthF)
  const handleDeleteUserAction = async () => {
    const auth = getAuth();
    const user:any = auth.currentUser;
  
    if(user){
      try{
        deletedAllMutation.mutate(monthF)
       await deleteAccount(user.email)  
       await signOut(auth).then(async()=>{
        // setLoadingForSetting(true)
       await AsyncStorage.setItem('isLogin','false')
       await AsyncStorage.setItem('token','')
       await AsyncStorage.removeItem('email').then(()=>{
          return RNRestart.Restart();
        }).catch((error)=>{
          console.log(error,'-logout')
        })
       }






       
      )
          


      }catch(error){
        console.log(error)
      }
    }
  

    
    
  };
  return (
    <View> 
        <TouchableOpacity disabled={!hasEmail?true:false} style={{opacity:!hasEmail?0.5:1,justifyContent:'center',alignItems:'center',paddingVertical:24,width:width-48,backgroundColor:colors.inputBk2,borderRadius:24,marginTop:16}} onPress={() => handleDeleteUserAction()} >
      <Text style={{color:colors.text,fontFamily:'Nunito_700Bold'}}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DeleteAcct