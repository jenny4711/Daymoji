import { View, Text, Touchable, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useCallback } from 'react';
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
import { handleTodayDate } from '~/utils/utilsFn';
import { findTodayData } from '~/utils/fireStoreFn';
import { checkData } from '~/utils/utilsFn';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import { useDateContext } from '~/context/DataContext';
const Main = () => {
  const { dark, colors, setScheme } = useTheme();
  const [lines, setLines] = useState(0);
  const [hasTodayData, setHasTodayData] = useState<any>(false);
  const {
    dateF,
    newAData,
    dateWithLang,
    visible,
    setVisible,
    headerTitle,
    setTodayDate,
    todayDate,
  } = useDateContext();
  const [showListMode, setShowListMode] = useState(false);
  const translateY = useSharedValue(0); // 애니메이션 상태
  const [today,setToday]=useState<any>(new Date())
  const navigation = useNavigation<any>();
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let currentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  const updateToday=async()=>{
    
    await handleTodayDate()
  }







  //오늘 날씨에 데이터가 있는지 확인
  useEffect(() => {
    setTodayDate(currentDate);
    const checkTodayData = async () => {
      const result = await findTodayData(month, currentDate);

      if (checkData(result)) {
        setHasTodayData(true);
      } else {
        setHasTodayData(false);
      }
    };
    checkTodayData();
  }, [currentDate, month, newAData]);
  // -----------------------------

  //오전6시부터 오후 6시까지는 light mode, 그 외는 dark mode
  const checkTimeForTheme = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours();

    if (hours >= 6 && hours < 18) {
      updateToday()
      setScheme('light'); // 오전 6시부터 오후 6시까지는 light mode
    } else {
      updateToday()
      setScheme('dark'); // 오후 6시부터 오전 6시까지는 dark mode
    }
  };

  useEffect(() => {
    checkTimeForTheme();
    updateToday()
  }, []);

  //-------------------------
  // 이모지 혹은 스토리 혹은 사진이 있을 때만 애니메이션 실행
  useEffect(() => {
    if (newAData && checkData(newAData)) {
      triggerAnimation(true);
    }
  }, [newAData]);

  // -------------------------
  // 디테일모드 에니메이션 (보여주기 에니메이션)
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
      withTiming(shouldShow ? 410 : 0, { duration: 500, easing: Easing.out(Easing.exp) }), // 박스 내려오기/올라가기
      withTiming(0, { duration: 500, easing: Easing.bezier(0.42, 0, 0.58, 1) })
    );
  };

  const letBoxDown = (shouldShow: boolean) => {
    // 애니메이션 시작
    translateY.value = withTiming(
      shouldShow ? 0 : 410, // 목표 위치
      { duration: 800, easing: Easing.out(Easing.exp) }, // 애니메이션 설정
      (finished) => {
        if (finished) {
          // console.log('Animation finished, calling setVisible');
          // 애니메이션이 끝난 후 JS 스레드에서 상태 업데이트 (UI 스레드에서 실행하지 않음)
          runOnJS(setVisible)(shouldShow);
        } else {
          // console.log('Animation interrupted');
        }
      }
    );
  };
  // ----------------------------
  // 오늘 날짜 데이터 생성함수
  const currentDateForm = useCallback(async () => {
    // const date = new Date();
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1;
    // const day = date.getDate();
    // let currentDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    // 현재 날짜를 사용하여 라우팅
    return (navigation as any).navigate('details/[date]', { date: currentDate, month });
  }, [navigation]);
  // -----------------------------------

  // 모바일폰 사이즈 마다 버튼 사이즈 밑 margin 조정하기
  const plusBtnSize = width * 0.1527;
  const plusBtnMgTop = height * 0.162;
  const topSize = lines > 5 ? height * 0.01 : height * -0.071;
  // ------------------------------------

  return (
    <View style={{ backgroundColor: colors.background, alignItems: 'center' }}>
      <Head>
        <title>Daymoji Login</title>
        <meta name="description" content="Index" />
      </Head>

      <Header
        headerTitle={headerTitle}
        day={dateF}
        showListMode={showListMode}
        setShowListMode={setShowListMode}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background }}>
        <Animated.ScrollView style={{ marginTop: 0 }}>
          {showListMode ? (
            <ListMode />
          ) : (
            <Calendars
              lines={lines}
              setLines={setLines}
              letBoxDown={letBoxDown}
              triggerAnimation={triggerAnimation}
            />
          )}
        </Animated.ScrollView>

        {visible ? (
          <Animated.View
            style={[{ borderRadius: 21, alignItems: 'center', marginTop: topSize }, animatedStyle]}>
            <DetailMode visible={visible} date={dateF} item={newAData} />
          </Animated.View>
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: plusBtnMgTop,
              marginBottom: 200,
            }}>
            <TouchableOpacity
              onPress={currentDateForm}
              style={
                !hasTodayData
                  ? {
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: colors.text,
                      width: plusBtnSize,
                      height: plusBtnSize,
                      borderRadius: 100,
                    }
                  : { display: 'none' }
              }>
              <Fontisto name="plus-a" size={16} color={colors.background} />
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Main;
