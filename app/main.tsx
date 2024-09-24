import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React ,{useState,useEffect}from 'react'
import Head from 'expo-router/head';
import Header from '~/components/main/Header';
import { useNavigation } from 'expo-router';
import Calendars from '~/components/main/Calendars';
import { ScrollView } from 'react-native-gesture-handler';
import { Dimensions } from 'react-native';
import { useTheme } from '~/Theme/ThemeProvider';
import Fontisto from '@expo/vector-icons/Fontisto';
import DetailMode from '~/components/main/DetailMode';
import ListMode from '~/components/main/ListMode';
import { ScaledSheet,scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence,Easing } from 'react-native-reanimated';
const {width,height}=Dimensions.get('window')
import { useDateContext } from '~/context/DataContext';
const Main = () => {
  const {colors}=useTheme()
  const [lines,setLines]=useState(0)
  const { dateF, newAData, dateWithLang ,visible,setVisible,headerTitle} = useDateContext();
const [showListMode,setShowListMode]=useState(false)
  const translateY = useSharedValue(0); // 애니메이션 상태
const navigation = useNavigation<any>();
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

    // // RenderDay에서 애니메이션 트리거 시 실행될 함수
    const triggerAnimation = (shouldShow: boolean) => {
      setVisible(shouldShow); // RenderDay에서 클릭에 따라 상태 업데이트
  
      // 애니메이션 실행
      translateY.value = withSequence(
        withTiming(shouldShow ? 410 : 0, { duration: 300 ,easing: Easing.out(Easing.exp),}), // 박스 내려오기/올라가기
        withTiming(0, { duration: 410 ,easing: Easing.bezier(0.42, 0, 0.58, 1),}) 
      
      );
    };

    const letBoxDown=(shouldShow:boolean)=>{
      // setVisible(shouldShow)
      translateY.value = withTiming(shouldShow?0:430, { duration: 300 ,easing: Easing.out(Easing.exp),})
      // setTimeout(()=>{
      //   setVisible(shouldShow)
      // },300)
      // setVisible(shouldShow)
    }

    const currentDateForm = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      let currentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  
      (navigation as any).navigate('details/[date]', { date: currentDate, month });
    };
    useEffect(()=>{console.log(visible,'visible')},[visible])







const plusBtnSize=width *0.1527
const plusBtnMgTop=height *0.1620
const topSize =height *-0.07
const topSize5=height * 0.021
const fixedTopSize=height>=932?moderateScale(-70):moderateScale(-47)
const fixedButtonMg=height>=932?moderateScale(190):moderateScale(135)

  return (
    <View style={{backgroundColor:colors.background,alignItems:'center'}}>
     <Head>
      <title>Daymoji Login</title>
      <meta name="description" content="Index" />
    </Head>
   
    <Header headerTitle={headerTitle} day={dateF} showListMode={showListMode} setShowListMode={setShowListMode}/>
      <ScrollView showsVerticalScrollIndicator={false}  style={{ backgroundColor:colors.background,height:height}}>
      

        <Animated.ScrollView style={{marginTop:0,backgroundColor:colors.background}}>
          {
            showListMode?<ListMode />
            :          <Calendars lines={lines} setLines={setLines} setVisible={setVisible} visible={visible} triggerAnimation={triggerAnimation} letBoxDown={letBoxDown} />
          }


         
        </Animated.ScrollView>



      { 
      //  <Animated.View style={[{borderRadius:21,alignItems:'center',marginTop:lines>5?0:-78},animatedStyle]}></Animated.View>
        visible?  <Animated.View style={[{borderRadius:21,alignItems:'center',marginTop:lines>5?topSize5: topSize},animatedStyle]}>
            <DetailMode visible={visible} date={dateF} item={newAData} newDate={dateWithLang} />
          </Animated.View>:
          <View style={{justifyContent:'center',alignItems:'center',marginTop:plusBtnMgTop}}>
          <TouchableOpacity onPress={currentDateForm} style={{justifyContent: 'center', alignItems: 'center', backgroundColor: colors.text, width: plusBtnSize, height: plusBtnSize, borderRadius: 100 }}>
            <Fontisto name="plus-a" size={16} color={colors.background} />
          </TouchableOpacity>
          </View>
          }
          

        

      </ScrollView>
    
    </View>
  )
}

export default Main

