import axios from "axios";
import {useCookies } from 'react-cookie'
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [sendNewRequest, setSendNewRequest] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
   if(cookies.token) {
    const authUser = async () => {
      try {
     
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/users/managers/auth`,
          {
            headers:{
              Authorization:`Bearer ${cookies.token}`
            }
          }
        );

        const data = response.data

        if(!data.success){
          removeCookie("token");
          throw new Error(`${data.message} : ${data.error}`);
        }

        setUser(data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
       
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
    authUser();
   }
  },[cookies])

  const login = async (loginDetails) => {
    try {
        setIsLoading(true);
        const response =
         await axios.post
         (`${import.meta.env.VITE_SERVER_URL}/users/managers/login`
         ,loginDetails,{
            headers: {
                "Content-Type":"application/json"
            }
         });

         const data = response.data;

         if(!data.success){
          throw new Error(`${data.message} : ${data.error}`)
         }

         toast.success(`${data.manager.manager_name}-${data.message}`,{
          position:"top-center",
          autoClose:2000,
          theme:'light'
         })

        setUser(data.manager);
        setCookie("token",data.token,{path:'/'})
        setIsAuthenticated(true)
        setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
        toast.error(`${error.response.data.message}`,{
          position:"top-center",
          autoClose:2000,
          theme:'light'
         })
    }
  };

  const logout = () => {
    try {
        setIsAuthenticated(false);
        setUser({});
        removeCookie("token");
    } catch (error) {
        console.log(error)
    }
  } 

  const value = {
    login,
    isLoading,
    sendNewRequest,
    setSendNewRequest,
    isAuthenticated,
    user,
    logout,
    searchTerm,
    setSearchTerm
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
