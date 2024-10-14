import { View, Text, Dimensions } from 'react-native'
import React, { useState ,useEffect} from 'react'
import Octicons from '@expo/vector-icons/Octicons';
import { useLocalSearchParams } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { Image as ExpoImage } from 'expo-image'
import { useTheme } from '~/Theme/ThemeProvider';
import {useDateContext} from '~/context/DataContext'
import { get } from 'lodash';
// react-native-reanimated-carousel
const Img = () => {
  const { img ,idx} = useLocalSearchParams<any>()
  const {colors,dark}=useTheme()
  const [getImg,setGetImg]=useState(img)
  const navigation = useNavigation()
  const screenSize = Dimensions.get('window'); // 화면 크기 가져오기
const {setNewAData,newAData,preImages}=useDateContext()

console.log(preImages,'imgDetail')
useEffect(()=>{
 
  if(img ===""){
    setGetImg(newAData?.photo[idx])
  }else{
    setGetImg(preImages[idx])
  }

},[img])


 

  return (
    <>
    
    <View style={{ flex: 1, backgroundColor: colors.background,alignItems:'center',justifyContent:'flex-start'}}>
      
      {getImg ? (
        <ExpoImage
          source={{ uri: getImg}} // 이미지 URI 설정
          style={{ width: screenSize.width , height: screenSize.height  }} // 화면 너비에 맞춰 이미지 크기 조정
          contentFit="contain" // 이미지 비율 유지하며 화면에 맞춤
          cachePolicy="none" // 캐시 사용 안 함
        />
      ) : (
        <Text style={{ color: 'white', textAlign: 'center' }}>이미지를 찾을 수 없습니다</Text>
      )}
    </View>
    </>
  )
}

export default Img;


