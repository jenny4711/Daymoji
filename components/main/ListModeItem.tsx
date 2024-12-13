import {ScrollView,TouchableOpacity, View, Text ,Alert,SafeAreaView ,Dimensions , Image as RNimage} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import EmotionSticker from '../EmotionSticker'
import { Image ,ImageLoadEventData} from 'expo-image';
import Animated from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
const {width,height}=Dimensions.get('window')
import { useQueryClient } from '@tanstack/react-query';
import { useDateContext } from '~/context/DataContext'
import Octicons from '@expo/vector-icons/Octicons';
import { useDeletedData } from '~/hooks/useData'

const ListModeItem = ({item}:any) => {
  const {colors,dark}=useTheme()
  const navigation=useNavigation()
  const { monthF,setVisible,setNewAData,setPreImages,preImages,setDateF} = useDateContext();
  const [imgSize,setImgSize]=useState({width:0,height:0})
  const [deleteMargin,setDeleteMargin]=useState({top:16,right:16})
const [images,setImages]=useState<any>([])
const [actualData,setActualData]=useState<any>(null)
  const screenSize = Dimensions.get('window');
  const queryClient = useQueryClient();


useEffect(()=>{
  if(item){
    setNewAData(item)
  }
},[item])


  useEffect(()=>{

    if(item?.photo && Array.isArray(item.photo)){
      setImages(item.photo)
     
    
    }
  },[item?.photo])

 
  const deletedMuation=useDeletedData({date:item?.date,monthF})
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
      { date:item.date, month:monthF },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['data', monthF] });
        
  
        
          (navigation as any).navigate('index');
          setVisible(false)
          setNewAData(null)
        
        },
      }
    );
  };
  
  const handleEditBtn = async () => {
  
    (navigation as any).navigate('details/[date]', { date:item.date, month: monthF });
    setVisible(false)
  }
  
  

  return (
    <View  style={{borderRadius:21,backgroundColor:colors.background}}>
    <View style={{marginBottom:16,backgroundColor:colors.inputBk,width:screenSize.width-48,borderRadius:24,alignItems:'center'}}>
     
    <View style={{flexDirection:'row',marginTop:0,marginBottom:0,height:67,width:screenSize.width-140,justifyContent:'space-around',alignItems:'center',marginLeft:'35%'}}>
      <Animated.View 
    
      style={{width:60,height:60,borderRadius:100,justifyContent:'center',alignItems:'center',marginTop:16,backgroundColor:colors.inputBk2}}
      >

       <EmotionSticker emotion={item.emotion} size={24}/>
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
      <Text style={{fontFamily:'SFCompactRoundedBD',fontSize:16,color:colors.text}}>{item.date}</Text>

    </View>

    <View style={{marginVertical:16,width:screenSize.width-96,alignItems:'flex-start',backgroundColor:colors.inputBk2,justifyContent:'center',borderRadius:24}}>
      <Text style={{fontFamily:'SFCompactRoundedBD',fontSize:16,color:colors.text,paddingVertical:24,paddingLeft:24}}>{item.story}</Text>

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

    </View>
  )
}

export default ListModeItem