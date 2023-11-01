import { useContext, useEffect, useState } from "react";
import {AuthContext} from '../context/AuthContext'
import axios from 'axios'

function useFetch(url) {
 const [data,setData] = useState(null);
 const [isLoading,setIsLoading] = useState(false);
 const [error,setError] = useState(null);
 

 const {sendNewRequest} = useContext(AuthContext)


 useEffect(() => {
    const fetchFromDB = async() => {
        try {
            setIsLoading(true);
            const response = await axios.get(url)
            console.log(response)
            setData(response.data)
        } catch (error) {
            setError(error)
        }
        finally{
            setIsLoading(false)
        }
     }
    fetchFromDB()
 },[sendNewRequest])

 return [data,isLoading,error]
}

export default useFetch;