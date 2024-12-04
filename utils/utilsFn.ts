import {updateIsToday,saveIsToday,isTodayEventNotToday,getData,findTodayData} from '../utils/fireStoreFn'

export const checkData=(data:any)=>{
  const checkStory = data?.story === undefined || data?.story === '';
  const checkPhoto = data?.photo?.length === 0 || data?.photo === undefined;
  const checkEmotion = data?.emotion === undefined || data?.emotion === '';
 if(checkStory && checkPhoto && checkEmotion){
   return false
 }
  return true


}

export const handleCheckTodayData=async()=>{
  try{
    const {currentDate,month}:any =await getTodayDate()
    const allData:any= await findTodayData(month,currentDate)
    // const check = allData.filter(
    //   (data: any) => String(data.date) === String(currentDate)
    // );

 return allData


  }catch(error){console.log(error)}
}


export const handleTodayDate=async()=>{
  try{
    const today = new Date()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const date = today.getDate()
    
    const dateS = date < 10 ? `0${date}` : date;
    const monthS = month < 10 ? `0${month}` : month;
    const currentDate = `${year}-${monthS}-${dateS}`
    // 어제 날짜 계산 (Date 객체를 사용하여 날짜를 조작)
    const yesterdayDateObj = new Date(today); // 오늘 날짜를 복사
    yesterdayDateObj.setDate(today.getDate() - 1); // 어제로 설정
    // 어제 날짜 형식화
const yesterdayDate = yesterdayDateObj.getDate();
const yesterdayMonth = yesterdayDateObj.getMonth() + 1;
const yesterdayYear = yesterdayDateObj.getFullYear();
const yesterdayDateS = yesterdayDate < 10 ? `0${yesterdayDate}` : yesterdayDate;
const yesterdayMonthS = yesterdayMonth < 10 ? `0${yesterdayMonth}` : yesterdayMonth;
const yesterday = `${yesterdayYear}-${yesterdayMonthS}-${yesterdayDateS}`;
await isTodayEventNotToday()
await updateIsToday({date:currentDate,month,isToday:true})
 await saveIsToday({date:currentDate,month,isToday:true})






  }catch(error){console.log(error)}
}


export const getTodayDate=async()=>{
  try{
    const today = new Date()
    const month = today.getMonth()+1
    const year = today.getFullYear()
    const date = today.getDate()
    
    const dateS = date < 10 ? `0${date}` : date;
    const monthS = month < 10 ? `0${month}` : month;
    const currentDate = `${year}-${monthS}-${dateS}`
 

    return {currentDate,month:monthS,date:dateS}
  }catch(error){console.log(error)}
}

export const fetchInitialData = async (month:any) => {
  // 여기서 필요한 데이터를 비동기적으로 가져오는 로직을 구현합니다.
  // 예를 들어, API 요청이나 로컬 데이터베이스 조회 등을 할 수 있습니다.
  await getData(month)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('fetchInitialData!!!!!!!!!!!!!!!!!!!!!!!')
      // 테스트용으로 1초 뒤에 데이터를 가져온다고 가정합니다.
      resolve("데이터 로딩 성공");
    }, 1000);
  });
};