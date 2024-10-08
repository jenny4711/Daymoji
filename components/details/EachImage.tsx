import { View, Text, Dimensions,  TouchableOpacity, StyleSheet ,Image as RnImage, ImageBackground} from 'react-native';
import React from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '~/Theme/ThemeProvider'  
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useDateContext } from '~/context/DataContext';
import { ScaledSheet,scale, verticalScale, moderateScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');
const EachImage = ({idx,img,imgBtn,imgBtnBk,deletedIcon,imgSize,setImgSize,setImg,deleteImage,deleteMargin,imges}:any) => {
  const navigation=useNavigation()
  const {colors,dark} = useTheme()
console.log(imgSize,'imgSize')
  return (
    <>
     


     
      {
        img && (
          <View key={idx}  style={{alignItems:'center'}}>
           
   <TouchableOpacity activeOpacity={1} onPress={()=>(navigation as any).navigate('imgDetail/[img]',{img:img,idx:idx})}>
             <Image
            
            contentFit='cover'
              source={{ uri: img }}
                style={{ width: imgSize.width, height:imgSize.height, borderRadius: 24 }}
                cachePolicy={'memory'}
            /> 
            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',width:40,height:40,backgroundColor:colors.text,borderRadius:100,justifyContent:'center',alignItems:'center',marginLeft:moderateScale(1),top:deleteMargin.top,right:deleteMargin.right}} onPress={()=>deleteImage(img)}>
              <Image source={deletedIcon} style={{width:40,height:40,padding:0,margin:0}}/>

            </TouchableOpacity>
          </View>
        )
      }
   
    </>
  )
}

export default EachImage