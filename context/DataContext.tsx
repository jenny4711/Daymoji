import React, { createContext, useContext, useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Context 생성

interface DateContextType {
  monthF: any;
  setMonthF: (month: any) => void;
  dateF: any;
  setDateF: (date: any) => void;
  newAData:any;
  setNewAData:(data:any)=>void
  dateWithLang:any
  setDateWithLang:any
  orgDate:any
  setOrgDate:(day:any)=>void
  prevDate:any
  setPrevDate:(date:any)=>void
  email:any
  setEmail:(email:any)=>void
  token:any
  setToken:(token:any)=>void
  headerTitle:any
  setHeaderTitle:(title:any)=>void
  visible:any
  setVisible:(visible:any)=>void
  yearF:any
  setYearF:(year:any)=>void
  todayDate:any
  setTodayDate:(date:any)=>void
  preImages:any
  setPreImages:(images:any)=>void
  progress:any
  setProgress:(progress:any)=>void
  isLoading:any
  setIsLoading:(isLoading:boolean)=>void
  allDeleted:any
  setAllDeleted:(deleted:any)=>void
  initialDisplay:any
  setInitialDisplay:(display:any)=>void
  themeMode:any
  setThemeMode:(mode:any)=>void
  loggedIn:boolean | null
  setLoggedIn:(loggedIn:boolean | null)=>void
  readyForShow:any
  setReadyForShow:(ready:any)=>void
}

const DateContext = createContext<DateContextType>('' as any);

export const DateProvider = ({ children }: any) => {
  const [yearF, setYearF] = useState('' as any);
  const [monthF, setMonthF] = useState('' as any);
  const [dateF, setDateF] = useState('' as any);
  const [orgDate,setOrgDate]=useState({} as any)
 const [newAData,setNewAData]=useState({} as any)
 const [dateWithLang,setDateWithLang]=useState('' as any)
const [prevDate,setPrevDate]=useState('' as any)
const [email,setEmail]=useState('' as any)
const [token,setToken]=useState('' as any)
const [headerTitle,setHeaderTitle]=useState('' as any)
const [visible,setVisible]=useState(false)
const [todayDate,setTodayDate]=useState('' as any)
const [preImages,setPreImages]=useState([] as any)
const [isLoading,setIsLoading]=useState(false)  
const [progress,setProgress]=useState(0)
const [allDeleted,setAllDeleted]=useState(false)
const [initialDisplay, setInitialDisplay] = useState(true); 
const [themeMode,setThemeMode]=useState<string>( '')
const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
const [readyForShow,setReadyForShow]=useState(false)

useEffect(()=>{
  const loadTheme = async () => {
    const storedTheme = await AsyncStorage.getItem('themeMode');
    setThemeMode(storedTheme || 'auto');
  };
  loadTheme();
},[])

  return (
    <DateContext.Provider value={{readyForShow,setReadyForShow,loggedIn,setLoggedIn,themeMode,setThemeMode,initialDisplay,setInitialDisplay,allDeleted,setAllDeleted,isLoading,setIsLoading,progress,setProgress,preImages,setPreImages,todayDate,setTodayDate,yearF,setYearF,visible,setVisible,headerTitle,setHeaderTitle,email,setEmail,token,setToken,prevDate,setPrevDate, monthF, setMonthF, dateF, setDateF,newAData,setNewAData,dateWithLang,setDateWithLang ,orgDate,setOrgDate}}>
      {children}
    </DateContext.Provider>
  );
};

// Context 소비를 위한 Hook
export const useDateContext = () => useContext(DateContext);