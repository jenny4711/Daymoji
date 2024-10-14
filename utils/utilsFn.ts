

export const checkData=(data:any)=>{
  const checkStory = data?.story === undefined || data?.story === '';
  const checkPhoto = data?.photo?.length === 0 || data?.photo === undefined;
  const checkEmotion = data?.emotion === undefined || data?.emotion === '';
 if(checkStory && checkPhoto && checkEmotion){
   return false
 }
  return true


}