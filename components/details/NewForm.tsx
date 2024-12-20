import {
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Dimensions,
  View,
  Image,
  Platform,
  Button,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTheme } from '~/Theme/ThemeProvider';
import IconSticker from './IconSticker';
import { useSaveData } from '~/hooks/useData';
import InputForm from './InputForm';
import AddPhoto from './AddPhoto';
import { useDateContext } from '~/context/DataContext';
const { width, height } = Dimensions.get('window');

import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  FadeInLeft,
} from 'react-native-reanimated';
import { FadeIn, FadeInUp, FadeInDown, FadeInRight } from 'react-native-reanimated';

const NewForm = ({
  // showDone,
  // setShowDone,
  date,
  month,
  story,
  setStory,
  setPhoto,
  photo,
  emotion,
  setEmotion,
  imges,
  setImges,
}: any) => {
  const { dark, colors, setScheme } = useTheme();
 const {showDone,setShowDone}=useDateContext()
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const deletedIcon = require('../../assets/delete.png');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true); // or some other action
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // or some other action
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [setKeyboardVisible, keyboardVisible]);

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <ScrollView style={{ height: '100%', width: '100%', backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        style={{
          alignItems: 'center',
          backgroundColor: colors.background,
          justifyContent: 'center',
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.select({ ios: -500, android: 80 })}>
        <IconSticker setEmotion={setEmotion} hideKeyboard={hideKeyboard} />
        <InputForm story={story} setStory={setStory} marginLeft={24} />
        {/* <View style={{ marginTop: 16 }}>
          <AddPhoto
            setPhoto={setPhoto}
         
            photo={photo}
            hideKeyboard={hideKeyboard}
            imges={imges}
            setImges={setImges}
          />
        </View> */}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default NewForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  dateText: {
    fontSize: 16,
    height: 19,
    fontWeight: 700,
    lineHeight: 19.09,
    marginTop: 27,
  },
  text: {
    fontSize: 16,
  },
  iconBtnView: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: (width - 48) / 5 / 5,
  },
  storyInput: {
    marginTop: 14,
    marginHorizontal: 24,
    fontSize: 16,
  },
  storyInputView: {
    width: width - 48,
    height: 67,
    marginVertical: 14,
    borderRadius: 24,
    justifyContent: 'space-between',
  },

  showKeyboard: {
    width: '100%',
    height: '8.29%',
    marginTop: 110,
    fontWeight: 'bold',
    borderRadius: 24,
  },
  noKeyboard: {
    width: 40,
    height: 40,
    top: 30,
    right: 16,
    fontWeight: 'bold',
    borderRadius: 24,
  },
});
