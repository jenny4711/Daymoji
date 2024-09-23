import { View, Text, Dimensions,  TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
// import {  uploadImage } from '../utils/cloudinary';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FadeInRight } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../Theme/ThemeProvider';
import { Image } from 'expo-image';
import { uploadImageStorage } from '../../utils/fireStoreFn'
import { s } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');

const AddPhoto=({showDone,photo,setPhoto}:any)=>{
  const imgBtn=require('../../assets/imgBtn.png')
  const imgBtnBk=require('../../assets/imgBtnBk.png')
  const {colors,dark}=useTheme()
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const [img,setImg]=useState<any>('')
  const deletedIcon = require('../../assets/delete.png')


useEffect(()=>{
  
 if(photo ){
  setImg(photo)

 }else{
  setImg('')
 }

},[photo])


  useEffect(() => {
    if (img || photo ) {
      opacity.value = withTiming(1, { duration: 800 });
      scale.value = withTiming(1);
    }
  }, [img,photo]);

  const pickImage = async () => {
    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImg(selectedImageUri)

 console.log(selectedImageUri,'selectedImageUri')
     const res= await uploadImageStorage(selectedImageUri,'image')
      // const res = await uploadImage(selectedImageUri);
      const newImageUri = res
      // const newImageUri = `${res.secure_url}?time=${Date.now()}`; // URI에 고유한 타임스탬프 추가
      setPhoto(newImageUri);
      setImg(newImageUri);
      console.log(newImageUri,'newImageUri')
      // await AsyncStorage.setItem('photoURL', newImageUri);
   
      // await AsyncStorage.setItem('photoURL', res.secure_url);
  
 
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(img ? 1 : 0, { duration: 100 ,easing:Easing.out(Easing.exp)}), 
      transform: [{ scale: withTiming(img ? 1 : 0.8, { duration: 100 ,easing:Easing.out(Easing.exp)}) }],
    };
  });

  const animatedStyleBtn = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(img ? 1 : 0, { duration: 5000 ,easing:Easing.out(Easing.ease)}), 

    };
  });

const deleteImage = () => {
  setPhoto('')
  setImg('')

}

  return(
    <>
    <Animated.View  >
    

 
     

{img ?img&& (
    <Animated.View style={{marginBottom:16,justifyContent:'center',alignItems:'center'}}>
 {photo && !showDone? (
  <Image 
 source={{uri:photo}}
 style={{
  width: width - 48,
  height: height-420,
  borderRadius: 24,

}}

cachePolicy={'memory-disk'}

 />)
 
 :(
 <Image

    source={{ uri: img }}
    style={{
      width: width - 48,
      height: height-420,
      borderRadius: 24,

    }}
    cachePolicy={'memory-disk'}
    transition={200}
  />)}
 {  showDone && img? (
          <Animated.View style={animatedStyleBtn}>
          <TouchableOpacity
              style={[
                
                  { backgroundColor: colors.text,  zIndex: 1, bottom:height- 435, left:width-275,borderRadius:100},
                   
              ]}
              onPress={ deleteImage}
          >
              <Animated.Image  source={deletedIcon} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          </Animated.View>
       
      ) :null}
  </Animated.View>
      
) : null}

  </Animated.View>
{!img?
  <View style={[!showDone ? { display: 'none' } : styles.btnView]}>
    <Animated.View  entering={FadeInRight.duration(100).easing(Easing.ease)}>
    <TouchableOpacity onPress={pickImage} style={[styles.imageView,{backgroundColor:colors.inputBk}]}>
      {dark ? (
        <Image source={imgBtn} style={{ width: 24, height: 24 }} />
      ) : (
        <Image source={imgBtnBk} style={{ width: 19.5, height: 16.5 }} />
      )}
    </TouchableOpacity>
    </Animated.View>
  </View>:null}
</>
  )
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