import { View, Text ,TouchableOpacity,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
const {width,height}=Dimensions.get('window')
const FirstView = ({date,showDone,fnBtn}:any) => {

  const {colors,dark}=useTheme()
 console.log(showDone,'showDone')
  return (
    < >
     <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={{  flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{  color: colors.text, fontSize: 16, textAlign: 'center' ,fontFamily:'Nunito_700Bold'}}>{date}</Text>
        
      </View>

      <TouchableOpacity disabled={showDone?false:true} onPress={fnBtn} style={{position:'absolute',right:1}}>
          <Text style={{  color: colors.text, fontSize: 16,opacity:showDone?1:0.5 ,fontFamily:'Nunito_700Bold'}}>{'Done'}</Text>
        </TouchableOpacity>

    </View>
    {/* <View style={[styles.container,{backgroundColor:colors.background}]}>
    <View style={{justifyContent:'flex-end',width:width*.88,flexDirection:'row'}}>
      
      <Text style={{fontFamily:"SFCompactRoundedBD",color:colors.text,fontSize:16,textAlign:'center'}}>{date} </Text>
     
      <TouchableOpacity onPress={fnBtn}>
        <Text style={{fontFamily:"SFCompactRoundedBD",color:colors.text,fontSize:16,paddingLeft:64}}>{'Done'}</Text>
      </TouchableOpacity>
      </View> 
     
    </View> */}
    
    </>
  )
}

export default FirstView
const styles=StyleSheet.create({
  container: {
   
    justifyContent: 'center',
    flexDirection: 'row',
    width:width *.88,
    // width:width/1.35,
    // height:height/19,
     marginTop: 27,
    alignItems: 'center',
    // paddingHorizontal: 24,
   backgroundColor:'red',
    // paddingTop:24,
    
    
    
   
   
  }

})