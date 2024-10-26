import {useState} from "react";
import {useAuthContext} from "./useAuthContext";

export const useSignUp = ()=>{
  const [rerror,setRerror] = useState(null);
  const [isRloading,setIsLoading] = useState(null);
  const {dispatch} = useAuthContext()
  const signup = async(email,name,password,cpassword)=>{
    setIsLoading(true);
    setRerror(null);

    const response = await fetch("/api/auth/register",{
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email,name,password})
    });

    const json = await response.json()

    if(!response.ok)
    {
      setIsLoading(false)
      setRerror(json.error)
    }
    if(response.ok)
    {
      localStorage.setItem('user',JSON.stringify(json))
      dispatch({type:'LOGIN',payload:json})
      setIsLoading(false);
    }
  }
  return {signup,isRloading,rerror};
}