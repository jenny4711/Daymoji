// import React, { useState, useRef ,useEffect,memo} from 'react';
// import { View, Text, StyleSheet, Dimensions, ScrollView ,TouchableOpacity,Alert} from 'react-native';
// import EmotionSticker from '../EmotionSticker';
// import { useDateContext } from '~/context/DataContext';
// import {useNavigation} from 'expo-router'
// import { useTheme } from '~/Theme/ThemeProvider';
// import { set } from 'lodash';
// const { width } = Dimensions.get('window');
// const circleSize = width * 0.1104;
// const MonthDay = ({isScrolling,showToday,today,clickedDay,setClickedDay,monthDaysArr,month,data,day,index,triggerAnimation ,letBoxDown}:any) => {

//   const navigation = useNavigation();
//   const {colors}=useTheme()
//   const {dateF, newAData,setNewAData,dateWithLang ,monthF,setDateF,yearF,visible} = useDateContext();
//   const [date,setDate]=useState<any>(`${yearF}-${monthF}-${day}`)
//   const [item,setItem]=useState<any>(null)
 
//   const [showIsBorder,setShowIsBorder]=useState(false)
//   const [itemMonth,setItemMonth]=useState<any>(null)
// // const today=new Date()
// const selectedDate=new Date(yearF,monthF-1,day)
// const isDisabled=selectedDate>today

//   // 현재 날짜 계산
//   const currentDate = new Date();
//   const currentDay = currentDate.getDate();
//   const currentMonth = currentDate.getMonth() + 1;
//   const currentYear = currentDate.getFullYear();
//   const isToday = showToday && day ===  currentDay && monthF === currentMonth && yearF === currentYear;
//   const isCurrentMonth = monthF === currentMonth && yearF === currentYear;
// useEffect(()=>{
// if(itemMonth !==monthF){
//   letBoxDown(false)
//   setClickedDay(null)
// }


// },[monthF])


// useEffect(()=>{
//   const dateS = day < 10 ? `0${day}` : day;
//   const monthS = month < 10 ? `0${month}` : month;
//   const date = `${yearF}-${monthS}-${dateS}`;
//   if(data){
//     const result = data.find((item:any) =>  item.date === date);
 
//     setItem(result);
//   }
// },[data])




// const saveData = (day: any) => {
//   const dateS = day < 10 ? `0${day}` : day;
//   const monthS = monthF < 10 ? `0${monthF}` : monthF;
//   const date = `${yearF}-${monthS}-${dateS}`;
//   if(isDisabled){
    
//     return;
  
//   }



  
 
//   setDateF(date);
//   return (navigation as any).navigate('details/[date]', { date, month: monthF });
// };


// const showDetailItem=(day:any)=>{
//   setShowIsBorder(!showIsBorder)
//   const dateS = day < 10 ? `0${day}` : day;
//   const monthS = monthF < 10 ? `0${monthF}` : monthF;
//   const itemDate =new Date(item?.date).getMonth()+1
//   const date = `${yearF}-${monthS}-${dateS}`;
//   setNewAData(item)
//   setItemMonth(itemDate)
//   setDate(date)
//   triggerAnimation(!visible);
 


// if(date ===dateF){
// letBoxDown(!visible)

// setClickedDay((prevDay:any) => (prevDay === day ? null : day));


// }else{
//   setDateF(date)
  
//   setClickedDay((prevDay:any) => (prevDay === day ? null : day));
//   triggerAnimation(true);
 
  
// }


// }






//   return (

//             <View key={index} style={[styles.dayBox]}>
//               {item !==undefined?(
//                 <TouchableOpacity 
//                 activeOpacity={1}
//                 style={[styles.circle, {
//                   backgroundColor: colors.inputBk,
                
//                   borderWidth:clickedDay === day?2:0,
//                   zIndex: clickedDay === day ?100:0,
//                   borderColor: colors.text
//                 }]}
//                 onPress={()=>showDetailItem(day)}
//                 >
                  
//                   {item?.emotion && <EmotionSticker size={25} emotion={item?.emotion} />}
//                 </TouchableOpacity>
//               ):(
//                 <TouchableOpacity 
//                 onPress={()=>saveData(day)}
//                 activeOpacity={1}
//                 style={[styles.circle, {
                 
//                   backgroundColor: colors.inputBk,
                  
//                   borderWidth:clickedDay === day ?2:0,
//                   zIndex:clickedDay === day ?100:0,
//                   borderColor:colors.text
//                 }]}


                
//                 >
                
//                   <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: colors.text, opacity: 0.1 }} />
//                 </TouchableOpacity>
//               )}
//           <View style={{marginTop:.1,backgroundColor:isToday && isCurrentMonth?colors.text:colors.background,borderRadius:100,width:27,height:18,justifyContent:'center',alignItems:'center'}}>
//               <Text style={[styles.dayText,{fontFamily:'SFCompactRoundedBD',color:isToday && isCurrentMonth?colors.background:colors.text,textAlign: 'center'}]}>{day}</Text>
//               </View>




             
             
//             </View>
      
    
//   )
// }

// export default memo(MonthDay);


// const styles= StyleSheet.create({
//   dayBox: {
//     width: (width-48) / 7,
//     height: circleSize *1.48,
//     // justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor:'red',
   
   

