import {TouchableOpacity, View, Text  ,Dimensions , Image as RNimage} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import {  useDeletedData } from '~/hooks/useData'
import Animated,{FadeInLeft,FadeInRight,FadeInUp,Easing,useAnimatedStyle,useSharedValue,withTiming,SlideInDown, SlideOutDown,} from 'react-native-reanimated'
import { useQueryClient } from '@tanstack/react-query';
import { useDateContext } from '~/context/DataContext'
import Octicons from '@expo/vector-icons/Octicons';
import EmotionSticker from '../EmotionSticker'
import { Image ,ImageLoadEventData} from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler'
import { deleteImageStorage } from '~/utils/fireStoreFn'
import { saveIsToday } from '~/utils/fireStoreFn'

const {width,height}=Dimensions.get('window')
const DetailMode = ({date,item,currentDateForm}:any) => {
  const {colors,dark}=useTheme()
  const { monthF,setVisible,setNewAData,todayDate} = useDateContext();
  const [images,setImages]=useState<any>([])
const screenSize = Dimensions.get('window');
const queryClient = useQueryClient();
const navigation=useNavigation()
const newDate=new Date(date ).toLocaleString('en-US',{year:'numeric',month:'long',day:'numeric',timeZone: 'UTC', })
const deletedMuation=useDeletedData({date,monthF})
const [imgSize,setImgSize]=useState({width:0,height:0})
const [deleteMargin,setDeleteMargin]=useState({top:16,right:16})
useEffect(()=>{
  if(item?.photo && Array.isArray(item.photo)){
    setImages(item.photo)
  }
},[item?.photo])

useEffect(()=>{
  if(images.length===2){
    setImgSize({width:(screenSize.width - 96) / 2 -8,height:(screenSize.width - 96) / 2 -8})
    setDeleteMargin({top:7,right:7})
   
  }else if(images.length>2){
    setImgSize({width:(screenSize.width - 96) / 3 -8,height:(screenSize.width - 96) / 3 -8})
    setDeleteMargin({top:5,right:5})
 
  }else{
    setImgSize({width:screenSize.width-96,height:screenSize.width-96})
    setDeleteMargin({top:16,right:16})

  }
},[images])






const handleDeleted = async () => {
  

  deletedMuation.mutate(
    { date, month:monthF },
    {
      onSuccess: async() => {
        queryClient.invalidateQueries({ queryKey: ['data', monthF] });
        if(todayDate===date){
          await saveIsToday({date:todayDate,month:monthF,isToday:true})
         
        }
     
     if(item.photo){
      await deleteImageStorage(item.photo)
      setVisible(false)
      setNewAData(null)
     
      
     return  (navigation as any).navigate('main');
     
     }
     
      
        (navigation as any).navigate('main');
        setVisible(false)
        setNewAData(null)
       

      
      },
    }
  );
};

const handleEditBtn = async () => {

  (navigation as any).navigate('details/[date]', { date, month: monthF });
  setVisible(false)
}



  return (
    <ScrollView style={{borderRadius:21,paddingBottom:100}}>
    <View style={{marginBottom:50,backgroundColor:colors.inputBk,width:screenSize.width-48,borderRadius:24,alignItems:'center'}}>
     
    <View style={{flexDirection:'row',marginTop:0,marginBottom:0,height:67,width:screenSize.width-140,justifyContent:'space-around',alignItems:'center',marginLeft:'35%'}}>
      <Animated.View 
    
      style={{width:60,height:60,borderRadius:100,justifyContent:'center',alignItems:'center',marginTop:16,backgroundColor:colors.inputBk2}}
      >

       <EmotionSticker emotion={item?.emotion} size={24}/>
      </Animated.View>
      <View style={{flexDirection:'row'}}>
        <TouchableOpacity onPress={handleEditBtn} style={{marginRight:16}}>
      <Octicons name="pencil" size={16} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleted}>
      <Octicons name="trash" size={16} color={colors.text}/>
      </TouchableOpacity>
      </View>
    </View>

    <View style= {{marginTop:8,width:screenSize.width-96,alignItems:'center',justifyContent:'center',borderRadius:24}}>
      <Text style={{fontFamily:'SFCompactRoundedBD',fontSize:16,color:colors.text}}>{newDate}</Text>

    </View>

    <View style={{marginVertical:16,width:screenSize.width-96,alignItems:'flex-start',backgroundColor:colors.inputBk2,justifyContent:'center',borderRadius:24}}>
      <Text style={{fontFamily:'SFCompactRoundedBD',fontSize:16,color:colors.text,paddingVertical:24,paddingLeft:24}}>{item?.story}</Text>

      </View>

      <View  style={{flexWrap: 'wrap', borderRadius:25,alignItems:'center',justifyContent:'center',flexDirection:'row',marginBottom:25}}>
      {item && item.photo?item.photo.map((itemImg:any,index:any)=>(


<TouchableOpacity key={index} activeOpacity={1} onPress={()=>(navigation as any).navigate('imgDetail/[img]',{img:"",idx:index})}>
<Image
contentFit='cover' 
source={{uri:itemImg}}

style={{height:imgSize.height,width:imgSize.width,borderRadius: 25,margin: 4,}}

/>
</TouchableOpacity>

      ))
      
      
      
      
      
          :
          null
          }
     
     </View>
       
   
    </View>

    </ScrollView>
  )
}

export default DetailMode