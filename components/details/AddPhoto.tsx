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

const AddPhoto=({showDone,photo,setPhoto,hideKeyboard,imges,setImges}:any)=>{
  const navigation=useNavigation()
  const imgBtn=require('../../assets/imgBtn.png')
  const imgBtnBk=require('../../assets/imgBtnBk.png')
  const {colors,dark}=useTheme()
  const opacity = useSharedValue(0);
  const scale = useSharedValue(1);
  const [img,setImg]=useState<any>('')
  // const [imges,setImges]=useState<any>([])
  const deletedIcon = require('../../assets/delete.png')
const {dateF,monthF,newAData,setNewAData,setPreImages,preImages,setProgress,progress,setIsLoading}=useDateContext()
const screenSize = Dimensions.get('window');
const [imgSize,setImgSize]=useState({width:0,height:0})
const [deleteMargin,setDeleteMargin]=useState({top:16,right:16})
const [imgMarginHR,setImgMarginHR]=useState(0)
const [press,setPress]=useState(false)
const [isLoadingImages, setIsLoadingImages] = useState<boolean[]>([]);




useEffect(()=>{
  console.log(dateF,'dateF')
  console.log(newAData,'newAData')
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



  


// 이미지 및 로딩 상태 초기화


// 이미지 배열이 변경될 때 로딩 상태 배열도 일관되게 업데이트
useEffect(() => {
  setIsLoadingImages(imges.map(() => false));  // 이미지 배열의 길이에 맞춰 초기 상태를 false로 설정
}, [imges]);

const pickImage = async () => {
  hideKeyboard();

  if (imges.length >= 3) {
    return; // 이미지가 3개 이상일 경우 추가하지 않음
  }

  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 0.5,
    selectionLimit: 3 - imges.length,
    allowsMultipleSelection: true,
  });

  if (!result.canceled) {
    const selectedImages = result.assets.map((selectedImage) => selectedImage.uri);

    // 새 이미지와 함께 로딩 상태도 추가합니다.
    setImges((prevImgs:any) => [...prevImgs, ...selectedImages]);
    setPreImages((prevImgs:any) => [...prevImgs, ...selectedImages]);
    setIsLoadingImages((prevLoadingStates) => [...prevLoadingStates, ...selectedImages.map(() => true)]);

    // 이미지 업로드 처리
    const uploadPromises = selectedImages.map(async (uri, index) => {
      try {
        const res = await uploadImageStorage(uri, 'image', (progressValue) => {
          setProgress(progressValue);

          setIsLoadingImages((prevLoadingStates) => {
            const updatedLoadingStates = [...prevLoadingStates];
            const currentIndex = imges.length + index;
            updatedLoadingStates[currentIndex] = progressValue !== 100;
            return updatedLoadingStates;
          });
        });

        // 업로드 완료 후 로딩 상태를 false로 설정
        setIsLoadingImages((prevLoadingStates) => {
          const updatedLoadingStates = [...prevLoadingStates];
          updatedLoadingStates[imges.length + index] = false;
          return updatedLoadingStates;
        });

        setPhoto((prevPhotos:any) => [...prevPhotos, res]);
      } catch (error) {
        console.error('업로드 실패:', error);
      }
    });

    await Promise.all(uploadPromises);
  
  }
};

// const deleteImage = async (imgUri:any) => {
//   try {
//     const indexToRemove = imges.findIndex((uri:any) => uri === imgUri);

//     // 이미지 및 로딩 상태를 삭제
//     setImges((prevImgs:any) => prevImgs.filter((_:any, index:any) => index !== indexToRemove));
//     setPreImages((prevImgs:any) => prevImgs.filter((_:any, index:any) => index !== indexToRemove));
//     setIsLoadingImages((prevLoadingStates) => prevLoadingStates.filter((_, index) => index !== indexToRemove));

//     setPhoto((prevPhotos:any) => prevPhotos.filter((photoUri:any) => photoUri !== imgUri));
//     await deleteImageStorage(imgUri);
//     console.log(`이미지 ${imgUri} 삭제 성공`);
//   } catch (error) {
//     console.error('이미지 삭제 실패:', error);
//   }
// };

  

  // const pickImage = async () => {
  //   hideKeyboard();
  //   // setPress(true)
  //   // setIsLoading(true);
  //   if (imges.length >= 3 || photo.length >= 3) {
  //     return; // 이미지가 이미 3개이면 종료
  //   }

  //   let result: any = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: false,
  //     aspect: [4, 3],
  //     quality: 0.5,
  //     selectionLimit:3-imges.length, // 최대 3개까지 선택 가능
  //     allowsMultipleSelection: true, // 여러 이미지 선택 허용
  //   });

  //     // 로딩 상태 추가


  //   if (!result.canceled) {
  //     const selectedImages = result.assets;

  //     const initialLoadingState = new Array(selectedImages.length).fill(true);
  //     setIsLoadingImages((prev) => [...prev, ...initialLoadingState]);
     
  //     const uploadPromises = selectedImages.map(async (selectedImage: any,index:any) => {
      

  //       const selectedImageUri = selectedImage.uri;
     
  //       setImges((prevImgs: any) => [...prevImgs, selectedImageUri]);
  //       setPreImages((prevImgs: any) => [...prevImgs, selectedImageUri]);
       

      

       

  //       // 업로드 시작
  //       // setIsLoading(true);
  //       const res =await  uploadImageStorage(selectedImageUri, 'image', (progressValue: number) => {
         
  //         setProgress(progressValue);
  //         if( progressValue!==100){
           
  //           setIsLoadingImages((prev:any,) => {
  //             const updatedLoading = [...prev];
  //             updatedLoading[imges.length + index] = true;
  //             console.log(updatedLoading,'updatedLoading@@@@@@@@@')
  //             return updatedLoading;
  //           });

  //         }else if( progressValue===100){
  //           setIsLoadingImages((prev) => {
  //             const updatedLoading = [...prev];
  //             updatedLoading[imges.length + index] = false;
  //             console.log(imges.length + index,'imges.length + index')
  //             console.log(updatedLoading,'updatedLoading')
  //             return updatedLoading;
  //           });

  //         }
  //       });
       
  //       const newImageUri = res;
  //       // setImges((prevImgs: any) => [...prevImgs, newImageUri]);
  //       // setPreImages((prevImgs: any) => [...prevImgs, newImageUri]);
       
  //         setPhoto((prevPhotos: any) => [...prevPhotos, newImageUri])
       
        
       
  //     });

  //     // 모든 이미지 업로드 완료 대기
  //     if (imges.length > 3 || photo.length > 3) {
  //       return; // 이미지가 이미 3개이면 종료
  //     }
     
     
     
  //   }
  // };

 

  const deleteImage = async (imgUri: string) => {

    try {
    const findIndex = imges.findIndex((imgUriItem: string) => imgUriItem === imgUri);
    const findUriByIndex=photo[findIndex]
        console.log(findUriByIndex,'findUrlByIndex')
        if(newAData?.photo && Array.isArray(newAData.photo)){
        
          setPhoto((prevPhotos: any) => prevPhotos.filter((photoUri: string) => photoUri !== findUriByIndex));
          setImges((prevImgs: any) => prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri));
           setPreImages((prevImgs: any) => prevImgs.filter((imgUriItem: string) => imgUriItem !== imgUri));
           await updatePhoto({ date: dateF, month: monthF })
           await deleteImageStorage(findUriByIndex);
        
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



  useEffect(()=>{
    console.log(imges,'imges')
    console.log(isLoadingImages,'isLoadingImages')
  },[isLoadingImages])

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
              isLoading={isLoadingImages[index]} 
            />
          </View>
        )
        ) }

   
   
    
    {/* {progress >0 && progress < 100?(<ActivityIndicator style={{marginTop:16}} size="small" color={'red'} />):null} */}
   
         {imges?.length<3  ?  <TouchableOpacity style={[styles.btnView,!img?{ backgroundColor:colors.inputBk,width:imgSize.width,height:imgSize.height}:{backgroundColor:colors.inputBk,marginTop:16,width:imgSize.width,height:imgSize.height}]} onPress={pickImage}>
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