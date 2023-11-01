import { Spinner } from "@chakra-ui/react";
import useFetch from "../../../hooks/useFetch"
import OrdersTable from "../../../component/partials/orders/OrdersTable";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";


const url = `${import.meta.env.VITE_SERVER_URL}/orders/managers/all`
const editStatusUrl = `${import.meta.env.VITE_SERVER_URL}/orders/managers/update-status`

function Orders() {
    const [data , loading , error] = useFetch(url);
    const { setSendNewRequest } = useContext(AuthContext);

    const changeStatus = async(id,value) => {
      try {
        const response = await axios.put(`
        ${editStatusUrl}/${id}`,
        {status:value});

        if(!response.data.success){
          throw new Error(response.data.error)
        }

        setSendNewRequest(prev => !prev)

        toast.success(response.data.message,{
          position:"top-center",
          autoClose:2000,
          theme:'light'
        })
      } catch (error) {
        toast.error(error.response.data.error,{
          position:"top-center",
          autoClose:2000,
          theme:'light'
        })
      }
    }


  return (
   <>
   {loading && <Spinner color="red.500" size='xl' />}

   {error && <h1>{error.message}</h1>}

   {data && <OrdersTable orders={data.orders} changeStatus={changeStatus} />}
   </>
  )
}

export default Orders