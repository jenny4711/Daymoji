import { View, Text, Dimensions, Pressable } from 'react-native';
import React, { useState, useEffect } from 'react';
import Octicons from '@expo/vector-icons/Octicons';
import { useLocalSearchParams } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Image as ExpoImage } from 'expo-image';
import { useTheme } from '~/Theme/ThemeProvider';
import { useDateContext } from '~/context/DataContext';
import Carousel from 'react-native-reanimated-carousel';
const { width, height } = Dimensions.get('window');
// react-native-reanimated-carousel
const Img = () => {
  const { img, idx } = useLocalSearchParams<any>();
 
  const { colors, dark } = useTheme();
  const [getImg, setGetImg] = useState(img);
  const [imgArr, setImgArr] = useState<any>([]);
  const navigation = useNavigation();

  const screenSize = Dimensions.get('window'); // 화면 크기 가져오기
  const { setNewAData, newAData, preImages ,dateF} = useDateContext();

  useEffect(() => {
    if (img === '') {
      setImgArr(newAData?.photo);
    } else {
      setImgArr(preImages);
    }
  }, [img,dateF]);

  useEffect(() => {
    console.log(imgArr, 'imgArr');
   
  }, [imgArr]);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignItems: 'center',
          justifyContent: 'flex-start',
         
          // paddingTop: 16,
        }}>
        <View style={{ width: width - 48, alignItems: 'flex-end' ,paddingVertical:16}}>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 16, color: colors.text, fontFamily: 'SFCompactRoundedBD' }}>
              Done
            </Text>
          </Pressable>
        </View>
              {imgArr.length > 0 && (
          <Carousel
          loop={false}
            // loop={imgArr.length > 1} 
            enabled={imgArr.length>1}
            width={width}
            height={height}
            autoPlay={false}
            defaultIndex={idx}
            data={[...imgArr]}
            style={{flex:1, justifyContent:'flex-start', alignItems:'center' }}
            onSnapToItem={(index) => console.log('current index:', index)}
            renderItem={({ index }) => (
              <>
                <ExpoImage
                  source={{ uri: imgArr[index] }} // 이미지 URI 설정
                  style={{ flex: 1 }}// 화면 너비에 맞춰 이미지 크기 조정
                  contentFit="contain" // 이미지 비율 유지하며 화면에 맞춤
                  cachePolicy="none" // 캐시 사용 안 함
                />
              </>
            )}
          />
        )}

        {/* {getImg ? (
        <ExpoImage
          source={{ uri: getImg}} // 이미지 URI 설정
          style={{ width: screenSize.width , height: screenSize.height  }} // 화면 너비에 맞춰 이미지 크기 조정
          contentFit="contain" // 이미지 비율 유지하며 화면에 맞춤
          cachePolicy="none" // 캐시 사용 안 함
        />
      ) : (
        <Text style={{ color: 'white', textAlign: 'center' }}>이미지를 찾을 수 없습니다</Text>
      )} */}
      </View>
     
    </>
  );
};

export default Img;
