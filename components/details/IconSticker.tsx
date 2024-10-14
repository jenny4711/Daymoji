import { View, StyleSheet,Dimensions,TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React ,{useState}from 'react'
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  FadeInLeft,
  
} from 'react-native-reanimated';

import { useTheme } from '~/Theme/ThemeProvider';
import EmotionSticker from '../EmotionSticker';
import * as Haptics from 'expo-haptics';

const ANGLE = 10;
const TIME = 100;
const EASING = Easing.elastic(1.5);
const {width,height}=Dimensions.get('window')

const IconSticker = ({setEmotion,emotion,hideKeyboard}:any) => {

  const [emotionValue,setEmotionValue]=useState<any>(emotion)
  const {colors}=useTheme()
 

  const rotations: any = {
    Veryhappy: useSharedValue<number>(0),
    happy: useSharedValue<number>(0),
    neutral: useSharedValue<number>(0),
    sad: useSharedValue<number>(0),
    worst: useSharedValue<number>(0),
  };
  const getAnimatedStyle = (emotion: string) => useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotations[emotion].value}deg` }],
  }));






  const handlePress = (emotion: string) => {
    hideKeyboard();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);

    setEmotion((prev: any) => (prev === emotion ? '' : emotion));
    setEmotionValue((prev: any) => (prev === emotion ? '' : emotion));

    // 선택한 감정 아이콘에 대한 애니메이션 시퀀스
    rotations[emotion].value = withSequence(
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true
      ),
      withTiming(0, { duration: TIME / 2, easing: EASING })
    );
  };




  return (
   
     <Animated.View style={[styles.container, { backgroundColor: colors.background}]}>
      {['Veryhappy', 'happy', 'neutral', 'sad', 'worst'].map((em, index) => (
        <TouchableOpacity onPress={() => handlePress(em)} activeOpacity={1} key={index} style={[
          styles.iconBtnView,
          { backgroundColor: colors.inputBk },
          em === emotionValue && em !==""? { borderWidth: 2, borderColor: colors.text } : null,
        ]}>
          {/* < TouchableOpacity  onPress={() => handlePress(em)} activeOpacity={1}> */}
         
              <EmotionSticker emotion={em} size={25} />
             
         
          {/* </ TouchableOpacity > */}
        </TouchableOpacity>
      ))}

   

    </Animated.View>
  )
}

export default IconSticker
const styles = StyleSheet.create({
  container: {
   backgroundColor:'red',
   marginTop:24,
   marginBottom:16,
    // marginBottom: 14,
    flexDirection: 'row',
    height: width *.1527,
    width: width *.84,
    justifyContent: 'center',
    alignItems: 'center',
    // marginVertical: 16,
   
   
  },
  iconBtnView: {
    width: width *.1527,
    height: width *.1527,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width *.0085,
    // marginRight: ((width - 61) / 5) / 5,
  },
});