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

const IconSticker = ({setEmotion,emotion}:any) => {

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






  const handlePress =(emotion: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
   setEmotion(emotion)
    setEmotionValue(emotion)
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
  }




  return (
    // <Animated.View entering={FadeInLeft.duration(500).easing(Easing.ease)} style={[styles.container, { backgroundColor: colors.background }]}>
     <Animated.View style={[styles.container, { backgroundColor: colors.background }]}>
      {['Veryhappy', 'happy', 'neutral', 'sad', 'worst'].map((em, index) => (
        <View key={index} style={[
          styles.iconBtnView,
          { backgroundColor: colors.inputBk },
          em === emotionValue ? { borderWidth: 1, borderColor: colors.text } : null,
        ]}>
          < TouchableOpacity  onPress={() => handlePress(em)} activeOpacity={1}>
         
              <EmotionSticker emotion={em} size={25} />
             
         
          </ TouchableOpacity >
        </View>
      ))}

   

    </Animated.View>
  )
}

export default IconSticker
const styles = StyleSheet.create({
  container: {
   backgroundColor:'red',
    marginBottom: 14,
    flexDirection: 'row',
    height: 60,
    width: width *.84,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
   
  },
  iconBtnView: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ((width - 48) / 5) / 5,
  },
});