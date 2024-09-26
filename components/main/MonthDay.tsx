import React, { useState, useRef ,useEffect,memo} from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView ,TouchableOpacity,Alert} from 'react-native';
import EmotionSticker from '../EmotionSticker';
import { useDateContext } from '~/context/DataContext';
import {useNavigation} from 'expo-router'
import { useTheme } from '~/Theme/ThemeProvider';
const { width } = Dimensions.get('window');
const circleSize = width * 0.1104;
const MonthDay = ({monthDaysArr,month,data,day,index,triggerAnimation ,letBoxDown}:any) => {

  const navigation = useNavigation();
  const {colors}=useTheme()
  const {dateF, newAData,setNewAData,dateWithLang ,monthF,setDateF,yearF} = useDateContext();
  const [date,setDate]=useState<any>(`${yearF}-${monthF}-${day}`)
  const [item,setItem]=useState<any>(null)
const today=new Date()
const selectedDate=new Date(yearF,monthF-1,day)
const isDisabled=selectedDate>today



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
  const dateS = day < 10 ? `0${day}` : day;
  const monthS = monthF < 10 ? `0${monthF}` : monthF;
  
  const date = `${yearF}-${monthS}-${dateS}`;
  setNewAData(item)
  letBoxDown(true)
  setDate(date)
 console.log(dateF,'date')

if(isDisabled){
  Alert.alert('Alert', 'You cannot write future diary');
  return;

}
triggerAnimation(true);








triggerAnimation(true);
}


  return (

            <View key={index} style={[styles.dayBox]}>
              {item !==undefined?(
                <TouchableOpacity 
                activeOpacity={1}
                style={{
                  width: circleSize,
                  height: circleSize,
                  borderRadius: circleSize / 2,
                  backgroundColor: colors.inputBk,
                  alignItems: 'center',
                  marginBottom: circleSize * 0.05,
                  justifyContent: 'center',
                }}
                onPress={()=>showDetailItem(day)}
                >
                  
                  {item?.emotion && <EmotionSticker size={25} emotion={item?.emotion} />}
                </TouchableOpacity>
              ):(
                <TouchableOpacity 
                onPress={()=>saveData(day)}


                
                >
                  <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: colors.text, opacity: 0.1 }} />
                </TouchableOpacity>
              )}
              
              <Text style={[styles.dayText,{fontFamily:'SFCompactRoundedBD',color:colors.text,opacity:isDisabled?0.5:1}]}>{day}</Text>




             
             
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

    marginTop:4.64,
 
   
  },

})