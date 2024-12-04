

import {initializeApp} from 'firebase/app';
import {initializeAuth,getReactNativePersistence} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import{getStorage} from 'firebase/storage';

import AsyncStorage from '@react-native-async-storage/async-storage';
const firebaseConfig = {
  apiKey: "AIzaSyBWd3oa0LwtUxcXTCRSj71BgD-i8Z1IHyM",
  authDomain: "daymojiios.firebaseapp.com",
  projectId: "daymojiios",
  storageBucket: "daymojiios.appspot.com",
  messagingSenderId: "401356467466",
  appId: "1:401356467466:web:6ff5d2ea2bc1e5c9c61ef3"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH=initializeAuth(FIREBASE_APP,{
  persistence: getReactNativePersistence(AsyncStorage)
});