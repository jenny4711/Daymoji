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
    staleTime:0,
    
    select:(data)=>{
      
      return data ||[];
  
}

  })
}
// export const useAdayData=({date}:any)=>{
 
//   return useQuery({
//     queryKey:["aDayData",date],
//     queryFn:async () => {
     
//       if (!date ) {
//         return null || {}; 
//       }
//       const data = await getAdayData({date});
  
//       return data
//     },
//     enabled: !!date ,
//     // staleTime:0,
    
//     select:(data)=>{
//       console.log(data,'data##')
//       if(data === undefined || data === null){
//         console.log('data is null')
//         return {};
//       }
//       console.log(data,'data!')
//       return data 
      
//     }
//   })
// }



// export const useAdayData = ({ date }: any) => {
//   return useQuery({
//     queryKey: ["aDayData", date],
//     queryFn: async () => {
//       console.log('Fetching data for:', date);
//       if (!date) {
//         return null;  // date가 없으면 null 반환
//       }
//       const data = await getAdayData({ date });
//       console.log('Data fetched from getAdayData:', data);
//       return data ?? {};  // getAdayData에서 반환된 데이터를 그대로 반환
//     },
//     enabled: !!date,  // date가 있을 때만 쿼리 실행
//      staleTime: 0,     // 항상 최신 데이터 사용
//     select: (data) => {
//       console.log('Inside select with data:', data);  // data가 무엇인지 확인
//       if (!data) {
//         console.log('Data is undefined or null inside select');
//         return {};  // undefined나 null일 경우 빈 객체 반환
//       }
//       // 정상적인 데이터 처리
//       console.log('Returning processed data:', data);
//       return data;  // data가 존재하면 그대로 반환
//     },
//   });
// };

// export const useAdayData = ({ date }: any) => {
//   return useQuery({
//     queryKey: ["aDayData", date],
//     queryFn: async () => {
   
//       if (!date) {
//         return null;  // date가 없으면 null 반환
//       }
//       const data = await getAdayData({ date });
//       const { emotion, story, photo } = data;
//       console.log('Data fetched from getAdayData:', data);
//    return { emotion, story, photo }
//     },
//     enabled: !!date, 
//     // staleTime: 0,     
   
//     select: (data) => {
//       console.log('Inside selecddddddddddddwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww with data:', data);  // data가 무엇인지 확인
//       if (data === undefined || data === null ) {
//         console.log('Data is undefined or null inside select');
//         return {};  // undefined나 null일 경우 빈 객체 반환
//       }
//       console.log('Returning processed data:', data);
//       return data;  // data가 존재하면 그대로 반환
//     },
//     refetchOnWindowFocus: false, // 윈도우 포커스 시 재조회 방지 (필요 시)
//   });
// };
export const useAdayData = ({ date }: any) => {
  return useQuery<{ emotion: any; story: any; photo: any }, Error>({
    queryKey: ["aDayData", date],
    queryFn: async () => {
      if (!date) {
        throw new Error('No date provided');  // 명시적으로 에러 던지기
      }

      const data = await getAdayData({ date });

      if (!data) {
        throw new Error('No data found for the given date');  // 명시적으로 에러 던지기
      }

      const { emotion, story, photo } = data;
      return { emotion, story, photo };  // 정상 데이터 반환
    },
    enabled: !!date,
    staleTime: 0,
    refetchOnWindowFocus: true,

  

    select: (data) => {
      console.log('Inside select with data:', data);
      return data;
    },
  });
};










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