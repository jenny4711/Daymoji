
// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
// import { useTheme } from '~/Theme/ThemeProvider';
// import { useDateContext } from '~/context/DataContext';
// import Header from './Header';
// import MonthDay from './MonthDay';
// import { useData } from '~/hooks/useData';

// const { width ,height} = Dimensions.get('window');
// const circleSize = width * 0.1104;
// // 요일 배열 (월요일 시작)
// const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// // 월별 날짜 배열 생성 (월요일 시작으로 재정렬)
// const getDaysInMonth = (year: number, month: number) => {
//   const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // 월요일 시작으로 변환
//   const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수
//   const daysArray = Array(firstDayOfMonth).fill(null);

//   for (let day = 1; day <= daysInMonth; day++) {
//     daysArray.push(day);
//   }

//   const remainingDays = 7 - (daysArray.length % 7);
//   if (remainingDays !== 7) {
//     daysArray.push(...Array(remainingDays).fill(null));
//   }

//   return daysArray;
// };

// const Calendars = ({lines,setLines,triggerAnimation ,letBoxDown}:any) => {
//   const scrollRef = useRef<ScrollView>(null);
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [showToday,setShowToday] = useState(true)
//   const [isScrolling, setIsScrolling] = useState(false);  // 스크롤 중 상태 추가
//   const [loadedMonth, setLoadedMonth] = useState(new Date().getMonth());  // 로드된 월 상태
//   const [clickedDay, setClickedDay] = useState<number | null>(null);
//   const { headerTitle, setHeaderTitle, setMonthF, setYearF, monthF,setVisible } = useDateContext();
//   const { colors } = useTheme();
// const today = new Date();
// const todayDay= `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`




//   function getWeeksInMonth(year:any, month:any) {
//     // 해당 달의 첫째 날의 요일 (getDay: 0 = 일요일, 1 = 월요일)
//     const firstDayOfMonth = new Date(year, month, 5).getDay();
  
//     // 해당 달의 마지막 날짜
//     const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    
//     // 첫째 날이 월요일(1)이면 그대로, 아니면 그만큼 추가 공간이 필요하므로 조정
//     const adjustedFirstDay = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;
  
//     // 해당 월의 총 일수와 첫 주의 시작 요일을 더한 후 7로 나누어 몇 주인지 계산
//     const totalDaysInMonth = adjustedFirstDay + lastDateOfMonth;
    
//     // 주 수 계산
//     const weeks = Math.ceil(totalDaysInMonth / 7);
  
//     return weeks; 
//   }




//   // 데이터 로딩 상태와 관련된 커스텀 훅
//   const { data: currentData } = useData(monthF);
//   const { data: prevData } = useData(monthF - 1);
//   const { data: nextData } = useData(monthF + 1);

//   // 현재 월, 이전 월, 다음 월의 날짜 배열 가져오기
//   const currentMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
//   const prevMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);
//   const nextMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);

//   // 현재 날짜 정보 및 타이틀 설정
//   useEffect(() => {
//     const updateHeaderAndMonth = () => {
//       const currMonth = currentDate.getMonth() + 1;  // monthF에 맞춰 1부터 시작
//       const currYear = currentDate.getFullYear();
//       const header = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      
//       setHeaderTitle(header);  // 헤더 타이틀 업데이트
//       setMonthF(currMonth);  // monthF 업데이트
//       setYearF(currYear);  // yearF 업데이트
//      const weeks = getWeeksInMonth(currYear, currMonth );
//      setLines(weeks)
    

//     };

//     updateHeaderAndMonth();
//   }, [currentDate]);  // currentDate가 변경될 때마다 헤더와 monthF 업데이트
// useEffect(()=>{
//   console.log(currentDate,'currentDate')
// },[])

//  // 스크롤 완료 시 처리
//  const handleScrollEnd = async (event: any) => {
//   const offsetX = event.nativeEvent.contentOffset.x;
//   const pageIndex = Math.round(offsetX / width); // 페이지 인덱스 계산
//   setClickedDay(null)
//    // 스크롤 시작

//   if (pageIndex === 0 && monthF - 1 !== loadedMonth) {
//     // 이전 달로 이동
  
//     await preloadMonth(monthF - 1);  // 데이터를 미리 로드하고 전환
//     const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
//     console.log(newDate,'newDate-prev')
//     setCurrentDate(newDate);
    
