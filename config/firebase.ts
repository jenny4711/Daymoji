import {initializeApp} from 'firebase/app';
import {initializeAuth,getReactNativePersistence,getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import{getStorage} from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,

};

const FIREBASE_APP = initializeApp(firebaseConfig);
let auth;
if(Platform.OS==='web'){
  auth=getAuth(FIREBASE_APP)
}else{
  auth=initializeAuth(FIREBASE_APP,{
    persistence: getReactNativePersistence(AsyncStorage)
  });
}


export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH=auth
