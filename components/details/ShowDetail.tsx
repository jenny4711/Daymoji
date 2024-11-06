import { View, Text,StyleSheet ,Dimensions,KeyboardAvoidingView,Keyboard,Platform} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useTheme } from '~/Theme/ThemeProvider'

import {  useDeletedData } from '~/hooks/useData'
import Animated,{FadeInLeft,FadeInRight,FadeInUp,Easing,useAnimatedStyle,useSharedValue,withTiming} from 'react-native-reanimated'
import AddPhoto from './AddPhoto'
import { useQueryClient } from '@tanstack/react-query';
import { useNavigation } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import IconSticker from './IconSticker'
import InputForm from './InputForm'
import Octicons from '@expo/vector-icons/Octicons';
import { Image } from 'expo-image';
import EmotionSticker from '../EmotionSticker';
import { useDateContext } from '~/context/DataContext';
const {width,height}=Dimensions.get('window')
const ShowDetail = ({
//   showDone,
//  setShowDone,
 date,
 month,
 story,
 setStory,
 setPhoto,
 photo,
 emotion,
 setEmotion,
 handleDeleted,
 imges,
  setImges
}:any) => {
  // const {data,isLoading,isError,error}:any=useAdayData({date,month})
  const {colors,dark}=useTheme()
  const opacity = useSharedValue(0);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const {showDone,setShowDone}=useDateContext()
  // useEffect(()=>{
  //   setShowDone(true)
  //  },[])
   useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );
  
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [setKeyboardVisible, keyboardVisible]);




  useEffect(() => {
    if ( photo) {
      opacity.value = withTiming(1, { duration: 800 });
    
    }
  }, [photo]);

  const hideKeyboard=()=>{
    Keyboard.dismiss()
  }




  const animatedStyleBtn = useAnimatedStyle(() => {
    return {
    
      opacity: withTiming(photo ? 1 : 0, { duration: 1000 ,easing:Easing.out(Easing.ease)}), 

    };
  });



  return (
    <ScrollView style={[{height:height},{backgroundColor:colors.background}]}>
      <KeyboardAvoidingView
        style={{alignItems:'center', backgroundColor: colors.background }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}
      >
      <Animated.View style={{width:60,height:60,borderRadius:100,justifyContent:'center',alignItems:'center',marginTop:16,backgroundColor:colors.inputBk}}>
        
        <IconSticker hideKeyboard={hideKeyboard} emotion={emotion} setEmotion={setEmotion}/>
        
      
     
      </Animated.View>

      <Animated.View style={[{borderRadius:24,marginTop:14}]}>
       
          <InputForm story={story} setStory={setStory} marginLeft={0}/>
        
        
      </Animated.View>

      <Animated.View style={{marginTop:16,width:width-24,paddingBottom:40,justifyContent:'center',alignItems:'center'}}>
       
        
        
        <AddPhoto hideKeyboard={hideKeyboard}  photo={photo}  setPhoto={setPhoto}   imges={imges}  setImges={setImges} />
      
     
      </Animated.View>
      </KeyboardAvoidingView>
  
    </ScrollView>
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