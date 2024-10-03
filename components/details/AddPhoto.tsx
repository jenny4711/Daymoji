import { View, Text, Dimensions,  TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
// import {  uploadImage } from '../utils/cloudinary';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FadeInRight } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../Theme/ThemeProvider';
import { Image } from 'expo-image';
import { uploadImageStorage ,deleteImageStorage, updatePhoto} from '../../utils/fireStoreFn'
import { useDateContext } from '~/context/DataContext';
import { ScaledSheet,scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { set } from 'lodash';
const { width, height } = Dimensions.get('window');

const AddPhoto=({showDone,photo,setPhoto,hideKeyboard}:any)=>{
  const imgBtn=require('../../assets/imgBtn.png')
  const imgBtnBk=require('../../assets/imgBtnBk.png')
  const {colors,dark}=useTheme()
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const [img,setImg]=useState<any>('')
  const deletedIcon = require('../../assets/delete.png')
const {dateF,monthF,newAData}=useDateContext()
console.log(width,'newAData')
useEffect(()=>{
  
 if(newAData?.photo ){
  setImg(photo)

 }else{
  setImg('')
 }

},[newAData])

console.log(img,'img')
  useEffect(() => {
    if (img || photo ) {
      opacity.value = withTiming(1, { duration: 800 });
      scale.value = withTiming(1);
    }
  }, [img,photo]);

  const pickImage = async () => {
    hideKeyboard()
   
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImg(selectedImageUri)


     const res= await uploadImageStorage(selectedImageUri,'image')
      // const res = await uploadImage(selectedImageUri);
      const newImageUri = res
      // const newImageUri = `${res.secure_url}?time=${Date.now()}`; // URI에 고유한 타임스탬프 추가
      setPhoto(newImageUri);
      setImg(newImageUri);
     
      // await AsyncStorage.setItem('photoURL', newImageUri);
   
      // await AsyncStorage.setItem('photoURL', res.secure_url);
  
 
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(img || photo ? 1 : 0, { duration: 100 ,easing:Easing.out(Easing.exp)}), 
      transform: [{ scale: withTiming(img ? 1 : 0.8, { duration: 100 ,easing:Easing.out(Easing.exp)}) }],
    };
  });

  const animatedStyleBtn = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(img || photo? 1 : 0, { duration: 3300 ,easing:Easing.out(Easing.ease)}), 

    };
  });

const deleteImage = async() => {
  if(photo || !img){
    await updatePhoto({date:newAData.date,month:monthF})
    await deleteImageStorage(photo)
    setPhoto('')
    setImg('')
  }else if(img || !photo){
    await deleteImageStorage(img)
    
    setPhoto('')
    setImg('')
  }
 
  setPhoto('')
  setImg('')

}

 return (
    <View style={{alignItems:'center',paddingBottom:100}}>

      {/* //imgbtn */}
     {!img  ?  <TouchableOpacity style={{width:60,height:60,borderRadius:100,backgroundColor:colors.inputBk,justifyContent:'center',alignItems:'center'}} onPress={pickImage}>
     {dark ? (
        <Image source={imgBtn} style={{ width: 24, height: 24 }} />
      ) : (
        <Image source={imgBtnBk} style={{ width: 19.5, height: 16.5 }} />
      )}
        </TouchableOpacity>
        :null
        }


     
      {
        img && (
          <Animated.View >
            <Image
              source={{ uri: img }}
              style={{ width: width-48, height:height *.54,   borderRadius: 24 }}
            />
            <TouchableOpacity style={{position:'absolute',width:40,height:40,backgroundColor:colors.text,borderRadius:100,justifyContent:'center',alignItems:'center',marginLeft:moderateScale(1),top:16,right:16}} onPress={deleteImage}>
              <Image source={deletedIcon} style={{width:40,height:40}}/>

            </TouchableOpacity>
          </Animated.View>
        )
      }
     
     
     {img && newAData !==null ?(
      <TouchableOpacity style={{width:60,height:60,borderRadius:100,backgroundColor:colors.inputBk,justifyContent:'center',alignItems:'center',marginTop:16}} onPress={pickImage}>
      {dark ? (
         <Image source={imgBtn} style={{ width: 24, height: 24 }} />
       ) : (
         <Image source={imgBtnBk} style={{ width: 19.5, height: 16.5 }} />
       )}
         </TouchableOpacity>

     ):null}
       
   
    </View>
  );
}
export default AddPhoto

const styles = StyleSheet.create({
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    borderRadius: 50,
   
  },
  btnView: {
    justifyContent:'center',
    alignItems:'center' ,
    width:width-48
  }

});