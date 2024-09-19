import { View, Text ,Dimensions} from 'react-native'
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
const {width,height}=Dimensions.get('window')
const Logo = () => {
  const {colors,dark}=useTheme()  
  return (
    // <View style={{width:width-256,height:height-713,flexDirection:'column'}}>
    <View style={{width:width-256,height:height-713,flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <View style={{height:40,flexDirection:'row'}}>
        <View style={{width:40,height:40,borderRadius:100,opacity:0.1,backgroundColor:colors.text}}/>
        <View style={{width:40,height:40,borderRadius:100,opacity:0.1,backgroundColor:colors.text,marginHorizontal:8}}/>
        <View style={{width:40,height:40,borderRadius:100,opacity:0.1,backgroundColor:colors.text}}/>
      </View>
      <View style={{height:40,flexDirection:'row',marginVertical:8}}>
      <View style={{width:40,height:40,borderRadius:100,opacity:0.1,backgroundColor:colors.text}}/>
        <View style={{width:40,height:40,borderRadius:100,backgroundColor:colors.text,marginHorizontal:8,}}/>
        <View style={{width:40,height:40,borderRadius:100,opacity:0.1,backgroundColor:colors.text}}/>
      </View>
      <View style={{height:40,flexDirection:'row'}}>
      <View style={{width:40,height:40,borderRadius:100,opacity:0.1,backgroundColor:colors.text}}/>
        <View style={{width:40,height:40,borderRadius:100,backgroundColor:colors.text,marginHorizontal:8,opacity:0.1}}/>
        <View style={{width:40,height:40,borderRadius:100,opacity:0.1,backgroundColor:colors.text}}/>
      </View>
            
    </View>
  )
}

export default Logo