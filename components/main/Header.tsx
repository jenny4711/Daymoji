import { Dimensions, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native';
const {width,height}=Dimensions.get('window')
import { useDateContext } from '~/context/DataContext';
import Octicons from '@expo/vector-icons/Octicons';
import { HeaderL } from '~/utils/Icons';
const Header = ({day,showListMode,setShowListMode}:any) => {
  const {colors}=useTheme()
  const navigation = useNavigation<any>();
  const {headerTitle}=useDateContext()
 
  return (
    <View style={{flexDirection:'column',marginTop:64}}>
    <View style={[styles.header,{marginBottom:40}]}>
    <Text style={[styles.headerText, { color: colors.text }]}>{headerTitle}</Text>
    <View style={{flexDirection:'row'}}>

  
    <TouchableOpacity onPress={() => setShowListMode(!showListMode)}>
      {showListMode?
      <Octicons name="calendar" size={16} color="black" />
      :
      <HeaderL color={colors.text}/>
    }
   

    </TouchableOpacity>
    <TouchableOpacity style={{marginLeft:16}} onPress={() => (navigation as any).navigate('setting')}>
    <Octicons name="gear" size={16} color={colors.text} />
    </TouchableOpacity>
    </View>
</View>

  </View>
  )
}

export default Header
const styles=StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontFamily: "SFCompactRoundedBD",
    // marginBottom:50
  },
  header: {
    width: width-48,
    flexDirection: 'row',
    justifyContent: 'space-between',
   

  
    
  },
})