import { View, Text, StyleSheet, TouchableOpacity, Dimensions,Animated } from 'react-native';
import React, { useState, useEffect ,useRef,useCallback} from 'react';
import { CalendarList ,Calendar,LocaleConfig} from 'react-native-calendars';
import { useNavigation, useFocusEffect } from 'expo-router';
import RenderDay from './RenderDay';
import { useDateContext } from '~/context/DataContext';
import { useTheme } from '~/Theme/ThemeProvider';
import { useQueryClient } from '@tanstack/react-query';
import {throttle } from 'lodash';
import { ScaledSheet,scale, verticalScale, moderateScale } from 'react-native-size-matters';
const { width, height } = Dimensions.get('window');
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

import DaynameHeader from './DaynameHeader';

const Calendars = ({lines,setLines,triggerAnimation,letBoxDown}:any) => {

 const { colors,dark } = useTheme() as any;
 const navigation = useNavigation();
 const queryClient = useQueryClient();
 const [email, setEmail] = useState<any>('');
 const [month, setMonth] = useState<any>('');
 const [getPaddingSize,setGetPaddingSize]=(useState as any)(0)
 const calendarRef = useRef(null) as any; 
 const [currentMonth, setCurrentMonth] = useState({ year: '', month: month });
const { monthF ,setMonthF,dateF,setHeaderTitle,visible,setVisible,headerTitle}=useDateContext()

const [isAugust,setIsAugust]=useState(false)



const [selectedDate, setSelectedDate] = useState<string | null>(null);
const [isDetailVisible, setIsDetailVisible] = useState(false); // 상태로 디테일 뷰의 표시 여부를 관리
const animatedHeight = new Animated.Value(height * 0.4); // 디테일 뷰의 초기 높이 설정

// const toggleDetailView = () => {
//   const toValue = isDetailVisible ? height * 0.4 : height * 0.7;
//   setIsDetailVisible(!isDetailVisible);

//   Animated.timing(animatedHeight, {
//     toValue,
//     duration: 300,
//     useNativeDriver: false,
//   }).start();
// };







useFocusEffect(
  React.useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['data'] });
  }, [])
);



function getWeeksInMonth(year:any, month:any) {
  // 해당 달의 첫째 날의 요일 (getDay: 0 = 일요일, 1 = 월요일)
  const firstDayOfMonth = new Date(year, month, 5).getDay();

  // 해당 달의 마지막 날짜
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
  
  // 첫째 날이 월요일(1)이면 그대로, 아니면 그만큼 추가 공간이 필요하므로 조정
  const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

  // 해당 월의 총 일수와 첫 주의 시작 요일을 더한 후 7로 나누어 몇 주인지 계산
  const totalDaysInMonth = adjustedFirstDay + lastDateOfMonth;
  
  // 주 수 계산
  const weeks = Math.ceil(totalDaysInMonth / 7);

  return weeks; 
}



const handleMonthChange = useCallback(
  throttle((months: any) => {
    const newYear = months[0].year;
    const newMonth = months[0].month;
  

    // 상태를 업데이트하여 현재 월을 관리
    setCurrentMonth({ year: newYear, month: newMonth });

    const date = new Date(months[0].dateString);
    const header = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
const checkLines=getWeeksInMonth(newYear,newMonth)

if(checkLines>5){
  setGetPaddingSize(0)
}else{
  setGetPaddingSize(-80)
}
console.log(header,'header')
setLines(checkLines)

// setIsAugust(newMonth)
     setMonth(newMonth);
  setMonthF(newMonth)
     setHeaderTitle(header);
   
  }, 300), // 500ms의 간격으로 throttle 적용
  []
);


// const onMomentumScrollEnd = () => {

//   if (calendarRef.current) {
//     const { year, month }: any = currentMonth;

//     if (year && month) {
//       const currentDay = new Date(year, month - 1, 1);

     
  
//       calendarRef.current.scrollToMonth(currentDay, 1, false);
//     }
//   }
// };



function changedColor(){
return colors.background as any
}

// const renderHeader = (day: any) => {
//   const month = new Date(day)
//   const header = month.toLocaleDateString('en-US', { month: 'long'});
//   const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

//   return (
   
//     <View style={{flexDirection: 'row', justifyContent: 'center', backgroundColor: 'red', width: width - 48 ,marginTop:-9,marginBottom:-15}}>
//     {weekDays.map((day, index) => (
//       <Text key={index} style={[styles.weekNameText,{color:colors.text}]}>
//         {day}
//       </Text>
//     ))}
//   </View>
//   );
// };





