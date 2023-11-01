import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react';
import OrderDetails from '../../partials/orders/OrderDetails';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const url = `${import.meta.env.VITE_SERVER_URL}/orders/managers/delete-order`

function ModalOrder({isOpen , onClose , order , changeStatus}) {


    const { setSendNewRequest } = useContext(AuthContext);
    
    const deleteOrder = async(id) => {
        try {
            const response = await axios.delete(`${url}/${id}`)

            if(!response.data.success){
                throw new Error(response.data.error)
            }

            setSendNewRequest(prev => !prev)

            toast.success(response.data.message, {
                position: "top-center",
                theme: "colored",
                autoClose: 1000,
              });
        } catch (error) {
            toast.error(error.response.data.error, {
                position: "top-center",
                theme: "colored",
                autoClose: 1000
              });
        }
    }

  return (
       <>
          <Modal isOpen={isOpen} size={'full'} onClose={onClose}>
                <ModalContent>
                    <ModalHeader>Order : {order?.order_number}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                       <OrderDetails
                       order={order}
                       onClose={onClose}
                       deleteOrder={deleteOrder}
                       changeStatus={changeStatus}
                       />
                    </ModalBody>
                </ModalContent>
            </Modal>
       </>
    )
}

export default ModalOrder