//    marginLeft:23,
 
//     marginTop:16
   
//   },
//   dayText: {
//     fontSize: 12,
//     fontFamily: 'SFCompactRoundedBD',
//     lineHeight:10.8,
  
//     marginTop:4,
 
   
//   },
//   circle: {
//     width: circleSize,
//     height: circleSize,
//     borderRadius: circleSize / 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: circleSize * 0.05,
//   },

// })

import React, { useState, useRef ,useEffect,memo} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView ,TouchableOpacity,Alert} from 'react-native';
import EmotionSticker from '../EmotionSticker';
import { useDateContext } from '~/context/DataContext';
import {useNavigation} from 'expo-router'
import { useTheme } from '~/Theme/ThemeProvider';
const { width } = Dimensions.get('window');
const circleSize = width * 0.1104;
const MonthDay = ({setClickedDay,clickedDay,month,data,day,index,triggerAnimation ,letBoxDown}:any) => {

  const navigation = useNavigation();
  const {colors}=useTheme()
   const {dateF, newAData,setNewAData,dateWithLang ,monthF,setDateF,yearF,visible} = useDateContext();
  const [date,setDate]=useState<any>(`${yearF}-${monthF}-${day}`)
  const [item,setItem]=useState<any>(null)
  const [itemMonth,setItemMonth]=useState<any>(null)
  const [showIsBorder,setShowIsBorder]=useState(false)
const today=new Date()
const selectedDate=new Date(yearF,monthF-1,day)
const isDisabled=selectedDate>today


useEffect(()=>{
if(itemMonth !==monthF){
  letBoxDown(false)
  setClickedDay(null)
}


},[monthF])



useEffect(()=>{
  const dateS = day < 10 ? `0${day}` : day;
  const monthS = month < 10 ? `0${month}` : month;
  const date = `${yearF}-${monthS}-${dateS}`;
  if(data){
    const result = data.find((item:any) =>  item.date === date);

    setItem(result);
  }
},[data])

const saveData = (day: any) => {
  const dateS = day < 10 ? `0${day}` : day;
  const monthS = monthF < 10 ? `0${monthF}` : monthF;
  const date = `${yearF}-${monthS}-${dateS}`;
 
  if(isDisabled){
    Alert.alert('Alert', 'You cannot write future diary');
    return;
  
  }

  
 
  setDateF(date);
  return (navigation as any).navigate('details/[date]', { date, month: monthF });
};


const showDetailItem=(day:any)=>{
  setShowIsBorder(!showIsBorder)
  const dateS = day < 10 ? `0${day}` : day;
  const monthS = monthF < 10 ? `0${monthF}` : monthF;
  const itemDate =new Date(item?.date).getMonth()+1
  const date = `${yearF}-${monthS}-${dateS}`;

  if(item.emotion ===undefined){
    return (navigation as any).navigate('details/[date]', { date, month: monthF });
  }
  setNewAData(item)
  setItemMonth(itemDate)
  setDate(date)
  triggerAnimation(!visible);
 


if(date ===dateF){
letBoxDown(!visible)

setClickedDay((prevDay:any) => (prevDay === day ? null : day));


}else{
  setDateF(date)
  
  setClickedDay((prevDay:any) => (prevDay === day ? null : day));
  triggerAnimation(true);
 
  
}


}



  return (

            <View key={index} style={[styles.dayBox]}>
              {item !==undefined  ?(
                <TouchableOpacity 
                activeOpacity={1}
                style={[styles.circle, {
                  backgroundColor:item && item.emotion !== undefined? colors.inputBk:colors.inputWithoutEm,
                
                  borderWidth:clickedDay === day?2:0,
                  zIndex: clickedDay === day ?100:0,
                  borderColor: colors.text
                }]}
                onPress={()=>showDetailItem(day)}
                >
                  
                  {item?.emotion && <EmotionSticker size={25} emotion={item?.emotion} />}
                </TouchableOpacity>
              ):(
                <TouchableOpacity 
                onPress={()=>saveData(day)}
                activeOpacity={1}
                style={[styles.circle, {
                 
                  backgroundColor: colors.inputBk,
                  
                  borderWidth:clickedDay === day ?2:0,
                  zIndex:clickedDay === day ?100:0,
                  borderColor:colors.text
                }]}


                
                >
                  <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: colors.text, opacity: 0.1 }} />
                </TouchableOpacity>
              )}
              
              <View style={{marginTop:.1,backgroundColor:item && item.isToday?colors.text:colors.background,borderRadius:100,width:27,height:18,justifyContent:'center',alignItems:'center'}}>
               <Text style={[styles.dayText,{fontFamily:'SFCompactRoundedBD',color:item && item.isToday?colors.background:colors.text,textAlign: 'center'}]}>{day}</Text>
               </View>




             
             
            </View>
      
    
  )
}

export default memo(MonthDay);
const styles= StyleSheet.create({
  dayBox: {
    width: (width-48) / 7,
    height: circleSize *1.46,
    // justifyContent: 'center',
    alignItems: 'center',
   

   marginLeft:23,
 
    marginTop:16
   
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'SFCompactRoundedBD',
    color: '#333',

        lineHeight:10.8,
  
    marginTop:4,
 
   
  },
    circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: circleSize * 0.05,
  },

})