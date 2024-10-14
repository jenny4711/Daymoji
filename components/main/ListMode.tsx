import { View, Text ,Dimensions} from 'react-native'
import React,{useEffect,useState} from 'react'
import ListModeItem from './ListModeItem'
import { useDateContext } from '~/context/DataContext'
import { useData } from '~/hooks/useData'
import { useTheme } from '~/Theme/ThemeProvider'
import { checkData } from '~/utils/utilsFn'
const {width}=Dimensions.get('window')
const ListMode = () => {

  

  const { monthF,dateF, newAData, dateWithLang ,visible,setVisible,headerTitle} = useDateContext();
  const [filteredData,setFilteredData]=useState<any>([])
  const {data}=useData(monthF)
  const {colors}=useTheme()

  useEffect(()=>{
    if(data){
      const result = data.filter((item:any) => checkData(item));
    
      setFilteredData(result)
    }
  },[data])
  






  return (
    <View style={{backgroundColor:colors.background}}>
      {
        filteredData?.map((item:any,idx:any)=>(
          <ListModeItem key={idx} item={item} />
        ))

      }
   
    </View>
  )
}

export default ListMode