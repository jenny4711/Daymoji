import { getData ,saveDiaryEntry,deletedItem,deletedAllItem} from '~/utils/fireStoreFn';
import { useQuery, useQueryClient ,useMutation, UseQueryOptions } from '@tanstack/react-query';
import { useNavigation } from 'expo-router';








export const useData=(month:any)=>{

  return useQuery({
    queryKey:["data",month],
    queryFn: () => {
      if (!month) {
        return '' || []; 
      }
      return getData(month);
    },
    enabled: !!month,
    staleTime:1000*60*60*24,
    
    select:(data)=>{
      
      return data ||[];
  
}

  })
}



export const useSaveData=({date,emotion,story,photo,month,email}:any)=>{
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ date, emotion, story, photo, email, month }: { date: any; emotion: any; story: any; photo: any; email: any; month: any; }) => {
      return saveDiaryEntry({ date, emotion, story, photo, email, month });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['data',month]})
    },
  });
}
  

export const useDeletedData=({date,month}:any)=>{
  const queryClient = useQueryClient();
 const navigation=useNavigation()
  return useMutation({
    mutationFn: ({ date, month }: { date: any; month: any; }) => {
      return  deletedItem(date, month);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['data',month]})
      queryClient.refetchQueries({ queryKey: ['data', month] });
     return  (navigation as any).navigate('main')
    },
  });
}

export const useDeletedAllData=(month:any)=>{
  const queryClient = useQueryClient();
 const navigation=useNavigation()
 const monthArr=['1','2','3','4','5','6','7','8','9','10','11','12']
  return useMutation({
    mutationFn: () => {
      return  deletedAllItem(month);
    },
    onSuccess: async() => {
     
      await Promise.all(monthArr.map(mon => queryClient.refetchQueries({ queryKey: ['data', mon] })));
      await queryClient.invalidateQueries();
    
  
      
      
    },
    onSettled:async()=>{
     

      await queryClient.invalidateQueries();
      await Promise.all(monthArr.map(mon => queryClient.refetchQueries({ queryKey: ['data', mon] })));
      (navigation as any).replace('main');

     
    },
    onError:(error)=>{
      console.log('error-allDeleted',error)
    }
  });
}