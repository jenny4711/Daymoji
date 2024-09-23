import { View, Text ,SafeAreaView ,Dimensions,TouchableOpacity,StyleSheet} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useTheme } from '~/Theme/ThemeProvider';
import SelectionGroup from '~/components/setting/SelectionGroup';
import { useNavigation } from 'expo-router';
import { useDeletedAllData } from '~/hooks/useData';
import { useQueryClient } from '@tanstack/react-query';
import LogOutSec from '~/components/setting/LogOutSec';

const {width,height}=Dimensions.get('window')

const Setting = () => {
  const { dark, colors, setScheme } = useTheme();
  const [colorStyle,setColorStyle]=useState<any>(colors)
  const [themeMode,setThemeMode]=useState<string>( 'random')
  const [text,setText]=useState<string>(colorStyle.text)
  const [inputBk,setInputBk]=useState<string>( colorStyle.inputBk)
  const [background,setBackground]=useState<string>( colorStyle.background)
  const month:any ='7'
const deletedAllMutation=useDeletedAllData(month)
const queryClient = useQueryClient();
const navigation=useNavigation()
  useEffect(()=>{
    if(themeMode === 'light'){
      setScheme('light')
     
    }else if(themeMode ==='random'){
      setScheme('random',{
        primary:background,
        text:text,
        background:background,
        inputBk:inputBk
      })
      
    }else{
      setScheme('dark')
      
    }
   
  
    
  
  },[themeMode,text,inputBk,background])

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
