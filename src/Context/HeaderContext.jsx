import React, { createContext, useState, useContext } from "react";
import iww from "../Assets/Images/iww logo.png"
const HeaderDataContext = createContext()
const HeaderDataProvider = ({children}) => {
    const [colorState, setColorState]=useState("#010b51")
    const [logoImg,setLogoImg]=useState("")
    const [headerTitle,setHeaderTitle]=useState("Iww Group Of Companies")
    const [collapsed, setCollapsed] = useState(false);
  return (
    <HeaderDataContext.Provider value={{colorState, setColorState,logoImg,setLogoImg,headerTitle,setHeaderTitle,collapsed, setCollapsed}}>
        {children}
    </HeaderDataContext.Provider>
  )
}

export  {HeaderDataContext,HeaderDataProvider}