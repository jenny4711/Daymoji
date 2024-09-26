import { getData ,getAdayData,saveDiaryEntry,deletedItem,deletedAllItem} from '~/utils/fireStoreFn';
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

// export const useAdayData = ({ date }: any) => {
//   return useQuery<{ emotion: any; story: any; photo: any }, Error>({
//     queryKey: ["aDayData", date],
//     queryFn: async () => {
//       if (!date) {
//         throw new Error('No date provided');  // 명시적으로 에러 던지기
//       }

//       const data = await getAdayData({ date });

//       if (!data) {
//         throw new Error('No data found for the given date');  // 명시적으로 에러 던지기
//       }

//       const { emotion, story, photo } = data;
//       return { emotion, story, photo };  // 정상 데이터 반환
//     },
//     enabled: !!date,
//     staleTime: 0,
//     refetchOnWindowFocus: true,

  

//     select: (data) => {
//       console.log('Inside select with data:', data);
//       return data;
//     },
//   });
// };










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
  return useMutation({
    mutationFn: () => {
      return  deletedAllItem(month);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['data']})
      queryClient.refetchQueries({ queryKey: ['data'] });
      
      setTimeout(() => {
        (navigation as any).replace('main');
      }, 1000);
    },
  });
}