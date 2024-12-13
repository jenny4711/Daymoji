import { View, Text ,Dimensions} from 'react-native'
import React,{useEffect,useState} from 'react'
import ListModeItem from './ListModeItem'
import { useDateContext } from '~/context/DataContext'
import { useData } from '~/hooks/useData'
import { useTheme } from '~/Theme/ThemeProvider'
import { checkData } from '~/utils/utilsFn'
import NoData from './NoData'
const {width,height}=Dimensions.get('window')
const ListMode = () => {

  

  const { monthF,dateF, newAData, dateWithLang ,visible,setVisible,headerTitle} = useDateContext();
  const [filteredData,setFilteredData]=useState<any>([])
  const [havingData,setHavingData]=useState(false)
  const {data}:any=useData(monthF)
  const {colors}=useTheme()

  useEffect(()=>{
 
    if(data){
      const result = data.filter((item:any) => checkData(item));
      console.log(result.length,'result')
      
      setFilteredData(result)
    }
  },[data])
  






  return (
    <View style={{flex:1,backgroundColor:colors.background,height:filteredData.length>0?null:545}}>
      
      {
        filteredData.length===0?<NoData />:
        filteredData?.map((item:any,idx:any)=>(
          <ListModeItem key={idx} item={item} />
        ))

      }
   
    </View>
  )
}

export default ListMode