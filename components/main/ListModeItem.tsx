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
  const { monthF,setVisible} = useDateContext();
  const [imgSize,setImgSize]=useState({width:0,height:0})
  const screenSize = Dimensions.get('window');
  const queryClient = useQueryClient();
 
  const deletedMuation=useDeletedData({date:item?.date,monthF})
  useEffect(() => {

  
    if (item?.photo !== undefined && item?.photo !== null) {
      try {
        RNimage.getSize(
          item.photo,
          (width, height) => {
            const ratio = width / height;
            const newHeight = screenSize.width / ratio;
            setImgSize({ width: screenSize.width - 96, height: newHeight });
            console.log(width, height, 'width, height');
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
    deletedMuation.mutate(
      { date:item.date, month:monthF },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['data', monthF] });
        
  
        
          (navigation as any).navigate('main');
          setVisible(false)
  
        
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
      <Text style={{fontFamily:'SFCompactRoundedBD',fontSize:16,color:colors.text}}>{item.date}</Text>

    </View>

    <View style={{marginVertical:16,width:screenSize.width-96,alignItems:'flex-start',backgroundColor:colors.inputBk2,justifyContent:'center',borderRadius:24}}>
      <Text style={{fontFamily:'SFCompactRoundedBD',fontSize:16,color:colors.text,paddingVertical:24,paddingLeft:24}}>{item?.story}</Text>

      </View>
      {item?.photo? 
        <View style={{marginTop:16,height:imgSize.height,backgroundColor:'gray'}}>
       <Image
        contentFit="cover" 
         source={{uri:item?.photo}}
          style={{height:imgSize.height,width:imgSize.width,borderRadius:24}}
        
          />
          </View>
          :
          null
          }
     

       
   
    </View>

    </View>
  )
}

export default ListModeItem