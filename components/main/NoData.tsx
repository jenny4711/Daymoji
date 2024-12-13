import { View, Text ,Dimensions} from 'react-native'
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
const {width,height}=Dimensions.get('window')
const NoData = () => {
  const {colors}=useTheme()
  return (
    <View style={{backgroundColor:colors.inputBk,height:'20%',width:width-48,borderRadius:24,alignItems:'center',justifyContent:'center'}}>
      <Text style={{fontFamily:'Nunito_700Bold',color:colors.inputWithoutEm,fontSize:20}}>No Recored</Text>
    </View>
  )
}

export default NoData