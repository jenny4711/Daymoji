
import Head from 'expo-router/head'
import { View, Text ,Alert,SafeAreaView} from 'react-native'
import React ,{useState,useEffect,useCallback}from 'react'
import FirstView from '~/components/details/FirstView'
import { useData ,useSaveData,useDeletedData} from '~/hooks/useData'
import { useDateContext } from '~/context/DataContext'
import NewForm from '~/components/details/NewForm'
import { useLocalSearchParams ,useNavigation,useFocusEffect} from 'expo-router'
import { useTheme } from '~/Theme/ThemeProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShowDetail from '~/components/details/ShowDetail'
import { useQueryClient } from '@tanstack/react-query';
import { Image } from 'expo-image'
export async function generateStaticParams():Promise<Record<string,string>[]>{
return [
  {date:'2022-01-01'},
  {date:'2022-01-02'},
  {date:'2022-01-03'},
  {date:'2022-01-04'},
]
}
const Detail = () => {
  const { date, month }: any = useLocalSearchParams();
  const { dateF, newAData, dateWithLang ,visible,setVisible,headerTitle,setNewAData,setDateF} = useDateContext();
  const queryClient = useQueryClient();
const navigation=useNavigation()

const [showDone,setShowDone]=useState<any>(false)
const {colors,dark}=useTheme()
const [showDate,setShowDate]=useState<any>('')
const [email,setEmail]=useState<any>('')
const [showData,setShowData]=useState<any>(false)
const [photo,setPhoto]=useState<any>('')
const [story,setStory]=useState<any>( '')
const [emotion,setEmotion]=useState<any>( '')
const [year,setYear]=useState<any>('')
const addMutation=useSaveData({date,month})
const deletedMuation=useDeletedData({date,month})
const [save,setSave]=useState<any>(false)
const {data}=useData(month)

// dateformat -> 2022-01-01
//monthformat->1

console.log(story,'story')



useEffect(()=>{
       const isData = Array.isArray(data) ? data.some((item: any) => item.date === date && item.emotion !== undefined) : false;
        setShowData(isData)
},[date,data])

useEffect(() => {
  const [year, month, day] = date.split('-');

  const header = new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  setShowDate(header);
setYear(year)
}, [date]);



useEffect(()=>{
  if(newAData?.date===date){
    console.log(newAData,'newAdata')
    setStory(newAData?.story)
    setPhoto(newAData?.photo)
    setEmotion(newAData?.emotion)
  }
},[newAData])





async function doneHandler(){
  const email=await AsyncStorage.getItem('email')
  console.log(email,'email')
  console.log(emotion,'emotion')
  if(emotion===''){
    Alert.alert('Alert', 'Please select emotion');
    return;
  }
 setSave(true)
  addMutation.mutate({date,emotion,story,photo,email,month})
  setShowDone(false)
  
   queryClient.invalidateQueries({ queryKey: ['data'] });
   setNewAData({date,emotion,story,photo,email,month})
   setDateF(date)
   setVisible(true)

 return  (navigation as any).navigate('main')





}

const handleDeleted = async () => {
  deletedMuation.mutate(
    { date, month },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['data', month] });
      

        setShowData(false);
        (navigation as any).navigate('main');

      
      },
    }
  );
};




 
  return (
    
    <SafeAreaView style={{backgroundColor:colors.background}}>
         <View style={[{alignItems:'center'},{backgroundColor:colors.background}]}>
         {
         
<FirstView date={showDate} showDone={showDone} setShowDone={setShowDone} fnBtn={doneHandler} />


 }
         </View>

      <View>
      {showData ? (
        <ShowDetail 
        showDone={showDone}
       setShowDone={setShowDone} 
       date={date} 
       month={month} 
       story={story}
       setStory={setStory}
       photo={photo}
        setPhoto={setPhoto}
        emotion={emotion}
        setEmotion={setEmotion}
        handleDeleted={handleDeleted}
        />)
      :
      <NewForm 
      showDone={showDone}
       setShowDone={setShowDone} 
       date={date} 
       month={month} 
       story={story}
       setStory={setStory}
       photo={photo}
        setPhoto={setPhoto}
        emotion={emotion}
        setEmotion={setEmotion}
       
       
       
       /> }
      </View>
       

      

    


     
    
    </SafeAreaView>
  )
}

export default Detail