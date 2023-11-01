import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Spinner
} from "@chakra-ui/react";
import { toast } from 'react-toastify';
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";

const add_url = `${import.meta.env.VITE_SERVER_URL}/categories/managers/add-category`
const edit_url = `${import.meta.env.VITE_SERVER_URL}/categories/managers/update-category`

function ModalCategories({ onClose, isOpen , category , setSendNewRequest}) {

    const initialValue = {
        category_name: category ? category.category_name : ''
    }
    
const [values,setValues] = useState(initialValue);

const [loading,setLoading] = useState(false);

const handleChange = (e) => {
        const { value, name } = e.target;
        setValues(() => ({ ...values, [name]: value }));
};

async function handleSubmitCategory(e){
    e.preventDefault();
try {
    setLoading(true);
    const response = await axios({
        url:category ? `${edit_url}/${category._id}` : add_url,
        method:category ? 'put' : 'post',
        data:values
    });

    if(!response.data.success){
        throw new Error(response.data.error)
    };

    setSendNewRequest(prev => !prev)

    toast.success(response.data.message,{
        position:'top-center',
        theme:'colored',
        autoClose:1000
    })

    setValues({
        category_name:''
    })
    setLoading(false);
    onClose()
} catch (error) {
    setLoading(false);
    toast.error(error.response.data.error,{
        position:'top-center',
        theme:'colored',
        autoClose:1000
    })
}
}

useEffect(() => {
    setValues(initialValue)
},[category])


  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>{category ? 'Update' : 'Create'} Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <Box padding={4} as='form' onSubmit={handleSubmitCategory}>
          <FormControl isRequired>
            <FormLabel>Category Name</FormLabel>
            <Input
            value={values.category_name}
            name="category_name"
            placeholder="Category Name" 
            onChange={handleChange}
            />
          </FormControl>
          <Button colorScheme="teal" marginTop={4} type="submit">
          {category ? 'Edit' : 'Add'}
          </Button>
          {loading && <Spinner color="red.500" />}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalCategories;
