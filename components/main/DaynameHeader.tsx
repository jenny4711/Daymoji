import { Dimensions, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import { useNavigation } from '@react-navigation/native';
const {width,height}=Dimensions.get('window')
import { useDateContext } from '~/context/DataContext';
import AntDesign from '@expo/vector-icons/AntDesign';

const DaynameHeader = () => {
  const {colors}=useTheme()
  return (
    <View style={{flexDirection:'row',marginBottom:10,width:width-48,justifyContent:'space-around',marginTop:30}}>
    <View style={{width:(width-48)/7,alignItems:'center'}}>
     <Text style={{color:colors.text,marginRight:11,fontSize:12}}>M</Text>
     </View>
     
     <View style={{width:(width-48)/7}}>
     <Text style={{color:colors.text,marginLeft:15,fontSize:12}} >T</Text>
     </View>
    
     <View style={{width:(width-48)/7}}>
     <Text style={{color:colors.text,marginLeft:15 ,fontSize:12}} >W</Text>
     </View>
    
     
     <View style={{width:(width-48)/7}}>
     <Text style={{color:colors.text,marginLeft:19 ,fontSize:12}} >T</Text>
     </View>
    
     <View style={{width:(width-48)/7}}>
     <Text style={{color:colors.text,marginLeft:21 ,fontSize:12}} >F</Text>
     </View>
    
    
     <View style={{width:(width-48)/7}}>
     <Text style={{color:colors.text,marginLeft:23 ,fontSize:12}} >S</Text>
     </View>
    
     
     <View style={{width:(width-48)/7}}>
     <Text style={{color:colors.text,marginLeft:24 ,fontSize:12}} >S</Text>
     </View>
     
    
    
    
    
    
    
      </View>
  )
}

export default DaynameHeader
