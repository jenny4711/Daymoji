import {query, collection, doc, setDoc, updateDoc, getDocs,deleteDoc ,getDoc,where,onSnapshot} from 'firebase/firestore';
import { FIRESTORE_DB ,FIREBASE_STORAGE} from '../config/firebase';
import { useDateContext } from '~/context/DataContext';
import { deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {ref,uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
type Data = {
  date: string;
  emotion: string;
  story: string;
  photo: string;
};

export const getData = async (mon:any) => {


   const email:any=await AsyncStorage.getItem('email')
  const encodedEmail = encodeURIComponent(email.toLowerCase());
  if (!email || !mon) return;
  const daysCollection = collection(FIRESTORE_DB, `users/${email}/${mon}`);
  const daysSnapshot = await getDocs(daysCollection);
  const daysData = daysSnapshot.docs.map((doc) => doc.data() as Data);

return daysData
 
};





export   const saveDiaryEntry = async ({date,emotion,story,photo,email,month}:any) => {
  try {
    const email = await AsyncStorage.getItem('email');
 
    // const email=await AsyncStorage.getItem('email')
    const data = {
      date,
      emotion: emotion,
      story,
      photo,
    };

    let docRef;

    docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);;
    await setDoc(docRef, data);
   

 
  } catch (error) {
    console.log('Error updating document: ', error);
  }
};

export const deletedItem = async (date: any, month: any) => {
  try {
  
     const email = await AsyncStorage.getItem('email');
    if (!email) {
      console.log("Email not found");
      return;
    }

    

    const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      console.log("Document does not exist");
      return;
    }

    await deleteDoc(docRef);
    console.log("Document successfully deleted");

  } catch (error) {
    console.log('Error deleting document: ', error);
  }
};


export const saveSettingEntry = async ({text,background,inputBk,theme,email}:any) => {
  try {
    const data = {
      text: text || 'black',
      background: background || 'white',
      inputBk: inputBk || '#e6e6e6',
      theme: theme || 'light',
    };

    let docRef;

    docRef = doc(FIRESTORE_DB, `users/${email}/settings/configuration`);
    await setDoc(docRef, data);
   
  } catch (error) {
    console.log('Error updating document: ', error);
  }
};



export const getSettingData = async () => {
  try {
 
     const email = await AsyncStorage.getItem('email');
    if (!email) return null;

    const docRef = doc(FIRESTORE_DB, `users/${email}/settings/configuration`);
    const docSnapshot = await getDoc(docRef);
   

    if (docSnapshot.exists()) {
      return docSnapshot.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.log('Error getting document: ', error);
    return null;
  }
};

export const deletedAllItem= async (month:any) => {
 try{
  const {email,setEmail,token,setToken}=useDateContext()
  // const email=await AsyncStorage.getItem('email')
  if (!email) {
    console.log("Email not found");
    return;
  }
  const monthArr=['1','2','3','4','5','6','7','8','9','10','11','12']
  monthArr.map(async (mon)=>{
    const userCollectionRef = collection(FIRESTORE_DB, `users/${email}/${mon}`);
    const userDocsQuery = query(userCollectionRef);
    const querySnapshot = await getDocs(userDocsQuery);
    const deletePromises = querySnapshot.docs.map((docSnap) => {
      return deleteDoc(docSnap.ref);
    });
    await Promise.all(deletePromises);
  })
 console.log("All documents successfully deleted");
 

 }catch(error){
   console.log('Error deleting document: ', error);
 }
    
  
}



//image uploading
export const uploadImageStorage = async (uri: any, fileType: any) => {
  try {
 
    const res = await fetch(uri);
    const blob = await res.blob();
     const email = await AsyncStorage.getItem('email');
    
    const storageRef = ref(FIREBASE_STORAGE, `users/${email}/img/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, blob);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot: any) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error: any) => {
          console.log(error, 'error');
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
            console.log('File available at', downloadUrl);
            resolve(downloadUrl); // Resolve the promise with the download URL
          });
        }
      );
    });
  } catch (error) {
    console.log(error, 'uploadImage');
    throw error;
  }
};



