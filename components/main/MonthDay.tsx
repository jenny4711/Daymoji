
import React, { useState, useRef ,useEffect,memo} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView ,TouchableOpacity,Alert,Pressable} from 'react-native';
import EmotionSticker from '../EmotionSticker';
import { useDateContext } from '~/context/DataContext';
import {useNavigation} from 'expo-router'
import * as Haptics from 'expo-haptics';



import { useTheme } from '~/Theme/ThemeProvider';
const { width } = Dimensions.get('window');
const circleSize = width * 0.1104;
const MonthDay = ({setClickedDay,clickedDay,month,data,day,index,triggerAnimation ,letBoxDown}:any) => {

  const navigation = useNavigation();
  const {colors}=useTheme()
   const {dateF, newAData,setNewAData,dateWithLang ,monthF,setDateF,yearF,visible,setIsLoading,isLoading} = useDateContext();
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
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
  const dateS = day < 10 ? `0${day}` : day;
  const monthS = monthF < 10 ? `0${monthF}` : monthF;
  const date = `${yearF}-${monthS}-${dateS}`;
 
  if(isDisabled){
    Alert.alert('Alert', 'You cannot write future diary');
    return;
  
  }

  setClickedDay((prevDay:any) => (prevDay === day ? null : day));

  setDateF(date);
  return (navigation as any).navigate('details/[date]', { date, month: monthF });
};


const showDetailItem=(day:any)=>{
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
  setShowIsBorder(!showIsBorder)
  const dateS = day < 10 ? `0${day}` : day;
  const monthS = monthF < 10 ? `0${monthF}` : monthF;
  const itemDate =new Date(item?.date).getMonth()+1
  const date = `${yearF}-${monthS}-${dateS}`;
  const checkEmotion = item?.emotion === undefined || item?.emotion === '';
  const checkStory = item?.story === undefined || item?.story === '';
  const checkPhoto = item?.photo?.length === 0 || item?.photo === undefined;

  if(checkEmotion && checkStory &&checkPhoto){
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
                delayPressIn={0}
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
                <Pressable
                onPress={()=>saveData(day)}
                // activeOpacity={1}
                // delayPressIn={0}
                style={[styles.circle, {
                 
                  backgroundColor: colors.inputBk,
                  
                  borderWidth:clickedDay === day ?2:0,
                  zIndex:clickedDay === day ?100:0,
                  borderColor:colors.text
                }]}


                
                >
                  <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: colors.text, opacity: 0.1 }} />
                </Pressable>
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