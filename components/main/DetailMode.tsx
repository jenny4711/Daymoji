import {TouchableOpacity, View, Text ,Alert,SafeAreaView ,Dimensions , Image as RNimage} from 'react-native'
import React ,{useEffect,useState}from 'react'
import { useTheme } from '~/Theme/ThemeProvider'
import {  useDeletedData } from '~/hooks/useData'
import Animated,{FadeInLeft,FadeInRight,FadeInUp,Easing,useAnimatedStyle,useSharedValue,withTiming,SlideInDown, SlideOutDown,} from 'react-native-reanimated'
// import AddPhoto from './AddPhoto'
import { useQueryClient } from '@tanstack/react-query';
import { useDateContext } from '~/context/DataContext'
import Octicons from '@expo/vector-icons/Octicons';
import EmotionSticker from '../EmotionSticker'
import { Image ,ImageLoadEventData} from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler'
import { deleteImageStorage } from '~/utils/fireStoreFn'
import { set } from 'lodash'
const {width,height}=Dimensions.get('window')
const DetailMode = ({date,item,currentDateForm}:any) => {
  const {colors,dark}=useTheme()
  const { monthF,setVisible,setNewAData} = useDateContext();
const screenSize = Dimensions.get('window');
const queryClient = useQueryClient();
const navigation=useNavigation()
const newDate=new Date(date ).toLocaleString('en-US',{year:'numeric',month:'long',day:'numeric',timeZone: 'UTC', })
const deletedMuation=useDeletedData({date,monthF})
  // ----------flexible image size----------
const [imgSize,setImgSize]=useState({width:0,height:0})

useEffect(() => {
console.log(item?.photo,'item?.photo')
  
  if (item?.photo !== undefined && item?.photo !== null) {
    try {
      RNimage.getSize(
        item.photo,
        (width, height) => {
          const ratio = width / height;
          const newHeight = screenSize.width / ratio;
          const newWeight = screenSize.width/ratio
          setImgSize({ width: screenSize.width - 96, height: newHeight });
          console.log(screenSize.width, 'width, height');
        },
        (error) => {
          console.log('Failed to get size for image', error);
          setImgSize({ width: 0, height: 0 }); // 이미지가 유효하지 않으면 크기를 0으로 설정
        }
      );
    } catch (error) {
      console.log('Error getting image size', error);
      setImgSize({ width: 0, height: 0 }); // 예외 발생 시 크기를 0으로 설정
    }
  } else {
    setImgSize({ width: 0, height: 0 });
  }
}, [item?.photo]);



const handleDeleted = async () => {
  await deleteImageStorage(item?.photo)
  deletedMuation.mutate(
    { date, month:monthF },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['data', monthF] });
     
      
     
      
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

       <EmotionSticker emotion={'happy'} size={24}/>
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
      {item && item.photo? 
        <View style={{height: imgSize.height*.77 ,borderRadius:25,overflow: 'hidden',alignItems:'center',justifyContent:'flex-start',marginBottom:20}}>
       <Image
        contentFit='contain' 
         source={{uri:item?.photo}}
      
          style={{height:imgSize.height*.77,width:imgSize.width,borderRadius: 25,overflow: 'hidden'}}
       
     
        
        
          />
           </View>
          :
          null
          }
     

       
   
    </View>

    </ScrollView>
  )
}

export default DetailMode