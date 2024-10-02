import { View, Text ,Dimensions} from 'react-native'
import React from 'react'
import ListModeItem from './ListModeItem'
import { useDateContext } from '~/context/DataContext'
import { useData } from '~/hooks/useData'
import { useTheme } from '~/Theme/ThemeProvider'
const {width}=Dimensions.get('window')
const ListMode = () => {

  const { monthF,dateF, newAData, dateWithLang ,visible,setVisible,headerTitle} = useDateContext();
  const {data}=useData(monthF)
  const {colors}=useTheme()
  console.log(data,'listMode-data')
  return (
    <View style={{backgroundColor:colors.background}}>
      {
        data?.map((item:any,idx:any)=>(
          <ListModeItem key={idx} item={item} />
        ))




      }
   
    </View>
  )
}

export default ListMode