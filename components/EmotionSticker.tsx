import { Image, View, Text, StyleSheet } from 'react-native';
import React from 'react'

const EmotionSticker = ({emotion,size}:any) => {
 
 
  let source;
  switch (emotion) {
    
    case 'happy':
     
      source = require('../assets/happy.png');
   
      break;
      case 'Veryhappy':
     
      source = require('../assets/veryHappy.png');
      break;
    case 'sad':
    
      source = require('../assets/sad.png');
      break;
    case 'neutral':
      
      source = require('../assets/neutral.png');
      break;
      case 'worst':
      
        source = require('../assets/worst.png');
        break;
    default:
      source = null;
  }


 
  return source ? <Image source={source} style={{width:size,height:size}} /> : null;
}

export default EmotionSticker

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
  },
  sticker: {
    width: 30,
    height: 30,
  },
});