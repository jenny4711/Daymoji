import { Dimensions, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native';
const {width,height}=Dimensions.get('window')
import { useDateContext } from '~/context/DataContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';
import { HeaderL } from '~/utils/Icons';
const Header = ({day,headerTitle}:any) => {
  const {colors}=useTheme()
  const navigation = useNavigation<any>();
  // const {headerTitle}=useDateContext()
  console.log(day,'header')
  return (
    <View style={{flexDirection:'column',paddingTop:64,backgroundColor:colors.background,width:width-48}}>
    <View style={[styles.header]}>
    <Text style={[styles.headerText, { color: colors.text }]}>{headerTitle}</Text>
    <View style={{flexDirection:'row'}}>

  
    <TouchableOpacity onPress={() => (navigation as any).navigate('setting')}>
    <HeaderL color={colors.text}/>

    </TouchableOpacity>
    <TouchableOpacity style={{marginLeft:16}} onPress={() => (navigation as any).navigate('setting')}>
    <Octicons name="gear" size={16} color={colors.text} />
    </TouchableOpacity>
    </View>
</View>


{/* <View style={{flexDirection:'row',marginBottom:10,width:width-48,justifyContent:'space-around'}}>
<View style={{width:(width-48)/7,alignItems:'center'}}>
 <Text style={{color:colors.text,marginRight:11,fontFamily:'SFCompactRoundedBD',fontSize:12}}>M</Text>
 </View>
 
 <View style={{width:(width-48)/7}}>
 <Text style={{color:colors.text,marginLeft:15,fontFamily:'SFCompactRoundedBD',fontSize:12}} >T</Text>
 </View>

 <View style={{width:(width-48)/7}}>
 <Text style={{color:colors.text,marginLeft:15 ,fontFamily:'SFCompactRoundedBD',fontSize:12}} >W</Text>
 </View>

 
 <View style={{width:(width-48)/7}}>
 <Text style={{color:colors.text,marginLeft:19 ,fontFamily:'SFCompactRoundedBD' ,fontSize:12}} >T</Text>
 </View>

 <View style={{width:(width-48)/7}}>
 <Text style={{color:colors.text,marginLeft:21 ,fontFamily:'SFCompactRoundedBD' ,fontSize:12}} >F</Text>
 </View>


 <View style={{width:(width-48)/7}}>
 <Text style={{color:colors.text,marginLeft:23 ,fontFamily:'SFCompactRoundedBD' ,fontSize:12}} >S</Text>
 </View>

 
 <View style={{width:(width-48)/7}}>
 <Text style={{color:colors.text,marginLeft:24 ,fontFamily:'SFCompactRoundedBD' ,fontSize:12}} >S</Text>
 </View>
 






  </View> */}
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