//     updateHeader(newDate);  // 헤더 타이틀 업데이트
//     scrollRef.current?.scrollTo({ x: width, animated: false });
//   } else if (pageIndex === 2 && monthF + 1 !== loadedMonth) {
//     // 다음 달로 이동
//     await preloadMonth(monthF + 1);  // 데이터를 미리 로드하고 전환
//     const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

//     setCurrentDate(newDate);
//     updateHeader(newDate);  // 헤더 타이틀 업데이트
//     scrollRef.current?.scrollTo({ x: width, animated: false });
//   }else{
  
//     await preloadMonth(monthF - 1);  // 데이터를 미리 로드하고 전환
//     const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
   
//     setCurrentDate(newDate);
    
//     updateHeader(newDate);  // 헤더 타이틀 업데이트
//     scrollRef.current?.scrollTo({ x: width, animated: false });






//   }

//    // 스크롤 종료
  
// };

// // 헤더 타이틀 업데이트 함수
// const updateHeader = (date: Date) => {

//   const header = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
//   setHeaderTitle(header);  // 헤더 타이틀을 명시적으로 업데이트
// };

// // 데이터를 미리 로드하는 함수 (스크롤 전환 전에 호출)
// const preloadMonth = async (newMonth: number) => {
 
//   if (newMonth < monthF) {
//     // 이전 달 데이터 로드
 
//     console.log(currentDate,'currentDate');
//     if (!prevData) {
//       // 데이터를 로드하는 로직 필요
    
//       console.log('prevData',newMonth);
//     }
//   } else if (newMonth > monthF) {

//     // 다음 달 데이터 로드
//     if (!nextData) {
//       // 데이터를 로드하는 로직 필요
//       console.log('nextData',newMonth);
//     }
//   }
//   setLoadedMonth(newMonth);
// };

// useEffect(() => {
//   // 처음 로드될 때 헤더 타이틀을 설정
//   updateHeader(currentDate);
//   console.log(currentDate.getMonth() + 1,'currentDate')
//   setMonthF(currentDate.getMonth() + 1);
//   setYearF(currentDate.getFullYear());
// }, []);


// const handleScrollBeginDrag = () => {
//   // 스크롤이 시작될 때 클릭된 날짜 상태를 초기화 (border 제거)

//   if(today.getMonth() === monthF){
//     setShowToday(true)
//     setClickedDay(null);
//   }else{
//     setShowToday(false)
//     setClickedDay(null);
//   }
 

  
 

  
// };


//   return (
//     <View style={{backgroundColor:colors.background,height:height *.58}}>
//       <View style={[styles.header,{backgroundColor:colors.background}]}>
//         {/* <Header /> */}
//       </View>

//       <View style={styles.weekRow}>
//         {daysOfWeek.map((day, index) => (
//           <Text key={index} style={[styles.weekDay,{color:colors.text,fontFamily:'SFCompactRoundedBD'}]}>
//             {day}
//           </Text>
//         ))}
//       </View>

//       <ScrollView
//         ref={scrollRef}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onMomentumScrollEnd={handleScrollEnd} // 스크롤 완료 시 handleScrollEnd 호출
//         contentOffset={{ x: width, y: 0 }} // 초기 스크롤 위치를 현재 월로 설정
//         scrollEnabled={!isScrolling}  // 스크롤 중일 때 스크롤을 막음
//         onScrollBeginDrag={handleScrollBeginDrag} // 스크롤 시작 시 클릭된 날짜 초기화
//       >
//         {/* 이전 달 */}
//         <View style={styles.monthContainer}>
//           {prevMonthDays.map((day, index) => (
//             <View key={index} style={styles.dayBox}>
//               {day ? <MonthDay  showToday={showToday}  today={todayDay}   clickedDay={clickedDay} setClickedDay={setClickedDay} letBoxDown={letBoxDown} triggerAnimation={triggerAnimation}  month={monthF - 1} day={day} data={prevData} /> : null}
//             </View>
//           ))}
//         </View>

//         {/* 현재 달 */}
//         <View style={styles.monthContainer}>
//           {currentMonthDays.map((day, index) => (
//             <View key={index} style={styles.dayBox}>
//               {day ? <MonthDay showToday={showToday} today={todayDay}   clickedDay={clickedDay} setClickedDay={setClickedDay} letBoxDown={letBoxDown} triggerAnimation={triggerAnimation}  month={monthF} day={day} data={currentData} /> : null}
//             </View>
//           ))}
//         </View>

