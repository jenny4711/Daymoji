import { View, Text, Dimensions,  TouchableOpacity, StyleSheet ,Image as RnImage, ImageBackground, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
// import {  uploadImage } from '../utils/cloudinary';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '../../Theme/ThemeProvider';
import { Image } from 'expo-image';
import { uploadImageStorage ,deleteImageStorage, updatePhoto} from '../../utils/fireStoreFn'
import { useDateContext } from '~/context/DataContext';
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
const {dateF,monthF,newAData,setNewAData,setPreImages,preImages,setProgress,progress,setIsLoading}=useDateContext()
const screenSize = Dimensions.get('window');
const [imgSize,setImgSize]=useState({width:0,height:0})
const [deleteMargin,setDeleteMargin]=useState({top:16,right:16})
const [imgMarginHR,setImgMarginHR]=useState(0)
const [press,setPress]=useState(false)

useEffect(()=>{
  setPreImages([])
},[dateF])

useEffect(()=>{
  if(newAData?.photo  && typeof newAData.photo ==='string'){
  setImg(photo)

 }else if(newAData?.photo && Array.isArray(newAData.photo) &&dateF === newAData?.date){
  setImges(newAData.photo)
  setPreImages(newAData.photo)
 
 

 }

},[newAData,dateF])


useEffect(()=>{
  if(imges.length===1){
    setImgSize({width:(screenSize.width - 48) / 2 -8,height:(screenSize.width - 48) / 2 -8})
    setDeleteMargin({top:12,right:12})
    setImgMarginHR(8)
   
  }else if(imges.length===2 || imges.length===3){
    setImgSize({width:(screenSize.width - 48) / 3 -8,height:(screenSize.width - 48) / 3 -8})
    setDeleteMargin({top:8,right:8})
    setImgMarginHR(8)
 
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
    hideKeyboard();
    // setPress(true)
    // setIsLoading(true);
    if (imges.length >= 3 || photo.length >= 3) {
      return; // 이미지가 이미 3개이면 종료
    }

    let result: any = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.5,
      selectionLimit:3-imges.length, // 최대 3개까지 선택 가능
      allowsMultipleSelection: true, // 여러 이미지 선택 허용
    });

    if (!result.canceled) {
      const selectedImages = result.assets;
 

      const uploadPromises = selectedImages.map(async (selectedImage: any) => {
      

        const selectedImageUri = selectedImage.uri;
     
        setIsLoading(false);
       

      

       

        // 업로드 시작
        // setIsLoading(true);
        const res = await uploadImageStorage(selectedImageUri, 'image', (progressValue: number) => {
          setProgress(progressValue);
          if( progressValue!==100){
            setIsLoading(true);

          }else if( progressValue===100){
            setIsLoading(false);

          }
        });
        setImges((prevImgs: any) => [...prevImgs, selectedImageUri]);
        setPreImages((prevImgs: any) => [...prevImgs, selectedImageUri]);
        const newImageUri = res;
        // setImges((prevImgs: any) => [...prevImgs, newImageUri]);
        // setPreImages((prevImgs: any) => [...prevImgs, newImageUri]);
       
          setPhoto((prevPhotos: any) => [...prevPhotos, newImageUri])
       
        
       
      });

      // 모든 이미지 업로드 완료 대기
      // if (imges.length >= 3 || photo.length >= 3) {
      //   return; // 이미지가 이미 3개이면 종료
      // }
      await Promise.all(uploadPromises)
     
     
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
    const findIndex = imges.findIndex((imgUriItem: string) => imgUriItem === imgUri);
    const findUriByIndex=photo[findIndex]
  
        if(newAData?.photo && Array.isArray(newAData.photo)){
        
          setPhoto((prevPhotos: any) => prevPhotos.filter((photoUri: string) => photoUri !== findUriByIndex));
          setImges((prevImgs: any) => prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri));
           setPreImages((prevImgs: any) => prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri));
           await updatePhoto({ date: dateF, month: monthF })
           await deleteImageStorage(imgUri);
        
        }else{
         
            setImges((prevImgs: any) => prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri));
            setPhoto((prevPhotos: any) => prevPhotos.filter((photoUri: string) => photoUri !== findUriByIndex));
             setPreImages((prevImgs: any) => prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri));
             await deleteImageStorage(findUriByIndex);
      
        }  
        // Firebase 스토리지에서 이미지 삭제
  
       console.log(`Image ${imgUri} deleted successfully`);
  
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

 return (
    <View style={{flexDirection:'row',justifyContent:'center',width:width-48}}>

 {/* 이미지 배열 */}
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
      {Array.isArray(imges) && 
        imges.map((item: any, index: number) => (
          <View
            key={index}
            style={{
              width:imgSize.width, // 이미지 크기 (두 개씩 보이게 설정)
              // marginTop:16, 
              flexDirection: 'row',
                marginRight:index===2?0:imgMarginHR,// 이미지 간격
              justifyContent: 'center',
              // alignItems: 'center',
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
              progress={progress}
            />
          </View>
        )
        ) }

   
   
    
    {/* {progress >0 && progress < 100?(<ActivityIndicator style={{marginTop:16}} size="small" color={'red'} />):null} */}
   
         {imges.length<3  ?  <TouchableOpacity style={[styles.btnView,!img?{ backgroundColor:colors.inputBk,width:imgSize.width,height:imgSize.height}:{backgroundColor:colors.inputBk,marginTop:16,width:imgSize.width,height:imgSize.height}]} onPress={pickImage}>
     {dark ? (
      <View style={{width:imgSize.width,height:imgSize.height,justifyContent:'center',alignItems:'center'}}>
        <Image source={imgBtn} style={{ width: 19.5, height: 16.5 ,marginBottom:8}} />
        <Text style={{color:colors.text,fontSize:16}}>Add Photo</Text>
        </View>
      
      ) : (
        <View style={{width:imgSize.width,height:imgSize.height,justifyContent:'center',alignItems:'center'}}>
        <Image source={imgBtnBk} style={{ width: 19.5, height: 16.5 ,marginBottom:8}} />
        <Text style={{color:colors.text,fontSize:16}}>Add Photo</Text>
        </View>
      )}
        </TouchableOpacity>
        :null
        }




       
</View>
   
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
   width:345,
   height:345,
   borderRadius:24,
  
   justifyContent:'center',
   alignItems:'center'
  },
  backgroundImage: {
    width: width - 48, 
    height: height / 2, 
  },
  imageStyle: {
    borderRadius: 24, 
  },

});