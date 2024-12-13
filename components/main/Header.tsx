import { Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React ,{useState,useEffect}from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native';
const {width,height}=Dimensions.get('window')
import { useDateContext } from '~/context/DataContext';
import Octicons from '@expo/vector-icons/Octicons';
import { Gear } from '~/utils/Icons';
import { HeaderL } from '~/utils/Icons';
const Header = ({day,showListMode,setShowListMode}:any) => {
  const {colors}=useTheme()
  const navigation = useNavigation<any>();
  const [showBtn,setShowBtn]=useState(false)
  const {headerTitle,isLoading,initialDisplay}=useDateContext()

  useEffect(()=>{
    if(!initialDisplay){
      setShowBtn(true)
    }
  },[initialDisplay])
 
  return (
  <View style={{flexDirection:'column',marginTop:64}}>
 {!isLoading &&   <View style={[styles.header,{marginBottom:40}]}>
    <Text style={[styles.headerText, { color: colors.text, fontFamily:'Nunito_700Bold'}]}>{headerTitle}</Text>
    <View style={[!showBtn?{opacity:0}:{flexDirection:'row',opacity:1,alignItems:'center'}]}>

  
    {/* <TouchableOpacity style={{paddingTop:showListMode?0:9,marginRight:showListMode?5:0,paddingRight:8,height:24,justifyContent:'center'}} onPress={() => setShowListMode(!showListMode)}>
      {showListMode?
      <Octicons name="calendar" size={24} color={colors.text} />
      :
      <HeaderL size={24} color={colors.text}/>
    }
   

    </TouchableOpacity> */}
    <TouchableOpacity style={{marginTop:showListMode?0:0,marginRight:showListMode?0:0,paddingRight:8}} activeOpacity={1}   delayPressIn={0}  hitSlop={{top:15,bottom:15,left:15,right:15}}  onPress={() => (navigation as any).navigate('setting')}>
    {/* <Octicons name="gear" size={24} color={colors.text} /> */}
    <Gear size={24} color={colors.text}/>
    </TouchableOpacity>
    </View>
</View>}

  </View>
  )
}

export default Header
const styles=StyleSheet.create({
  headerText: {
    fontSize: 20,

    // marginBottom:50
  },
  header: {
    width: width-48,
    flexDirection: 'row',
    justifyContent: 'space-between',
   

  
    
  },
})