import {query, collection, doc, setDoc, updateDoc, getDocs,deleteDoc ,getDoc,where,onSnapshot} from 'firebase/firestore';
import { FIRESTORE_DB ,FIREBASE_STORAGE} from '../config/FirebaseConfig';
import { useDateContext } from '~/context/DataContext';
import { deleteUser } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import {ref,uploadBytesResumable,getDownloadURL,deleteObject} from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  listAll} from 'firebase/storage';

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



export const isTodayEventNotToday=async()=>{
  try{
    const email=await AsyncStorage.getItem('email')
    if(!email) return;
    const monthArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const allDayData: any[] = [];

    for (const month of monthArr) {
      const allDayCollection = collection(FIRESTORE_DB, `users/${email}/${month}`);
      const allDaySnapshot = await getDocs(allDayCollection);
      const monthData = allDaySnapshot.docs.map((doc) => doc.data());
      allDayData.push(...monthData); // 모든 데이터를 합침
    }

    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const dateS = date < 10 ? `0${date}` : date;
    const monthS = month < 10 ? `0${month}` : month;
    const currentDate = `${year}-${monthS}-${dateS}`;

    const todayData = allDayData.filter((data: any) => data.isToday === true);

    if (todayData.length > 0 && todayData[0].date !== currentDate) {
      todayData.map(async (data: any) => {
        await updateIsToday({ date: data.date, month: month, isToday: false });
      });
    }

      // 오늘 날짜 저장
      await saveIsToday({ date: currentDate, month, isToday: true });
  

  }catch(error){console.log(error)}
}


