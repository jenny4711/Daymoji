import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import Selection from './Selection'
import { Dimensions } from 'react-native'
import { useTheme } from '~/Theme/ThemeProvider'
import { BackgroundArray,InputBkArray,ThemeArray,ColorsArray } from '~/utils/selectionArray'

const {width,height}=Dimensions.get('window')

const SelectionGroup = ({themeMode,text,background,inputBk,setThemeMode,setText,setBackground,setInputBk}:any) => {
  const { dark, colors, setScheme } = useTheme();
  return (
    <>
    {/* <View style={[{backgroundColor:colors.inputBk},styles.selectionView]}>
      <Text style={{color:colors.text}}>Theme</Text>
    <SwitchBtn themeMode={themeMode} setThemeMode={setThemeMode}/>
    </View> */}

    <View style={[{backgroundColor:colors.inputBk},styles.selectionView]}>
      <Text style={{color:colors.text}}>Theme</Text>
    <Selection arr={ThemeArray} text={themeMode} setChange={setThemeMode} themeMode={themeMode}/>
    </View>
      
    {/* <View style={[{backgroundColor:colors.inputBk},styles.selectionView]}>
      <Text style={{color:colors.text}}>Color</Text>
    <Selection arr={ColorsArray} text={text} setChange={setText} themeMode={themeMode}/>
    </View> */}

    {/* <View style={[{backgroundColor:colors.inputBk},styles.selectionView]}>
      <Text style={{color:colors.text}}>Background</Text>
    <Selection arr={BackgroundArray} text={background} setChange={setBackground} themeMode={themeMode} />
    </View> */}

    {/* <View style={[{backgroundColor:colors.inputBk},styles.selectionView]}>
      <Text style={{color:colors.text}}>Form</Text>
    <Selection arr={InputBkArray} text={inputBk} setChange={setInputBk} themeMode={themeMode}/>
    </View> */}
    </>
  )
}

export default SelectionGroup
const styles = StyleSheet.create({
  selectionView: {
    flexDirection:'row',
    width:width-48,
    justifyContent:"space-between",
    alignItems:'center',
    paddingHorizontal:14,
    borderRadius:5,height:50,
    borderBottomWidth:0.2,
    borderBottomColor:'gray'}
  
})