import {
  Container,
  Box,
  Button,
} from "@chakra-ui/react";
import FormInput from '../FormInput';
import { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../../context/AuthContext";
import SelectCategory from "./SelectCategory";


function AddProductForm({
url,
requestMethod,
actionName,
product,
CloseModal
}) {
  
  const initialForm = {
    product_name: product ? product.product_name : "",
    product_description: product ? product.product_description : "",
    product_price: product ? product.product_price : 1,
    product_onsale: product ? product.product_onsale : "",
    product_image: "",
    categories:product ? product.categories : ""
  };

  

  const [values, setValues] = useState(initialForm);
  const [result, setResult] = useState({message:'',success:null});
  const {setSendNewRequest} = useContext(AuthContext);
  const [chosenCategories,setChosenCategories] = useState([]);

  const addForm = useRef()

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const toaster = (bool) => {
    if(bool){
      toast.success(`${result.message}`,{
        position:"bottom-left",
        autoClose:2000,
        theme:'light'
    })
    }
    else{
      toast.error(`${result.message}`,{
        position:"bottom-left",
        autoClose:2000,
        theme:'light'
    })
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formD = new FormData(addForm.current);
    if(product && values.product_image.length === 0){
      formD.append("product_image",product.product_image)
    }
    !product && formD.append("categories",JSON.stringify(chosenCategories));
    try {
      const response = await axios({
        method:requestMethod,
        url:url,
        data:formD,
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
 
        setResult({message:response.data.message,success:true})
        setSendNewRequest(prev => !prev)
        CloseModal()
        
    } catch (error) {
        setResult({message:error.message,success:false})
    }
  }

  useEffect(() => {
    if(result.message != ''){
      result.success ? toaster(true) : toaster(false);
    }
  },[result])

  useEffect(() => {
    if(product){
      setChosenCategories(product.categories)
    }
  },[product])

  return (
    <Container>
      <Box as="form" ref={addForm} onSubmit={handleSubmit}>
        <FormInput
        // isRequired={'isRequired'}
        NumberMargin={0}
        isRequired={true}
        InputLabel='Product Name'
        handleChange={handleChange}
        inputValue={values.product_name}
        inputName='product_name'
        inputType='text'
        />

        <FormInput
        NumberMargin={4}
        isRequired={false}
        InputLabel='Product Description'
        handleChange={handleChange}
        inputValue={values.product_description}
        inputName='product_description'
        inputType='text'
        />

        <FormInput
        NumberMargin={4}
        isRequired={true}
        InputLabel='Product Price'
        handleChange={handleChange}
        inputValue={values.product_price}
        inputName='product_price'
        inputType='number'
        />

        <FormInput
        NumberMargin={4}
        isRequired={false}
        InputLabel='Product OnSale'
        handleChange={handleChange}
        inputValue={values.product_onsale}
        inputName='product_onsale'
        inputType='number'
        />

        <FormInput
        NumberMargin={4}
        isRequired={false}
        InputLabel='Product Image'
        handleChange={handleChange}
        inputValue={values.product_image}
        inputName='product_image'
        inputType='file'
        />

        <SelectCategory
        chosenCategories={chosenCategories}
        setChosenCategories={setChosenCategories}
        values={values}
        setValues={setValues}
        />

        <Button type="submit" marginTop={4} colorScheme="teal">
          {actionName}
        </Button>
      </Box>
      {result.message && <span>{result.message}</span>}
    </Container>
  );
}

export default AddProductForm;
