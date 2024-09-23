import { View, Text ,TouchableOpacity,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
const {width,height}=Dimensions.get('window')
const FirstView = ({date,showDone,fnBtn}:any) => {

  const {colors,dark}=useTheme()
 
  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <Text style={{fontFamily:"SFCompactRoundedBD",color:colors.text,fontSize:16}}>{date} </Text>
      <TouchableOpacity onPress={fnBtn}>
        <Text style={{fontFamily:"SFCompactRoundedSB",color:colors.text,fontSize:16}}>{'Done'}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FirstView
const styles=StyleSheet.create({
  container: {
   
    justifyContent: 'space-between',
    flexDirection: 'row',
    width:width/1.5,
    height:height/19,
    marginTop: 16,
    alignItems: 'flex-start',
    paddingHorizontal: 24,
   
    paddingTop:15,
    
    
    
   
   
  }

})