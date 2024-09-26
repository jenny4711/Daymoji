import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions } from 'react-native';
import EmotionSticker from '../EmotionSticker';
import { useDateContext } from '~/context/DataContext';
import { useTheme } from '~/Theme/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import { useData } from '~/hooks/useData';

const { width, height } = Dimensions.get('window'); // 화면의 너비와 높이 가져오기

const RenderDay = ({ day, month, triggerAnimation, letBoxDown ,data}: any) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { dateF, setDateF, setNewAData, setOrgDate } = useDateContext();
  // const { data } = useData(day.month);
  const [defaultDate, setDefaultDate] = useState('');
  const isCurrentMonth = day.month === month;
  const isAfterCurrentDay = new Date(day.dateString) > new Date();
  const isSelectedDate = day.dateString === dateF;
  const isDefaultDate = day.dateString === defaultDate;
  const selected = !dateF ? isDefaultDate : isSelectedDate;
  const newDate = new Date(day.year, day.month - 1, day.day);


  useEffect(()=>{
    const selectedDate=new Date (dateF)
    const currMonth=selectedDate.getMonth()+1
    if(currMonth!==month){
      letBoxDown(false)
    }
   
  },[])

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
    const newDate = new Date(day.year, day.month - 1, day.day);
    setOrgDate(newDate);

    if (selectedDate > today) {
      Alert.alert('Alert', 'You cannot write future diary');
      return;
    }

    triggerAnimation(true);

    if (dateKey === dateF) {
      letBoxDown(false);
    } else {
      setDateF(dateKey);
      triggerAnimation(true);
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

  const isDisabled = useMemo(() => !isCurrentMonth || isAfterCurrentDay, []);
  const entry = useMemo(() => {
    const dateKey = day.dateString;
    console.log(dateKey,'dateKey')
    console.log(data,'data')

    return data ? data.find((item: any) => item.date === dateKey) : null;
  }, [day.dateString, data]);

  const emotion = entry?.emotion || null;

  if (!day) return null;

  // 화면 너비 비율에 맞춘 크기 계산
  const circleSize = width * 0.1104; // 화면 너비의 10%를 원 크기로 설정

  return (
    <View style={{ width: circleSize, height: circleSize * 1.46, alignItems: 'center', backgroundColor: colors.background }}>
      {emotion && isCurrentMonth ? (
        <TouchableOpacity
          activeOpacity={1}
           onPress={isCurrentMonth ? handleBtn : () => console.log('none')}
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: colors.inputBk,
            alignItems: 'center',
            marginBottom: circleSize * 0.05,
            justifyContent: 'center',
          }}
        >
          <EmotionSticker emotion={emotion} size={circleSize * 0.55} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
           onPress={isCurrentMonth ? handleBtn : () => console.log('none')}
          style={{
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            backgroundColor: colors.inputBk,
            alignItems: 'center',
            marginBottom: circleSize * 0.05,
          }}
        >
          <View style={{ width: circleSize, height: circleSize, borderRadius: circleSize / 2, backgroundColor: colors.text, opacity: 0.1 }} />
        </TouchableOpacity>
      )}

      <Text style={{ fontFamily: 'SFCompactRoundedBD', color: colors.text, fontSize: circleSize * 0.27, opacity: isDisabled ? 0.5 : 1 }}>
        {day.day}
      </Text>
    </View>
  );
};

export default RenderDay;




