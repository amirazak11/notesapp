import { createContext, useState,useEffect } from "react";
import jwt_decode from 'jwt-decode';
export let ColorBox = createContext(0);
export function ColorBoxProvider(props){
  let[userData,setuserData]=useState(null);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      saveUser();
    }
  },[])

  function saveUser(){
    let token =localStorage.getItem("token")
    let decoded = jwt_decode(token);
    setuserData(decoded)
  } 
const [theme,setTheme] =useState("dark");
const toggleTheme =() =>{
  setTheme((cur)=>(cur === "light" ? "dark" : "light"));

}


    return <ColorBox.Provider value={{saveUser,userData,setuserData,theme,toggleTheme}} >
        {props.children}
    </ColorBox.Provider>;
}

    
    

export default ColorBoxProvider;