export const findTodayData=async(month:any,currentDate:any)=>{
 try{
const email=await AsyncStorage.getItem('email')

if(!email) return null
const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${currentDate}`);
const docSnap = await getDoc(docRef);
const data = docSnap.data();
if(docSnap.exists()){

 return data
}else{
 return null
}


 }catch(error){
   console.log('Error getting document!!: ', error);
   return null;
 }
}

export const saveDiaryEntry = async ({ date, emotion, story, photo, month }: any) => {
  try {
    const email = await AsyncStorage.getItem('email');
    const today = new Date();
    const todayDate = today.getDate() >= 10 ? today.getDate().toString() : `0${today.getDate()}`;
    const todayMonth = today.getMonth() + 1 >= 10 ? (today.getMonth() + 1).toString() : `0${today.getMonth() + 1}`;
    const todayFulldate = `${today.getFullYear()}-${todayMonth}-${todayDate}`;

    let isToday;
  if(photo.length>3){
    photo.splice(3);  
  }
    
    if (date === todayFulldate) {
      isToday = true;
    } else {
      isToday = false;
    }

   
    const data = {
      date,
      emotion: emotion,
      story,
      photo,
      isToday
    };

    let docRef;

    docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
    await setDoc(docRef, data);

  } catch (error) {
    console.log('Error updating document: ', error);
  }
};


export const deletedItem = async (date: any, month: any) => {
 try {
 
    const email = await AsyncStorage.getItem('email');
    const today = new Date();
    const todayDate = today.getDate() >= 10 ? today.getDate().toString() : `0${today.getDate()}`;
    const todayMonth = today.getMonth() + 1 >= 10 ? (today.getMonth() + 1).toString() : `0${today.getMonth() + 1}`;
    const todayFulldate = `${today.getFullYear()}-${todayMonth}-${todayDate}`;
   if (!email) {
 
     return;
   }

   const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
   const docSnap = await getDoc(docRef);

   if (!docSnap.exists()) {
     console.log("Document does not exist");
     return;
   }

   await deleteDoc(docRef);
await getData(month)
   if(todayFulldate===date){
     await saveIsToday({date,month,isToday:true})
   }

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


  const email=await AsyncStorage.getItem('email')
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




 await isTodayEventNotToday()
console.log("All documents successfully deleted");

}catch(error){
  console.log('Error deleting document: ', error);
}
   
 
}



//image uploading
export const uploadImageStorage = async (uri: any, fileType: any,onProgress:(progress:any)=>void) => {
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
         if (onProgress) {
          onProgress(progress); // 진행률 콜백 호출
        }
       },
       (error: any) => {
         console.log(error, 'error');
         reject(error);
       },
       async() => {
        await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
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


export const deleteImageStorage = async (downloadUrl: string) => {
  
 try {
   // 파일을 가리키는 참조 만들기
   const storageRef = ref(FIREBASE_STORAGE, downloadUrl);

   const checkUrl = await getDownloadURL(storageRef);


  if(checkUrl ==="" || checkUrl === null){
    console.log('No such document!');
    return;
  }
   
   // 파일 삭제
   await deleteObject(storageRef);
   
   console.log('Image successfully deleted');
 } catch (error) {
   console.log(error, 'deleteImage');
   throw error;
 }
};






// isToday 만 먼저 올리기
export const saveIsToday = async ({date, month, isToday}: any) => {
 try {
   const email = await AsyncStorage.getItem('email');
   if (!email) return;
console.log('saveIsToday')
   const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
   
   // 새로운 문서 생성 or 기존 문서에 필드 추가 (merge: true로 다른 필드 유지)
   await setDoc(docRef, { isToday ,date}, { merge: true });
   console.log('isToday saved successfully');
 } catch (error) {
   console.log('Error saving isToday: ', error);
 }
};



//isToday Update
export const updateIsToday = async ({ date, month, isToday }:any) => {
  try {
    const email = await AsyncStorage.getItem('email');
    if (!email) return;

  console.log('updateIsToday');

    // Firestore 컬렉션 참조 가져오기
    const userCollectionRef = collection(FIRESTORE_DB, `users/${email}/${month}`);
    const allDocsSnapshot = await getDocs(userCollectionRef);

    // 모든 문서의 isToday를 false로 업데이트
    const updatePromises = allDocsSnapshot.docs.map(async (docSnap) => {
      if (docSnap.exists() && docSnap.id !== date) {
        await updateDoc(docSnap.ref, {
          isToday: false,
        });
      }
    });

    // 모든 문서 업데이트가 완료될 때까지 기다림
    await Promise.all(updatePromises);

    // 오늘 날짜 문서의 isToday를 true로 업데이트
    const todayDocRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
    const todayDocSnap = await getDoc(todayDocRef);
    if (!todayDocSnap.exists()) {
      console.log('No such document!');
      return;
    }

    await updateDoc(todayDocRef, {
      isToday: isToday, // 오늘 날짜 문서의 isToday 필드를 업데이트
    });

    console.log('isToday updated successfully');
  } catch (error) {
    console.log('Error updating isToday: ', error);
  }
};

export const deleteAccount = async (authUser: any) => {
  try {
    // 1. 사용자 이메일 가져오기
    const email = await AsyncStorage.getItem('email');
    if (!email) {
      console.log('Email not found');
      return;
    }

    // 2. Firestore에서 사용자 관련 모든 데이터 삭제
    const monthArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    for (const month of monthArr) {
      const userCollectionRef = collection(FIRESTORE_DB, `users/${email}/${month}`);
      const userDocsSnapshot = await getDocs(userCollectionRef);
      const deletePromises = userDocsSnapshot.docs.map((docSnap) => deleteDoc(docSnap.ref));
      await Promise.all(deletePromises);
    }

    // 설정 데이터 삭제
    const settingsDocRef = doc(FIRESTORE_DB, `users/${email}/settings/configuration`);
    await deleteDoc(settingsDocRef);

    console.log('Firestore user data successfully deleted');

    // 3. Firebase 스토리지에서 사용자 이미지 삭제
    const storageRef = ref(FIREBASE_STORAGE, `users/${email}/img`);
    const listResult = await listAll(storageRef);
    const deleteImagePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deleteImagePromises);

    console.log('User images successfully deleted from storage');

    // 4. Firebase 인증에서 사용자 삭제
    if (authUser) {
      await deleteUser(authUser);
      console.log('User account successfully deleted from authentication');
    } else {
      console.log('No authenticated user found');
    }

    // 5. AsyncStorage에서 사용자 데이터 삭제
    await AsyncStorage.removeItem('email');
    await AsyncStorage.removeItem('isLogin');
    console.log('Local user data successfully deleted');
  } catch (error) {
    console.log('Error deleting user account: ', error);
  }
};





// export const updateIsToday = async ({date, month, isToday}: any) => {
//  try {
 
//    const email = await AsyncStorage.getItem('email');
//    if (!email) return;
//  console.log(date,month,isToday,'updateIsToday')
//    const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
//    const docSnap = await getDoc(docRef);
//     if (!docSnap.exists()) {
//       console.log('No such document!');
//       return;
//     }
//    // 'isToday' 필드만 업데이트
//    await updateDoc(docRef, {
//      isToday: isToday,  // 다른 필드는 유지되고, 이 필드만 업데이트됨
//    });
//    console.log('isToday updated successfully');
//  } catch (error) {
//    console.log('Error updating isToday: ', error);
//  }
// };

//photo Update

export const updatePhoto = async ({date, month}: any) => {
  console.log('updatePhoto')
 try {
  
   const email = await AsyncStorage.getItem('email');
   if (!email) return;

   const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);

   // 'isToday' 필드만 업데이트
   await updateDoc(docRef, {
     photo: "",  // 다른 필드는 유지되고, 이 필드만 업데이트됨
   });
   console.log('isToday updated successfully');
 } catch (error) {
   console.log('Error updating isToday: ', error);
 }
};


















// import {query, collection, doc, setDoc, updateDoc, getDocs,deleteDoc ,getDoc,where,onSnapshot} from 'firebase/firestore';
// import { FIRESTORE_DB ,FIREBASE_STORAGE} from '../config/firebase';
// import { useDateContext } from '~/context/DataContext';
// import { deleteUser } from 'firebase/auth';
// import { useNavigation } from '@react-navigation/native';
// import {ref,uploadBytesResumable,getDownloadURL,deleteObject} from 'firebase/storage'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { handleTodayDate } from '../utils/utilsFn';

// type Data = {
//   date: string;
//   emotion: string;
//   story: string;
//   photo: string;
// };

// export const getData = async (mon:any) => {


//   const email:any=await AsyncStorage.getItem('email')
//  const encodedEmail = encodeURIComponent(email.toLowerCase());
//  if (!email || !mon) return;
//  const daysCollection = collection(FIRESTORE_DB, `users/${email}/${mon}`);
//  const daysSnapshot = await getDocs(daysCollection);
//  const daysData = daysSnapshot.docs.map((doc) => doc.data() as Data);

// return daysData

// };



// export const isTodayEventNotToday=async()=>{
//   try{
//     const email=await AsyncStorage.getItem('email')
//     if(!email) return;
//     const monthArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
//     const allDayData: any[] = [];
//     // const allDayCollection=collection(FIRESTORE_DB,`users/${email}`);
//     // const allDaySnapshot=await getDocs(allDayCollection)
//     for (const month of monthArr) {
//       const allDayCollection = collection(FIRESTORE_DB, `users/${email}/${month}`);
//       const allDaySnapshot = await getDocs(allDayCollection);
//       const monthData = allDaySnapshot.docs.map((doc) => doc.data());
//       allDayData.push(...monthData); // 모든 데이터를 합침
//     }

//     const today = new Date();
//     const month = today.getMonth() + 1;
//     const year = today.getFullYear();
//     const date = today.getDate();
//     const dateS = date < 10 ? `0${date}` : date;
//     const monthS = month < 10 ? `0${month}` : month;
//     const currentDate = `${year}-${monthS}-${dateS}`;

//     const todayData = allDayData.filter((data: any) => data.isToday === true);

//     if (todayData.length > 0 && todayData[0].date !== currentDate) {
//       todayData.map(async (data: any) => {
//         await updateIsToday({ date: data.date, month: month, isToday: false });
//       });
//     }

//       // 오늘 날짜 저장
//       await saveIsToday({ date: currentDate, month, isToday: true });
  

//   }catch(error){console.log(error)}
// }


//  const findTodayData=async(month:any,currentDate:any)=>{
//  try{
 
 

// const email=await AsyncStorage.getItem('email')

// if(!email) return null
// const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${currentDate}`);
// const docSnap = await getDoc(docRef);
// const data = docSnap.data();
// if(docSnap.exists()){

//  return data
// }else{
//  return null
// }


//  }catch(error){
//    console.log('Error getting document: ', error);
//    return null;
//  }
// }

// export const saveDiaryEntry = async ({ date, emotion, story, photo, month }: any) => {
//   try {
//     const email = await AsyncStorage.getItem('email');
//     const today = new Date();
//     const todayDate = today.getDate() >= 10 ? today.getDate().toString() : `0${today.getDate()}`;
//     const todayMonth = today.getMonth() + 1 >= 10 ? (today.getMonth() + 1).toString() : `0${today.getMonth() + 1}`;
//     const todayFulldate = `${today.getFullYear()}-${todayMonth}-${todayDate}`;

//     let isToday;
//   if(photo.length>3){
//     photo.splice(3);  
//   }
    
//     if (date === todayFulldate) {
//       isToday = true;
//     } else {
//       isToday = false;
//     }

   
//     const data = {
//       date,
//       emotion: emotion,
//       story,
//       photo,
//       isToday
//     };

//     let docRef;

//     docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
//     await setDoc(docRef, data);

//   } catch (error) {
//     console.log('Error updating document: ', error);
//   }
// };


// export const deletedItem = async (date: any, month: any) => {
//  try {
 
//     const email = await AsyncStorage.getItem('email');
//     const today = new Date();
//     const todayDate = today.getDate() >= 10 ? today.getDate().toString() : `0${today.getDate()}`;
//     const todayMonth = today.getMonth() + 1 >= 10 ? (today.getMonth() + 1).toString() : `0${today.getMonth() + 1}`;
//     const todayFulldate = `${today.getFullYear()}-${todayMonth}-${todayDate}`;
//    if (!email) {
 
//      return;
//    }

//    const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
//    const docSnap = await getDoc(docRef);

//    if (!docSnap.exists()) {
//      console.log("Document does not exist");
//      return;
//    }

//    await deleteDoc(docRef);

//    if(todayFulldate===date){
//      await updateIsToday ({date,month,isToday:true})
//    }

//  } catch (error) {
//    console.log('Error deleting document: ', error);
//  }
// };


// export const saveSettingEntry = async ({text,background,inputBk,theme,email}:any) => {
//  try {
//    const data = {
//      text: text || 'black',
//      background: background || 'white',
//      inputBk: inputBk || '#e6e6e6',
//      theme: theme || 'light',
//    };

//    let docRef;

//    docRef = doc(FIRESTORE_DB, `users/${email}/settings/configuration`);
//    await setDoc(docRef, data);
  
//  } catch (error) {
//    console.log('Error updating document: ', error);
//  }
// };



// export const getSettingData = async () => {
//  try {

//     const email = await AsyncStorage.getItem('email');
//    if (!email) return null;

//    const docRef = doc(FIRESTORE_DB, `users/${email}/settings/configuration`);
//    const docSnapshot = await getDoc(docRef);
  

//    if (docSnapshot.exists()) {
//      return docSnapshot.data();
//    } else {
//      console.log('No such document!');
//      return null;
//    }
//  } catch (error) {
//    console.log('Error getting document: ', error);
//    return null;
//  }
// };

// export const deletedAllItem= async (month:any) => {
// try{


//   const email=await AsyncStorage.getItem('email')
//  if (!email) {
//    console.log("Email not found");
//    return;
//  }
//  const monthArr=['1','2','3','4','5','6','7','8','9','10','11','12']
//  monthArr.map(async (mon)=>{
//    const userCollectionRef = collection(FIRESTORE_DB, `users/${email}/${mon}`);
//    const userDocsQuery = query(userCollectionRef);
//    const querySnapshot = await getDocs(userDocsQuery);
//    const deletePromises = querySnapshot.docs.map((docSnap) => {
//      return deleteDoc(docSnap.ref);
//    });
//    await Promise.all(deletePromises);
   
//  })




// await handleTodayDate()
// console.log("All documents successfully deleted");

// }catch(error){
//   console.log('Error deleting document: ', error);
// }
   
 
// }



// //image uploading
// //image uploading
// export const uploadImageStorage = async (uri: any, fileType: any,onProgress:(progress:any)=>void) => {
//   try {
 
//     const res = await fetch(uri);
//     const blob = await res.blob();
//      const email = await AsyncStorage.getItem('email');
    
//     const storageRef = ref(FIREBASE_STORAGE, `users/${email}/img/${Date.now()}`);
//     const uploadTask = uploadBytesResumable(storageRef, blob);
    
//     return new Promise((resolve, reject) => {
//       uploadTask.on(
//         "state_changed",
//         (snapshot: any) => {
//           const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log("Upload is " + progress + "% done");
//           if (onProgress) {
//            onProgress(progress); // 진행률 콜백 호출
//          }
//         },
//         (error: any) => {
//           console.log(error, 'error');
//           reject(error);
//         },
//         async() => {
//          await getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
//             console.log('File available at', downloadUrl);
//             resolve(downloadUrl); // Resolve the promise with the download URL
//           });
//         }
//       );
//     });
//   } catch (error) {
//     console.log(error, 'uploadImage');
//     throw error;
//   }
//  };
 
 
//  export const deleteImageStorage = async (downloadUrl: string) => {
   
//   try {
//     // 파일을 가리키는 참조 만들기
//     const storageRef = ref(FIREBASE_STORAGE, downloadUrl);
 
//     const checkUrl = await getDownloadURL(storageRef);
//      console.log('checkUrl-deleteImageStorage!!!!!!!!!!!!!',typeof checkUrl);
 
//    if(checkUrl ==="" || checkUrl === null){
//      console.log('No such document!');
//      return;
//    }
    
//     // 파일 삭제
//     await deleteObject(storageRef);
    
//     console.log('Image successfully deleted');
//   } catch (error) {
//     console.log(error, 'deleteImage');
//     throw error;
//   }
//  };
 
 
 






// // isToday 만 먼저 올리기
// export const saveIsToday = async ({date, month, isToday}: any) => {
//  try {
//    const email = await AsyncStorage.getItem('email');
//    if (!email) return;

//    const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
   
//    // 새로운 문서 생성 or 기존 문서에 필드 추가 (merge: true로 다른 필드 유지)
//    await setDoc(docRef, { isToday ,date}, { merge: true });
//    console.log('isToday saved successfully');
//  } catch (error) {
//    console.log('Error saving isToday: ', error);
//  }
// };



// //isToday Update
// export const updateIsToday = async ({ date, month, isToday }:any) => {
//   try {
//     const email = await AsyncStorage.getItem('email');
//     if (!email) return;

//     console.log(date, month, isToday, 'updateIsToday');

//     // Firestore 컬렉션 참조 가져오기
//     const userCollectionRef = collection(FIRESTORE_DB, `users/${email}/${month}`);
//     const allDocsSnapshot = await getDocs(userCollectionRef);

//     // 모든 문서의 isToday를 false로 업데이트
//     const updatePromises = allDocsSnapshot.docs.map(async (docSnap) => {
//       if (docSnap.exists() && docSnap.id !== date) {
//         await updateDoc(docSnap.ref, {
//           isToday: false,
//         });
//       }
//     });

//     // 모든 문서 업데이트가 완료될 때까지 기다림
//     await Promise.all(updatePromises);

//     // 오늘 날짜 문서의 isToday를 true로 업데이트
//     const todayDocRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
   
//     const todayDocSnap = await getDoc(todayDocRef);
//     if (!todayDocSnap.exists()) {
//       console.log('No such document!');
//       return;
//     }
// //  await setDoc(todayDocRef, { isToday ,date}, { merge: true });
//     await updateDoc(todayDocRef, 
//       {
//        isToday:true, // 오늘 날짜 문서의 isToday 필드를 업데이트
//     },

  
//   );

//     console.log('isToday updated successfully');
//   } catch (error) {
//     console.log('Error updating isToday: ', error);
//   }
// };






// // export const updateIsToday = async ({date, month, isToday}: any) => {
// //  try {
 
// //    const email = await AsyncStorage.getItem('email');
// //    if (!email) return;
// //  console.log(date,month,isToday,'updateIsToday')
// //    const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);
// //    const docSnap = await getDoc(docRef);
// //     if (!docSnap.exists()) {
// //       console.log('No such document!');
// //       return;
// //     }
// //    // 'isToday' 필드만 업데이트
// //    await updateDoc(docRef, {
// //      isToday: isToday,  // 다른 필드는 유지되고, 이 필드만 업데이트됨
// //    });
// //    console.log('isToday updated successfully');
// //  } catch (error) {
// //    console.log('Error updating isToday: ', error);
// //  }
// // };

// //photo Update

// export const updatePhoto = async ({date, month}: any) => {
//   console.log('updatePhoto')
//  try {
  
//    const email = await AsyncStorage.getItem('email');
//    if (!email) return;

//    const docRef = doc(FIRESTORE_DB, `users/${email}/${month}/${date}`);

//    // 'isToday' 필드만 업데이트
//    await updateDoc(docRef, {
//      photo: "",  // 다른 필드는 유지되고, 이 필드만 업데이트됨
//    });
//    console.log('isToday updated successfully');
//  } catch (error) {
//    console.log('Error updating isToday: ', error);
//  }
// };