//         {/* 다음 달 */}
//         <View style={styles.monthContainer}>
//           {nextMonthDays.map((day, index) => (
//             <View key={index} style={styles.dayBox}>
//               {day ? <MonthDay showToday={showToday}  isScrolling={isScrolling}  today={todayDay}     clickedDay={clickedDay} setClickedDay={setClickedDay} letBoxDown={letBoxDown} triggerAnimation={triggerAnimation}  month={monthF + 1} day={day} data={nextData} /> : null}
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default Calendars;

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     // padding: 16,
//     alignItems: 'center',
//   },
//   weekRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
    
//     paddingHorizontal: 24,
//   },
//   weekDay: {
//     width: width / 7,
//     textAlign: 'center',
//     fontSize:12,
//   },
//   monthContainer: {
//     width: width,
//     flexDirection: 'row',
//     flexWrap: 'wrap',

   
    
//   },
//   dayBox: {
//     width: (width-48) / 7,
//     height: circleSize *1.46,
//     marginBottom:16,
   
//   },
// });


import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '~/Theme/ThemeProvider';
import { useDateContext } from '~/context/DataContext';
import Header from './Header';
import MonthDay from './MonthDay';
import { useData } from '~/hooks/useData';

const { width ,height} = Dimensions.get('window');
const circleSize = width * 0.1104;
// 요일 배열 (월요일 시작)
const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// 월별 날짜 배열 생성 (월요일 시작으로 재정렬)
const getDaysInMonth = (year: number, month: number) => {
  const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7; // 월요일 시작으로 변환
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // 해당 월의 총 일수
  const daysArray = Array(firstDayOfMonth).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    daysArray.push(day);
  }

  const remainingDays = 7 - (daysArray.length % 7);
  if (remainingDays !== 7) {
    daysArray.push(...Array(remainingDays).fill(null));
  }

  return daysArray;
};

const Calendars = ({lines,setLines,triggerAnimation ,letBoxDown}:any) => {
  const scrollRef = useRef<ScrollView>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isScrolling, setIsScrolling] = useState(false);  // 스크롤 중 상태 추가
  const [loadedMonth, setLoadedMonth] = useState(new Date().getMonth());  // 로드된 월 상태
  const [clickedDay, setClickedDay] = useState<number | null>(null);
  const { headerTitle, setHeaderTitle, setMonthF, setYearF, monthF,setVisible } = useDateContext();
  const { colors } = useTheme();


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




  // 데이터 로딩 상태와 관련된 커스텀 훅
  const { data: currentData } = useData(monthF);
  const { data: prevData } = useData(monthF - 1);
  const { data: nextData } = useData(monthF + 1);

  // 현재 월, 이전 월, 다음 월의 날짜 배열 가져오기
  const currentMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth());
  const prevMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() - 1);
  const nextMonthDays = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);

  // 현재 날짜 정보 및 타이틀 설정
  useEffect(() => {
    const updateHeaderAndMonth = () => {
      const currMonth = currentDate.getMonth() + 1;  // monthF에 맞춰 1부터 시작
      const currYear = currentDate.getFullYear();
      const header = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      
      setHeaderTitle(header);  // 헤더 타이틀 업데이트
      setMonthF(currMonth);  // monthF 업데이트
      setYearF(currYear);  // yearF 업데이트
     const weeks = getWeeksInMonth(currYear, currMonth );
     setLines(weeks)
    

    };

    updateHeaderAndMonth();
  }, [currentDate]);  // currentDate가 변경될 때마다 헤더와 monthF 업데이트
useEffect(()=>{
  console.log(currentDate,'currentDate')
},[])

 // 스크롤 완료 시 처리
 const handleScrollEnd = async (event: any) => {
  const offsetX = event.nativeEvent.contentOffset.x;
  const pageIndex = Math.round(offsetX / width); // 페이지 인덱스 계산
  setClickedDay(null)
  setIsScrolling(true);  // 스크롤 시작

  if (pageIndex === 0 && monthF - 1 !== loadedMonth) {
    // 이전 달로 이동
  
    await preloadMonth(monthF - 1);  // 데이터를 미리 로드하고 전환
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    console.log(newDate,'newDate-prev')
    setCurrentDate(newDate);
    
    updateHeader(newDate);  // 헤더 타이틀 업데이트
    scrollRef.current?.scrollTo({ x: width, animated: false });
  } else if (pageIndex === 2 && monthF + 1 !== loadedMonth) {
    // 다음 달로 이동
    await preloadMonth(monthF + 1);  // 데이터를 미리 로드하고 전환
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

    setCurrentDate(newDate);
    updateHeader(newDate);  // 헤더 타이틀 업데이트
    scrollRef.current?.scrollTo({ x: width, animated: false });
  }else{
  
    await preloadMonth(monthF - 1);  // 데이터를 미리 로드하고 전환
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
   
    setCurrentDate(newDate);
    
    updateHeader(newDate);  // 헤더 타이틀 업데이트
    scrollRef.current?.scrollTo({ x: width, animated: false });






  }

  setIsScrolling(false);  // 스크롤 종료
};

