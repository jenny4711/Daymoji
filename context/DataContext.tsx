import React, { createContext, useContext, useState,useEffect } from 'react';


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
}

const DateContext = createContext<DateContextType>('' as any);

export const DateProvider = ({ children }: any) => {
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
 useEffect(()=>{
  if(dateF !== '' ){
  
    const showDate = orgDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' ,day:'numeric'});
  
    setDateWithLang(showDate)
    
  }
},[dateF])

  return (
    <DateContext.Provider value={{visible,setVisible,headerTitle,setHeaderTitle,email,setEmail,token,setToken,prevDate,setPrevDate, monthF, setMonthF, dateF, setDateF,newAData,setNewAData,dateWithLang,setDateWithLang ,orgDate,setOrgDate}}>
      {children}
    </DateContext.Provider>
  );
};

// Context 소비를 위한 Hook
export const useDateContext = () => useContext(DateContext);