import { View, Text,StyleSheet ,Dimensions} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useTheme } from '~/Theme/ThemeProvider'

import { useAdayData, useDeletedData } from '~/hooks/useData'
import Animated,{FadeInLeft,FadeInRight,FadeInUp,Easing,useAnimatedStyle,useSharedValue,withTiming} from 'react-native-reanimated'
import AddPhoto from './AddPhoto'
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler'
import IconSticker from './IconSticker'
import InputForm from './InputForm'
import Octicons from '@expo/vector-icons/Octicons';
import { Image } from 'expo-image';
import EmotionSticker from '../EmotionSticker';
const {width,height}=Dimensions.get('window')
const ShowDetail = ({
  showDone,
 setShowDone,
 date,
 month,
 story,
 setStory,
 setPhoto,
 photo,
 emotion,
 setEmotion,
 handleDeleted
}:any) => {
  const {data,isLoading,isError,error}:any=useAdayData({date,month})
  const {colors,dark}=useTheme()
  const opacity = useSharedValue(0);

  useEffect(() => {
    if ( photo) {
      opacity.value = withTiming(1, { duration: 800 });
    
    }
  }, [photo]);
useEffect(()=>{
  if(data){
    setStory(data.story)
    setPhoto(data.photo)
    setEmotion(data.emotion)
  }
},[data])


  useEffect(()=>{
    setShowDone(false)
  },[])

  const animatedStyleBtn = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(photo ? 1 : 0, { duration: 1000 ,easing:Easing.out(Easing.ease)}), 

    };
  });



  return (
    <View style={[{height:height,justifyContent:'flex-start',alignItems:'center'},{backgroundColor:colors.background}]}>
      <Animated.View style={{width:60,height:60,borderRadius:100,justifyContent:'center',alignItems:'center',marginTop:16,backgroundColor:colors.inputBk}}>
        
        <IconSticker emotion={emotion} setEmotion={setEmotion}/>
        
      
     
      </Animated.View>

      <Animated.View style={[{borderRadius:24,marginTop:14}]}>
       
          <InputForm story={story} setStory={setStory} marginLeft={0}/>
        
        
      </Animated.View>

      <Animated.View style={{marginTop:16,width:width-24}}>
       
        
        
        <AddPhoto showDone={showDone} photo={photo}  setPhoto={setPhoto}/>
      
     
      </Animated.View>
  
    </View>
  )
}

export default ShowDetail
const styles=StyleSheet.create({
  noKeyboard: {
    width: 40,
    height: 40,
    top:30,
    right:16,
    fontWeight: 'bold',
    borderRadius: 24,
  },
})