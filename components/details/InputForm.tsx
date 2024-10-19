import { View, Text ,StyleSheet,TextInput,Dimensions} from 'react-native'
import React,{useState,useEffect} from 'react'
import { useTheme } from '~/Theme/ThemeProvider';
import Animated, { Easing,FadeInLeft  } from 'react-native-reanimated';
const {width,height}=Dimensions.get('window')

const InputForm = ({story,setStory,marginLeft}:any) => {
  const {colors,dark}=useTheme()
  const [inputHeight, setInputHeight] = useState(67); 
  // const [showStory, setShowStory] = useState('');
const lineHeight=19.09
const initialHeight = 67; // 기본 높이
const paddingVertical = 24;

const handleContentSizeChange = (contentSize: { height: number }) => {
  // 입력된 높이를 바탕으로 줄 수를 계산
  const numberOfLines = Math.ceil(contentSize.height / lineHeight);
  let newHeight;

  // 두 번째 줄부터 높이를 조정
  if (numberOfLines > 2) {
    newHeight = contentSize.height + paddingVertical * 2;
    //  newHeight = Math.max(67, numberOfLines * lineHeight+paddingVertical+paddingVertical); 
    
  } else {
    newHeight = initialHeight;
    // newHeight = 67;
   
    // 첫 번째 줄일 때는 기본 높이 유지
  }

  setInputHeight(newHeight); // 새로운 높이 설정
};






  return(
    <>
         <Animated.View  style={[styles.storyInputView, { justifyContent:'center'}]}>

    <TextInput
      style={[styles.storyInput, {color: colors.text ,height:inputHeight ,fontFamily:"SFCompactRoundedMD",backgroundColor:colors.inputBk,borderRadius:24}]}
      placeholder="How was your day?"
      onChangeText={(text)=>setStory(text)}
    
      scrollEnabled={false} 
      multiline={true}
      value={story ||'' }
      // onContentSizeChange={(e) => handleContentHeight(e.nativeEvent.contentSize.height)}
      onContentSizeChange={(e)=>handleContentSizeChange({height:e.nativeEvent.contentSize.height})} 
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
   
    paddingVertical:24,
  
    paddingHorizontal:24,
   

    
    

  },
  storyInputView: {
   
    width: width-48,
    borderRadius: 24,
    justifyContent: 'center',
    

  
   
  },
})