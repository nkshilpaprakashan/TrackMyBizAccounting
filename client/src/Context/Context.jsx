import React, { Component }  from 'react';
import { createContext, useState } from "react";


export const MyContext = createContext(null);

export default function MyProvider({children}){
  const [customer, setCustomer ] = useState(null)
  
  return(
    <MyContext.Provider value={{customer,setCustomer}}>
      {children}
    </MyContext.Provider>
  )
}