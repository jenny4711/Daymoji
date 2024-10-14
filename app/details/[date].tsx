
import Head from 'expo-router/head'
import { View, Text ,Alert,SafeAreaView,ActivityIndicator,StyleSheet} from 'react-native'
import React ,{useState,useEffect,useCallback}from 'react'
import FirstView from '~/components/details/FirstView'
import { useData ,useSaveData,useDeletedData} from '~/hooks/useData'
import { useDateContext } from '~/context/DataContext'
import NewForm from '~/components/details/NewForm'
import { useLocalSearchParams ,useNavigation,useFocusEffect} from 'expo-router'
import { useTheme } from '~/Theme/ThemeProvider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ShowDetail from '~/components/details/ShowDetail'
import { saveIsToday ,updateIsToday} from '~/utils/fireStoreFn'
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
  const {isLoading, dateF, newAData, dateWithLang ,visible,setVisible,headerTitle,setNewAData,setDateF,todayDate,preImages} = useDateContext();
  const queryClient = useQueryClient();
const navigation=useNavigation()

const [showDone,setShowDone]=useState<any>(false)
const {colors,dark}=useTheme()
const [showDate,setShowDate]=useState<any>('')
const [email,setEmail]=useState<any>('')
const [showData,setShowData]=useState<any>(false)
const [photo, setPhoto] = useState<any>([]); // photo를 배열로 관리
const [story,setStory]=useState<any>( '')
const [emotion,setEmotion]=useState<any>( '')
const [year,setYear]=useState<any>('')
const addMutation=useSaveData({date,month})
const deletedMuation=useDeletedData({date,month})
const [save,setSave]=useState<any>(false)
const {data}=useData(month)

// dateformat -> 2022-01-01
//monthformat->1

useEffect(()=>{
  if(newAData?.date!==date){
    setStory('')
    setPhoto([])
    setEmotion('')
    setNewAData(null)
  }
},[newAData,date])



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
  
    setStory(newAData?.story)
    setPhoto(newAData?.photo)
    setEmotion(newAData?.emotion)
  }
},[newAData])





async function doneHandler() {
  const email = await AsyncStorage.getItem('email');

  // if (emotion === '') {
  //   Alert.alert('Alert', 'Please select emotion');
  //   return;
  // }
  
  setSave(true);
  
  // `newAData.photo`와 `photo`를 배열로 관리
  let photos: string[] = [];
  
 
  
  // 현재 선택된 `photo`가 배열인지 단일 값인지 확인
  if (Array.isArray(photo)) {
    photos = [...photos, ...photo]; // 여러 사진을 추가
  } else if (photo) {
    photos.push(photo); // 단일 사진을 추가
  }

  // 상태 저장 및 Firestore 업데이트
  addMutation.mutate({ date, emotion, story, photo: photos, email, month });

  setShowDone(false);

  queryClient.invalidateQueries({ queryKey: ['data'] });
  
  setNewAData({ date, emotion, story, photo: photos, email, month });
  setDateF(date);
  setVisible(true);

  return (navigation as any).navigate('main');
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
        {isLoading && (
        <View style={[styles.loadingOverlay,{backgroundColor:colors. loadingBK}]}>
          <ActivityIndicator size="small" color={colors.text} />
        </View>
      )}
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

const styles=StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    zIndex: 1, // 메인 컨텐츠 위에 오버레이가 렌더링되도록 설정
  },
})