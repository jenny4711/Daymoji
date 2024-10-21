import {ActivityIndicator, View, Text, Dimensions,  TouchableOpacity, StyleSheet ,Image as RnImage, ImageBackground} from 'react-native';
import React from 'react'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useTheme } from '~/Theme/ThemeProvider'  
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useDateContext } from '~/context/DataContext';
import { moderateScale } from 'react-native-size-matters';

import Ionicons from '@expo/vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');
const EachImage = ({idx,img,imgBtn,imgBtnBk,deletedIcon,imgSize,setImgSize,setImg,deleteImage,deleteMargin,imges,progress,isLoading}:any) => {
  const navigation=useNavigation()
  const {colors,dark} = useTheme()
console.log(progress,idx,'EachImage')
  return (
    <>
     


     
     
          <View key={idx}  style={{alignItems:'center'}}>
           {isLoading &&
            <View style={[styles.loadingOverlay,{backgroundColor:colors. loadingBK}]}>
            <ActivityIndicator size="small" color={colors.text} />
          </View>}
   <TouchableOpacity style={{marginHorizontal:imges.length>1?8:0,}} activeOpacity={1} onPress={()=>(navigation as any).navigate('imgDetail/[img]',{img:img,idx:idx})}>
             <Image
            
            contentFit='cover'
              source={{ uri: img }}
                style={{ width: imgSize.width, height:imgSize.height, borderRadius: 24 }}
                cachePolicy={'memory'}
            /> 

            </TouchableOpacity>
            <TouchableOpacity style={{position:'absolute',width:24,height:24,backgroundColor:'#FFFFFF',borderRadius:100,justifyContent:'center',alignItems:'center',marginLeft:moderateScale(1),top:deleteMargin.top,right:deleteMargin.right}} onPress={()=>deleteImage(img)}>
            <Ionicons name="close" size={12} color={'black'} />

            </TouchableOpacity>
            
          
          </View>
        
      
   
    </>
  )
}

export default EachImage


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


// const EachImage = ({ idx, img, imgBtn, imgBtnBk, deletedIcon, imgSize, setImgSize, setImg, deleteImage, deleteMargin, imges, progress, isLoading }: any) => {
//   const navigation = useNavigation();
//   const { colors, dark } = useTheme();
// const {preImages, setPreImages} = useDateContext()
//   return (
//     <>
//       <View key={idx} style={{ alignItems: 'center' }}>
//         {isLoading ? (
//           <ActivityIndicator
//             style={{backgroundColor:'yellow', justifyContent: 'center', alignItems: 'center' }}
//             size="small"
//             color={colors.text}
//           />
//         ) : (
//           <TouchableOpacity
//             style={{ marginHorizontal: imges.length > 1 ? 8 : 0 }}
//             activeOpacity={1}
//             onPress={() => (navigation as any).navigate('imgDetail/[img]', { img: img, idx: idx })}
//           >
//             <Image
//               contentFit="cover"
//               source={{ uri: preImages[idx] }}
//               style={{ width: imgSize.width, height: imgSize.height, borderRadius: 24 }}
//               cachePolicy={'memory'}
//             />
            
//           </TouchableOpacity>
//         )}
//         <TouchableOpacity
//           style={{
//             position: 'absolute',
//             width: 24,
//             height: 24,
//             backgroundColor: '#FFFFFF',
//             borderRadius: 100,
//             justifyContent: 'center',
//             alignItems: 'center',
//             marginLeft: moderateScale(1),
//             top: deleteMargin.top,
//             right: deleteMargin.right,
//           }}
//           onPress={() => deleteImage(img)}
//         >
//           <Ionicons name="close" size={12} color={'black'} />
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };
// export default EachImage