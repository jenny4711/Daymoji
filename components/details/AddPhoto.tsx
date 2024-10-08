import { View, Text, Dimensions,  TouchableOpacity, StyleSheet ,Image as RnImage, ImageBackground} from 'react-native';
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
import { useNavigation } from '@react-navigation/native';
import EachImage from './EachImage';
const { width, height } = Dimensions.get('window');

const AddPhoto=({showDone,photo,setPhoto,hideKeyboard}:any)=>{
  const navigation=useNavigation()
  const imgBtn=require('../../assets/imgBtn.png')
  const imgBtnBk=require('../../assets/imgBtnBk.png')
  const {colors,dark}=useTheme()
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const [img,setImg]=useState<any>('')
  const [imges,setImges]=useState<any>([])
  const deletedIcon = require('../../assets/delete.png')
const {dateF,monthF,newAData,setNewAData,setPreImages,preImages}=useDateContext()
const screenSize = Dimensions.get('window');
const [imgSize,setImgSize]=useState({width:0,height:0})
const [deleteMargin,setDeleteMargin]=useState({top:16,right:16})

useEffect(()=>{
  if(dateF !== newAData?.date){
 setNewAData(null)
  }
},[newAData,dateF])
useEffect(()=>{
  
 if(newAData?.photo  && typeof newAData.photo ==='string'){
  setImg(photo)
 

 }else if(newAData?.photo && Array.isArray(newAData.photo) &&dateF === newAData?.date){
  setImges(newAData.photo)
  

 
 }

},[newAData])


useEffect(()=>{
  if(imges.length===2){
    setImgSize({width:(screenSize.width - 48) / 2 -8,height:(screenSize.width - 48) / 2 -8})
    setDeleteMargin({top:7,right:7})
   
  }else if(imges.length>2){
    setImgSize({width:(screenSize.width - 48) / 3 -8,height:(screenSize.width - 48) / 3 -8})
    setDeleteMargin({top:5,right:5})
 
  }else{
    setImgSize({width:screenSize.width-48,height:screenSize.width-48})
    setDeleteMargin({top:16,right:16})

  }
},[imges,photo])


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
      setImges((prevImgs: any) => [...prevImgs, selectedImageUri ]);
      setPreImages((prevImgs: any) => [...prevImgs, selectedImageUri ]);


   
      
    // photo 배열에 새로운 이미지 추가
    if(photo?.length>=3){
      console.log('photo length is more than 3')
      return;
    }
    const res= await uploadImageStorage(selectedImageUri,'image')
      
    const newImageUri = res
    // setImges((prevImgs: any) => [...prevImgs, newImageUri]);
    // setPreImages((prevImgs: any) => [...prevImgs, newImageUri]);
    setPhoto((prevPhotos: any) => [...prevPhotos, newImageUri]);

    // 상태로 사용될 img 및 imges 업데이트
    setImg(newImageUri);
  
  
 
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

  const deleteImage = async (imgUri: string) => {
    try {
      setImges((prevImgs: any) => prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri));
      setPhoto((prevPhotos: any) => prevPhotos.filter((photoUri: string) => photoUri !== imgUri));
      // Firestore에서 특정 이미지에 대한 데이터를 업데이트하거나 제거
      await updatePhoto({ date: dateF, month: monthF });
  
      // Firebase 스토리지에서 이미지 삭제
      await deleteImageStorage(imgUri);
  
      // 상태에서 해당 이미지 제거 (새로운 photo 배열 생성)
     
 
  
      console.log(`Image ${imgUri} deleted successfully`);
  
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

 return (
    <View style={{alignItems:'center',paddingBottom:100}}>

    
     {!img &&imges.length<1 ?  <TouchableOpacity style={{width:60,height:60,borderRadius:100,backgroundColor:colors.inputBk,justifyContent:'center',alignItems:'center'}} onPress={pickImage}>
     {dark ? (
        <Image source={imgBtn} style={{ width: 24, height: 24 }} />
      ) : (
        <Image source={imgBtnBk} style={{ width: 19.5, height: 16.5 }} />
      )}
        </TouchableOpacity>
        :null
        }

 {/* 이미지 배열 */}
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {Array.isArray(imges) && 
        imges.map((item: any, index: number) => (
          <View
            key={index}
            style={{
              width:imgSize.width, // 이미지 크기 (두 개씩 보이게 설정)
              margin: 4, // 이미지 간격
              flexDirection: 'row',
            
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <EachImage
              img={item}
              imgBtn={imgBtn}
              imgBtnBk={imgBtnBk}
              deletedIcon={deletedIcon}
              imgSize={imgSize}
              setImgSize={setImgSize}
              setImg={setImg}
              deleteImage={deleteImage}
              idx={index}
              deleteMargin={deleteMargin}
              imges={imges}
            />
          </View>
        )
        ) }
    </View>
     
     
     
     
     {img && preImages.length>=1 && imges.length <4  ?(
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
    opacity:1
   
  },
  btnView: {
    justifyContent:'center',
    alignItems:'center' ,
    width:width-48
  },
  backgroundImage: {
    width: width - 48, // 배경 이미지 크기
    height: height / 2, // 배경 이미지 높이
  },
  imageStyle: {
    borderRadius: 24, // 이미지에 borderRadius 적용
  },

});