const fixedHeight=height>=932?height/2.26:height/2.15

  return (
    < >
  <CalendarList
        //  ref={calendarRef}
        horizontal={true}
          enableSwipeMonths={true}
           dayComponent={({ date, state }: any) => <RenderDay day={date} month={month} triggerAnimation={triggerAnimation} letBoxDown={letBoxDown} />}
            renderHeader={(day: any) => <DaynameHeader />}
       style={{width:width ,height:verticalScale(fixedHeight),backgroundColor:colors.background}}
          onVisibleMonthsChange={(months: any) => {
           
            handleMonthChange(months);
          }}
          // pastScrollRange={14}
          // futureScrollRange={14}
          pagingEnabled={true}  
          // snapToInterval={width-48}  
          scrollEnabled={true}
            hideDayNames={true}
            
           
           maxDate={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
           minDate={'2021-01-01'}
          hideExtraDays={false}
         
          // showWeekNumbers={false}
          // initialNumToRender={10}
         // maxToRenderPerBatch={10}
    
          // customHeader={(day: any) => <Header headerTitle={headerTitle} day={day} />}
        firstDay={1}
        theme={{
          calendarBackground:()=>changedColor() as void,
          monthTextColor: colors.text,
          // textDayFontFamily: "SFCompactRoundedBD",
        }}
          // theme={{
          //   calendarBackground:()=>changedColor() as void,
          //   monthTextColor: colors.text,
          //   // textDayFontFamily: "SFCompactRoundedBD",
          // dayTextColor: colors.text,
          // dayTextFontSize: 10,
          // textDayStyle: { fontFamily: "SFCompactRoundedBD", fontSize: 12, lineHeight: 14.32, color: colors.text },
          //    textSectionTitleColor: colors.text,
          //   //  textSectionTitleFontFamily:"SFCompactRoundedBD",
          //     // textSectionTitleFontSize:9,
          // //  textDisabledColor:'gray',
          //     // dayNamesTextFontFamily: "SFCompactRoundedBD", // 요일 이름 폰트 패밀리
          //     // dayNamesTextFontSize: 12, 
          //     // dayNameTextColor: colors.text, // 요일 이름 색상
          //  marginBottom:0,
          //  paddingBottom:0,
         
          // }}
        />




    
     
       {/* <CalendarList
        //  ref={calendarRef}
        horizontal={true}
          enableSwipeMonths={true}
          dayComponent={({ date, state }: any) => <RenderDay day={date} month={month} triggerAnimation={triggerAnimation} letBoxDown={letBoxDown} />}
          renderHeader={(day: any) => <Header headerTitle={headerTitle} day={day} />}
       
         
          onVisibleMonthsChange={(months: any) => {
           
            handleMonthChange(months);
          }}
          pastScrollRange={14}
          futureScrollRange={14}
          pagingEnabled={true}  
          snapToInterval={width-48}  
          scrollEnabled={true}
            // hideDayNames={true}
           snapToAlignment="start" // 페이지의 시작 부분에 맞춤
          scrollEventThrottle={16}  
          // onMomentumScrollEnd={onMomentumScrollEnd} 
          calenderWidth={width -48}
          showScrollIndicator={false}
           style={{ margin:0,padding:0, backgroundColor: 'red'}}
          //  style={{backgroundColor: colors.background,paddingTop:0,marginTop:0,marginBottom:getPaddingSize}}
          maxDate={`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`}
          minDate={'2021-01-01'}
          hideExtraDays={false}
          hideDayNames={true}
          showWeekNumbers={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
         
          // customHeader={(day: any) => <Header headerTitle={headerTitle} day={day} />}
        firstDay={1}
          theme={{
            calendarBackground:()=>changedColor() as void,
            monthTextColor: colors.text,
            // textDayFontFamily: "SFCompactRoundedBD",
          dayTextColor: colors.text,
          dayTextFontSize: 10,
          textDayStyle: { fontFamily: "SFCompactRoundedBD", fontSize: 12, lineHeight: 14.32, color: colors.text },
             textSectionTitleColor: colors.text,
            //  textSectionTitleFontFamily:"SFCompactRoundedBD",
              // textSectionTitleFontSize:9,
          //  textDisabledColor:'gray',
              // dayNamesTextFontFamily: "SFCompactRoundedBD", // 요일 이름 폰트 패밀리
              // dayNamesTextFontSize: 12, 
              // dayNameTextColor: colors.text, // 요일 이름 색상
           marginBottom:0,
           paddingBottom:0,
         
          }}
        /> */}
        {/* <View style={{position:'absolute',top:lines>5?500:420}}>
          <Text>Hello!!</Text>
        </View> */}
    </>




  )
}

export default Calendars

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // header: {
  //   width: '100%',
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 16,
  //   // paddingTop: 10,
  //   // paddingBottom:10,

  // },
  headerText: {
    fontSize: 20,
    
  },

  weekNameText: {
    width: (width - 48) / 6.8, // 요일이 7개이므로, 각 텍스트의 너비를 정확하게 화면 너비에 맞춤
    textAlign: 'center',
    color: 'gray',
    fontSize: 12,
    fontFamily: "SFCompactRoundedBD",
    lineHeight: 14.32,
    
   
  }
  
});

