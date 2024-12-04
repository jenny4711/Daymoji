import React, { useState, useRef ,useEffect,memo} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView ,TouchableOpacity,Alert,Pressable} from 'react-native';
import EmotionSticker from '../EmotionSticker';
import { useDateContext } from '~/context/DataContext';
import {useNavigation} from 'expo-router'
import * as Haptics from 'expo-haptics';
import { checkData } from '~/utils/utilsFn';
import { useTheme } from '~/Theme/ThemeProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');
 const circleSize =width * 0.1104;
//  const circleSize =width<376?width*0.1:width * 0.1104;
const MonthDay = ({setClickedDay,clickedDay,month,data,day,index,triggerAnimation ,letBoxDown}:any) => {
const navigation = useNavigation();
const {colors}=useTheme()
const {setDeletedItem,deletedItem,save,setSave,dateF, newAData,setNewAData,dateWithLang ,monthF,setDateF,yearF,visible,setReadyForShow,setPressedDone,pressedDone} = useDateContext();
const [date,setDate]=useState<any>(`${yearF}-${monthF}-${day}`)
const [item,setItem]=useState<any>(null)
const [itemMonth,setItemMonth]=useState<any>(null)
const [showIsBorder,setShowIsBorder]=useState(false)
const today=new Date()
const selectedDate=new Date(yearF,monthF-1,day)
const isDisabled=selectedDate>today
const check = checkData(item)

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
    setTimeout(()=>{
      setReadyForShow(true)
    },200)
   
    
  }
},[data])


const saveData =async (day: any) => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
  const dateS = day < 10 ? `0${day}` : day;
  const monthS = monthF < 10 ? `0${monthF}` : monthF;
  const date = `${yearF}-${monthS}-${dateS}`;
  const email=await AsyncStorage.getItem('email')

 setSave(false)

  if(isDisabled){
    Alert.alert('Alert', 'You cannot write future diary');
    return;
  
  }
  if(!email){
    return (navigation as any).navigate('authLogin')
  }
setNewAData(null)
  setClickedDay((prevDay:any) => (prevDay === day ? null : day));
  setDateF(date);
  return (navigation as any).navigate('details/[date]', { date, month: monthF });
};



const showDetailItem=(day:any)=>{
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
  setShowIsBorder(!showIsBorder)
  const check = checkData(item)

  const dateS = day < 10 ? `0${day}` : day;
  const monthS = monthF < 10 ? `0${monthF}` : monthF;
  const itemDate =new Date(item?.date).getMonth()+1
  const date = `${yearF}-${monthS}-${dateS}`;

  setClickedDay((prevDay:any) => (prevDay === day ? null : day));
  if(item.emotion ===undefined){
    return (navigation as any).navigate('details/[date]', { date, month: monthF });
  }
  setNewAData(item)
  setItemMonth(itemDate)
  setDate(date)

 

// && clickedDay !==null 넣어서 3번이상 클릭시 문제 해결10/30
if(date ===dateF && clickedDay !==null){
 
//  letBoxDown(!visible)
letBoxDown(false)

// setClickedDay((prevDay:any) => (prevDay === day ? null : day));


}else{
  (navigation as any).navigate('index')

// if(!check){
//   return (navigation as any).navigate('details/[date]', { date, month: monthF });
// }

  setDateF(date)
  console.log(deletedItem,'deletedItem@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
  // setClickedDay((prevDay:any) => (prevDay === day ? null : day));
  if(deletedItem){
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$')
    letBoxDown(!visible)
  }else{
    console.log('********************************')
    triggerAnimation(true);
  }

 
  
}

setDeletedItem(false)
}
// borderWidth:clickedDay === day && check && visible?2:0, visible 넣음 10/30(테스트 필요)

  return (

            <View key={index} style={[styles.dayBox]}>
              {item !==undefined && check?(
                <TouchableOpacity
                activeOpacity={1}
                delayPressIn={0}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} 
                style={[styles.circle, {
                   backgroundColor:colors.inputBk,
                
                  borderWidth:clickedDay === day && check && visible?2:0,
                  zIndex: clickedDay === day && check ?100:0,
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
                delayPressIn={0}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }} 
                style={[styles.circle, {
                  backgroundColor: colors.inputBk,
                  borderWidth:clickedDay  === day && check && visible ?2:0,
                  zIndex:clickedDay === day && check ?100:0,
                  borderColor:colors.text
                }]}


                
                >
                  <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2}} />
                </TouchableOpacity>
              )}
              
              <View style={{marginTop:.1,backgroundColor:item && item.isToday?colors.text:colors.background,borderRadius:100,width:27,height:18,justifyContent:'center',alignItems:'center'}}>
               <Text style={[styles.dayText,{fontFamily:'Nunito_700Bold',color:item && item.isToday?colors.background:colors.text,textAlign: 'center'}]}>{day}</Text>
               </View>




             
             
            </View>
      
    
  )
}

export default memo(MonthDay);


const styles= StyleSheet.create({
  dayBox: {
    width:width>376? (width-48) / 7: (width-24) / 7,
    height: circleSize *1.46,
    // justifyContent: 'center',
    alignItems: 'center',
   

   marginLeft:23,
 
    marginTop:16
   
  },
  dayText: {
    fontSize: 12,
    // fontFamily: 'SFCompactRoundedBD',
    color: '#333',

        lineHeight:12.8,
  
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