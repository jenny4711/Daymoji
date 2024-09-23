import { View, Text ,StyleSheet,Dimensions,SafeAreaView} from 'react-native'
import React from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from '@expo/vector-icons/Ionicons';
const{width,height}=Dimensions.get('window')


const Selection = ({arr,setChange,text,themeMode}:any) => {
  const { dark, colors, setScheme } = useTheme();




  return (
   <>
   <SelectDropdown
   dropdownOverlayColor="transparent" 
  
    data={arr?arr:[]}
    onSelect={(selectedItem, index) => {
    setChange(selectedItem.value)
    
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={[styles.dropdownButtonStyle,{backgroundColor:colors.inputBk}]}>
         
          <Text style={[styles.dropdownButtonTxtStyle,{color:colors.text,marginLeft:180}]}>
            {(selectedItem && selectedItem.title) || 'Select'}
          </Text>
          <Ionicons size={12} name={'chevron-expand-outline'} style={[styles.dropdownButtonArrowStyle,{color:colors.text}]} />

        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...( {backgroundColor: colors.background})}}>

<View style={{width: 15}}> 
    {isSelected ? <Ionicons name={'checkmark'} style={styles.dropdownItemIconStyle} color={colors.text}/> : null}
  </View>
         <Text style={[styles.dropdownItemTxtStyle,{color:colors.text}]}>{item.title}</Text>
         
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
   
      </>
  )
}

export default Selection

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: width-850,
    height: 50,
   
    borderRadius: 12,
    flexDirection: 'row',
    // justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 12,
   
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 13,
    fontWeight: '500',
    
  },
  dropdownButtonArrowStyle: {
    fontSize: 15,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    // marginRight: 8,
  },
  dropdownMenuStyle: {
    // backgroundColor:colors.text,
    borderRadius: 8,
    // width:400,
    
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
   
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 14,

    // marginRight: 8,
  },
});