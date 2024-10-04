import { View, Text ,SafeAreaView ,Dimensions,TouchableOpacity,StyleSheet} from 'react-native'
import React ,{useEffect,useState}from 'react'

import { useTheme } from '~/Theme/ThemeProvider';
import SelectionGroup from '~/components/setting/SelectionGroup';
import { useNavigation } from 'expo-router';
import { useDeletedAllData } from '~/hooks/useData';
import { useQueryClient } from '@tanstack/react-query';
import LogOutSec from '~/components/setting/LogOutSec';
import { useColorScheme } from 'react-native';
const {width,height}=Dimensions.get('window')

const Setting = () => {
  const { dark, colors, setScheme } = useTheme();
  const [colorStyle,setColorStyle]=useState<any>(colors)
  const [themeMode,setThemeMode]=useState<string>( 'auto')
  const [text,setText]=useState<string>(colorStyle.text)
  const [inputBk,setInputBk]=useState<string>( colorStyle.inputBk)
  const [background,setBackground]=useState<string>( colorStyle.background)
  const colorScheme:any = useColorScheme(); 
  const month:any ='7'
const deletedAllMutation=useDeletedAllData(month)
const queryClient = useQueryClient();
useEffect(()=>{
  const currentTime = new Date();
  const hours = currentTime.getHours();
  console.log(hours, 'hours');
},[])

const checkTimeForTheme = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  console.log(hours, 'hours');

  if (hours >= 6 && hours < 18) {
    setScheme('light'); // 오전 6시부터 오후 6시까지는 light mode
  } else {
    setScheme('dark'); // 오후 6시부터 오전 6시까지는 dark mode
  }
};



const navigation=useNavigation()
useEffect(() => {
  // themeMode가 'auto'일 경우 시스템 테마에 따라 자동으로 설정
  if (themeMode === 'auto') {
    checkTimeForTheme();  // 시스템 테마에 맞추어 자동으로 설정
  } else if (themeMode === 'light') {
    setScheme('light');
  } else if (themeMode === 'random') {
    setScheme('random', {
      primary: background,
      text: text,
      background: background,
      inputBk: inputBk
    });
  } else {
    setScheme('dark');
  }
}, [themeMode, text, inputBk, background, colorScheme]); //

const handleAlldeletedList = () => {
  deletedAllMutation.mutate(month)
  queryClient.invalidateQueries({ queryKey: ['data'] });
  
 
}


  return (
    <SafeAreaView style={[{backgroundColor:colors.background},{width:width, justifyContent:'flex-start',alignItems:'center',height:height}]}>
    <View style={{marginTop:40}}>
    
    <Text style={{color:colors.text,marginLeft:10,marginBottom:10,fontWeight:'700',opacity:0.5}}>STYLE</Text>
<SelectionGroup 
themeMode={themeMode} 
text={text} 
background={background} 
inputBk={inputBk}
setThemeMode={setThemeMode}
setText={setText}
setBackground={setBackground}
setInputBk={setInputBk}


/>
</View>

<View style={{justifyContent:'flex-start',backgroundColor:colors.background,marginTop:10}} >
<Text style={{color:colors.text,marginLeft:10,marginBottom:10,fontWeight:'700',opacity:0.5}}>STORAGE</Text>
<TouchableOpacity style={[styles.container,{backgroundColor:colors.inputBk}]} onPress={()=>handleAlldeletedList()}>
  <Text style={{color:colors.text}}>Delete All Entries</Text>
</TouchableOpacity>
</View>
<View style={{justifyContent:'flex-start',backgroundColor:colors.background,marginTop:10}} >
<Text style={{color:colors.text,marginLeft:10,marginBottom:10,fontWeight:'700',opacity:0.5}}>Account</Text>
<LogOutSec/>
</View>

  </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',
    width:width-48,
    justifyContent:"flex-start",
    alignItems:'center',
    paddingHorizontal:14,
    borderRadius:5,height:50,
    borderBottomWidth:0.2,
    borderBottomColor:'gray',
    
  }
})
