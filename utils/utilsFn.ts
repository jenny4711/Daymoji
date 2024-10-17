import {updateIsToday,saveIsToday} from '../utils/fireStoreFn'

export const checkData=(data:any)=>{
  const checkStory = data?.story === undefined || data?.story === '';
  const checkPhoto = data?.photo?.length === 0 || data?.photo === undefined;
  const checkEmotion = data?.emotion === undefined || data?.emotion === '';
 if(checkStory && checkPhoto && checkEmotion){
   return false
 }
  return true


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

await updateIsToday({date:yesterday,month:yesterdayMonth,isToday:false})
await saveIsToday({date:currentDate,month,isToday:true})

console.log('todayDate',currentDate)
console.log('yesterdayDate',yesterday)
console.log('handleTodayDate!!!!!!!!!!!!!!!!!!!!!!!')




  }catch(error){console.log(error)}
}