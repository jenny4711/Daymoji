import { View, Text ,SafeAreaView ,Dimensions,TouchableOpacity,StyleSheet,Linking,Alert} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { ThemeArray } from '~/utils/selectionArray';
import { useTheme } from '~/Theme/ThemeProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
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
  const [inputBk2,setInputBk2]=useState<string>( colorStyle.inputBk2)
  const [inputWithoutEm,setInputWithoutEm]=useState<string>( colorStyle.inputWithoutEm)
  const [background,setBackground]=useState<string>( colorStyle.background)
  const colorScheme:any = useColorScheme(); 
  const month:any ='7'
const deletedAllMutation=useDeletedAllData(month)
const queryClient = useQueryClient();
useEffect(()=>{
  const currentTime = new Date();
  const hours = currentTime.getHours();
  
},[])

const checkTimeForTheme = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();


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
      inputBk: inputBk,
      inputBk2:inputBk2,
      inputWithoutEm:inputWithoutEm
    });
  } else {
    setScheme('dark');
  }
}, [themeMode, text, inputBk, background, colorScheme]); //

const handleAlldeletedList = () => {
  Alert.alert('Delete All Entries', 'Are you sure you want to delete all entries? This action cannot be undone', [
    {
      text: 'Cancel',
      onPress: () => console.log('Ask me later pressed'),
    },
    
    {text: 'Delete',style:'destructive',onPress: () =>{
      
     deletedAllMutation.mutate(month)
  queryClient.invalidateQueries({ queryKey: ['data'] });  
    }
    },
  ])
  // ;Alert.alert('Delete All Entries', 'Are you sure you want to delete all entries? This action cannot be undone', [
  //   {
  //     text: 'Ask me later',
  //     onPress: () => console.log('Ask me later pressed'),
  //   },
   
  //   {text: 'OK', onPress: () => console.log('OK Pressed')},
  // ]);Alert.alert('Delete All Entries', 'Are you sure you want to delete all entries? This action cannot be undone', [
  //   {
  //     text: 'Ask me later',
  //     onPress: () => console.log('Ask me later pressed'),
  //   },
   
  //   {text: 'OK', onPress: () => console.log('OK Pressed')},
  // ]);





  // deletedAllMutation.mutate(month)
  // queryClient.invalidateQueries({ queryKey: ['data'] });
  
 
}

const openPolicy =async () => {
  const url = 'https://daymoji.com/privacy'; // 열고자 하는 URL
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
   console.log(`Don't know how to open this URL: ${url}`);
  }
  
}

const openService =async () => {
  const url = 'https://daymoji.com/terms'; // 열고자 하는 URL
  const supported = await Linking.canOpenURL(url);
  if (supported) {
    await Linking.openURL(url);
  } else {
   console.log(`Don't know how to open this URL: ${url}`);
  }
  
}



const goToMainPage = () => {
  (navigation as any).navigate('main');
}


  return (
    <SafeAreaView style={[{backgroundColor:colors.background,flex:1},{width:width, justifyContent:'flex-start',alignItems:'center',height:height}]}>
      {/* //--------------------------title---------------- */}
<View style={[styles.titleView]}>
  <Text style={[styles.TextStyle,{color:colors.text}]}> Settings</Text>
  <TouchableOpacity activeOpacity={1} onPress={goToMainPage} style={{position:'absolute',right:1}}>
    <Text style={[styles.TextStyle,{color:colors.text}]}>Done</Text>
  </TouchableOpacity>
</View>
{/* //-------------------------style------------------------- */}
<View style={[styles.eachView]}>
  <Text style={[styles.TextStyle,{color:colors.text,marginBottom:16}]}>Style</Text>
  <View style={{backgroundColor:colors.inputBk2,width:width-48,alignItems:'center',paddingVertical:12 ,borderRadius:24}}>
{
  ThemeArray.map((item:any,index:any)=>(
    <TouchableOpacity key={index} activeOpacity={1} onPress={()=>setThemeMode(item.value)} style={{width:width-96,flexDirection:'row',justifyContent:'space-between',paddingVertical:12,alignItems:'center'}}>
      <Text style={[styles.TextStyle,{color:colors.text}]}>{item.title}</Text>
      {themeMode === item.value?<Ionicons name={'checkmark'} size={16} color={colors.text}/>:null}
      {/* <Text style={{color:colors.text}}>{themeMode === item.value?'x':''}</Text> */}

    </TouchableOpacity>
  ))
}
  </View>

</View>
{/* //------------------------------account---------------------------------------------------- */}
<View style={[styles.eachView,{marginVertical:24}]}>
  <Text style={[styles.TextStyle,{color:colors.text,marginBottom:16}]}>Account</Text>
  <TouchableOpacity activeOpacity={1} onPress={handleAlldeletedList} style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width-48,backgroundColor:colors.inputBk2,borderRadius:24}}>
    <Text style={[styles.TextStyle,{color:'red'}]}>Delete all entries</Text>
  </TouchableOpacity>

  <LogOutSec/>
</View>


{/* -------------------------Legal------------------------------- */}
<View style={[styles.eachView]}>
<Text style={[styles.TextStyle,{color:colors.text,marginBottom:16}]}>Legal</Text>
  <TouchableOpacity onPress={openPolicy} activeOpacity={1}  style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width-48,backgroundColor:colors.inputBk2,borderRadius:24}}>
    <Text style={[styles.TextStyle,{color:colors.text}]}>Privacy Policy</Text>
  </TouchableOpacity>
  <TouchableOpacity activeOpacity={1} onPress={openService} style={{justifyContent:'center',alignItems:'center',paddingVertical:24,width:width-48,backgroundColor:colors.inputBk2,borderRadius:24,marginTop:16}}>
    <Text style={[styles.TextStyle,{color:colors.text}]}>Terms of Use</Text>
  </TouchableOpacity>

</View>

  </SafeAreaView>
  )
}

export default Setting

const styles = StyleSheet.create({
  titleView: {
    flexDirection:'row',
    width:width-48,
    
    justifyContent:'center',
    marginVertical:24
  },
 TextStyle:{
  fontSize:16,
  fontFamily:"SFCompactRoundedBD",
  lineHeight:19.09
 },
 eachView:{
flexDirection:'column',
width:width-48,
alignItems:'flex-start'
 }
})
