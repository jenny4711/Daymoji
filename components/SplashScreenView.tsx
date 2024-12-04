import { View, Text ,Image,Dimensions,Appearance} from 'react-native'
import React,{useEffect} from 'react'
// import splash from '../assets/splash.png';
import { useTheme } from '~/Theme/ThemeProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
const {width,height}=Dimensions.get('window')
const SplashScreenView = ({splashImage}:any) => {
  const {colors,dark,setScheme}=useTheme()
  const checkTimeForTheme = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    if (hours >= 6 && hours < 18) {
      setScheme('light');
      Appearance.setColorScheme('light');
    } else {
      setScheme('dark');
      Appearance.setColorScheme('dark');
    }
  };

  useEffect(() => {
    checkTimeForTheme();
  }, []);

  console.log('dark-------SplashScreenView',dark)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:colors.background }}>
        {/* <ActivityIndicator size="large" color={colors.text} /> */}
     
 <Image style={{width:width,height:height}} source={splashImage} />

      </View>
  )
}

export default SplashScreenView
