import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert ,Dimensions} from 'react-native';
import EmotionSticker from '../EmotionSticker';
import { useDateContext } from '~/context/DataContext';
import { useTheme } from '~/Theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { useData } from '~/hooks/useData';
import { ScaledSheet,scale, verticalScale, moderateScale } from 'react-native-size-matters';
const RenderDay = ({day,month,triggerAnimation,letBoxDown}:any) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { dateF, setDateF, setNewAData, setOrgDate } = useDateContext();
  const { data } = useData(day.month);
  const [defaultDate, setDefaultDate] = useState('');
  const isCurrentMonth = day.month === month;
  const isAfterCurrentDay = new Date(day.dateString) > new Date();
  const isSelectedDate = day.dateString === dateF;
  const isDefaultDate = day.dateString === defaultDate;
  const selected = !dateF ? isDefaultDate : isSelectedDate;
  const newDate = new Date(day.year,day.month-1,day.day)

  useEffect(() => {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayYear = today.getFullYear();
    const todayDate = today.getDate();
    setDefaultDate(`${todayYear}-${todayMonth < 10 ? '0' : ''}${todayMonth}-${todayDate < 10 ? '0' : ''}${todayDate}`);
  }, []);


  const handleBtn = useCallback(async () => {
    const dateKey = day.dateString;
    const today = new Date();
    const selectedDate = new Date(dateKey);
    const newDate = new Date(day.year,day.month-1,day.day)
   setOrgDate(newDate)

    if (selectedDate > today) {
      Alert.alert('Alert', 'You cannot write future diary');
      return;
    }

    // 애니메이션 트리거
     triggerAnimation(true);

    if (dateKey === dateF ) {
      letBoxDown(false)
       //triggerAnimation(false); // 같은 날짜를 다시 클릭하면 닫기
    } else {
      setDateF(dateKey);
      triggerAnimation(true); // 새로운 날짜 클릭 시 열기
    }

    if (data) {
      const foundItem = data.find((item: any) => item.date === dateKey);
      setNewAData(foundItem);

      if (!foundItem) {
        triggerAnimation(false);
        (navigation as any).navigate('details/[date]', { date: dateKey, month: day.month || '' });
      }
    }
  }, [day, data, dateF, setDateF, setNewAData, triggerAnimation]);
  const isDisabled=useMemo(()=>!isCurrentMonth || isAfterCurrentDay,[])
  const entry = useMemo(() => {
    const dateKey = day.dateString;
    return data ? data.find((item: any) => item.date === dateKey) : null;
  }, [day.dateString, data]);

  const emotion = entry?.emotion || null;

  if (!day) return null;



  return (
   
      
    <View style={{width:44,height:60,alignItems:'center'}}>
      {emotion && isCurrentMonth ?
    <TouchableOpacity activeOpacity={1} onPress={isCurrentMonth ? handleBtn : () => console.log('none')} style={{width:43.39,height:43.39,borderRadius:100,backgroundColor:colors.inputBk,alignItems:'center',marginBottom:1.63,justifyContent:'center'}}>
      <EmotionSticker emotion={emotion} size={24} />
    </TouchableOpacity>:
     <TouchableOpacity activeOpacity={1} onPress={isCurrentMonth ? handleBtn : () => console.log('none')} style={{width:43.39,height:43.39,borderRadius:100,backgroundColor:colors.inputBk,alignItems:'center',marginBottom:1.63}}>
              <View style={ { width: 43.38, height: 43.38, borderRadius: 100, backgroundColor: colors.text, opacity: 0.1 }} />
   </TouchableOpacity>
}

  

<Text style={{ fontFamily: "SFCompactRoundedBD", color: colors.text, fontSize: 12, opacity: isDisabled ? 0.5 : 1 }}>
  {day.day}
</Text>
</View>

  )
}

export default RenderDay