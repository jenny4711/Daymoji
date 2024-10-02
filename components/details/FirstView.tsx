import { View, Text ,TouchableOpacity,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
const {width,height}=Dimensions.get('window')
const FirstView = ({date,showDone,fnBtn}:any) => {

  const {colors,dark}=useTheme()
 
  return (
    <View style={[styles.container,{backgroundColor:'red'}]}>
      
      <Text style={{fontFamily:"SFCompactRoundedBD",color:colors.text,fontSize:16}}>{date} </Text>
     
      <TouchableOpacity onPress={fnBtn}>
        <Text style={{fontFamily:"SFCompactRoundedBD",color:colors.text,fontSize:16,paddingLeft:63}}>{'Done'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FirstView
const styles=StyleSheet.create({
  container: {
   
    justifyContent: 'flex-end',
    flexDirection: 'row',
    width:width-48,
    // width:width/1.35,
    height:height/19,
    // marginTop: 16,
    alignItems: 'center',
    // paddingHorizontal: 24,
   
    // paddingTop:24,
    
    
    
   
   
  }

})