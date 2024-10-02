import { View, Text ,StyleSheet,TextInput,Dimensions} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useTheme } from '~/Theme/ThemeProvider';
import Animated, { Easing,FadeInLeft  } from 'react-native-reanimated';
const {width,height}=Dimensions.get('window')

const InputForm = ({story,setStory,marginLeft}:any) => {
  const {colors,dark}=useTheme()
  const [inputHeight, setInputHeight] = useState(67); 
  const [showStory, setShowStory] = useState('');


  return(
    <>
         <Animated.View  style={[styles.storyInputView, { justifyContent:'center', backgroundColor: colors.inputBk ,height:inputHeight}]}>
    {/* <Animated.View entering={FadeInLeft.duration(500).easing(Easing.ease)} style={[styles.storyInputView, { justifyContent:'center', backgroundColor: colors.inputBk ,height:inputHeight}]}> */}
    <TextInput
      style={[styles.storyInput, {color: colors.text ,height:inputHeight ,fontFamily:"SFCompactRoundedMD"}]}
      placeholder="How was your day?"
      onChangeText={(text)=>setStory(text)}
      multiline={true}
      value={story ||'' }

      placeholderTextColor={'gray'}
    />
    </Animated.View>


    </>
  )
   
  };

export default InputForm
const styles = StyleSheet.create({
  storyInput: {
 
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 19.09,
    marginTop: 15,
    // marginLeft:24,
    paddingVertical:20,
    marginBottom:15,
    paddingLeft:24
   
    
    

  },
  storyInputView: {
   
    width: width-48,
    borderRadius: 24,
    justifyContent: 'space-between',

  
   
  },
})