// 헤더 타이틀 업데이트 함수
const updateHeader = (date: Date) => {

  const header = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  setHeaderTitle(header);  // 헤더 타이틀을 명시적으로 업데이트
};

// 데이터를 미리 로드하는 함수 (스크롤 전환 전에 호출)
const preloadMonth = async (newMonth: number) => {
  
  if (newMonth < monthF) {
    // 이전 달 데이터 로드
    console.log(currentDate,'currentDate');
    if (!prevData) {
      // 데이터를 로드하는 로직 필요
      console.log('prevData',newMonth);
    }
  } else if (newMonth > monthF) {
    // 다음 달 데이터 로드
    if (!nextData) {
      // 데이터를 로드하는 로직 필요
      console.log('nextData',newMonth);
    }
  }
  setLoadedMonth(newMonth);
};

useEffect(() => {
  // 처음 로드될 때 헤더 타이틀을 설정
  updateHeader(currentDate);
  console.log(currentDate.getMonth() + 1,'currentDate')
  setMonthF(currentDate.getMonth() + 1);
  setYearF(currentDate.getFullYear());
}, []);

const handleScrollBeginDrag = () => {
  // 스크롤이 시작될 때 클릭된 날짜 상태를 초기화 (border 제거)

 
    setClickedDay(null);
  
}


  return (
    <View style={{backgroundColor:colors.background,height:height *.58}}>
      <View style={[styles.header,{backgroundColor:colors.background}]}>
        {/* <Header /> */}
      </View>

      <View style={styles.weekRow}>
        {daysOfWeek.map((day, index) => (
          <Text key={index} style={[styles.weekDay,{color:colors.text,fontFamily:'SFCompactRoundedBD'}]}>
            {day}
          </Text>
        ))}
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd} // 스크롤 완료 시 handleScrollEnd 호출
        contentOffset={{ x: width, y: 0 }} // 초기 스크롤 위치를 현재 월로 설정
        scrollEnabled={!isScrolling}  // 스크롤 중일 때 스크롤을 막음
        onScrollBeginDrag={handleScrollBeginDrag} 
      >
        {/* 이전 달 */}
        <View style={styles.monthContainer}>
          {prevMonthDays.map((day, index) => (
            <View key={index} style={styles.dayBox}>
              {day ? <MonthDay setClickedDay={setClickedDay} clickedDay={clickedDay} letBoxDown={letBoxDown} triggerAnimation={triggerAnimation}  month={monthF - 1} day={day} data={prevData} /> : null}
            </View>
          ))}
        </View>

        {/* 현재 달 */}
        <View style={styles.monthContainer}>
          {currentMonthDays.map((day, index) => (
            <View key={index} style={styles.dayBox}>
              {day ? <MonthDay setClickedDay={setClickedDay} clickedDay={clickedDay} letBoxDown={letBoxDown} triggerAnimation={triggerAnimation}  month={monthF} day={day} data={currentData} /> : null}
            </View>
          ))}
        </View>

        {/* 다음 달 */}
        <View style={styles.monthContainer}>
          {nextMonthDays.map((day, index) => (
            <View key={index} style={styles.dayBox}>
              {day ? <MonthDay setClickedDay={setClickedDay} clickedDay={clickedDay} letBoxDown={letBoxDown} triggerAnimation={triggerAnimation}  month={monthF + 1} day={day} data={nextData} /> : null}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Calendars;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    // padding: 16,
    alignItems: 'center',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    
    paddingHorizontal: 24,
  },
  weekDay: {
    width: width / 7,
    textAlign: 'center',
    fontSize:12,
  },
  monthContainer: {
    width: width,
    flexDirection: 'row',
    flexWrap: 'wrap',

   
    
  },
  dayBox: {
    width: (width-48) / 7,
    height: circleSize *1.46,
    marginBottom:16,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#e0e0e0',
  },
});


