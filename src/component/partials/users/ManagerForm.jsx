import { toast } from "react-toastify";
import {
  Box,
  Button,
  Container,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import FormInput from '../FormInput';
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";


function  ManagerForm({ onClose , url , requestMethod , toggleModal }) {

  const initialValues = {
    manager_name: "",
    manager_password: "",
    manager_password_confirm: "",
    manager_email: "",
    manager_phone: ""
  }

  const [values, setValues] = useState(initialValues);

  const [loading, setLoading] = useState(false);
  const { setSendNewRequest } = useContext(AuthContext)

  const handelChange = (e) => {
    const { name, value } = e.target;
    setValues(() => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios({
        method: requestMethod,
        url: url,
        data: values,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.data.success) {
        throw new Error(response.data.error);
      }

      toast.success(response.data.message, {
        position: "top-center",
        theme: "colored",
      });

      setValues(initialValues);
      setSendNewRequest(prev => !prev)
      onClose()
    } catch (error) {
      toast.error(error.response.data.error, {
        position: "top-center",
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Box as="form" padding={4} onSubmit={handleSubmit}>
        <FormInput
          NumberMargin={0}
          isRequired={toggleModal}
          InputLabel='Manager Name'
          handleChange={handelChange}
          inputValue={values.manager_name}
          inputName='manager_name'
          inputType='text'
        />

        <FormInput
          NumberMargin={4}
          isRequired={toggleModal}
          InputLabel='Manager Email'
          handleChange={handelChange}
          inputValue={values.manager_email}
          inputName='manager_email'
          inputType='email'
        />

        <FormInput
          NumberMargin={4}
          isRequired={toggleModal}
          InputLabel='Password'
          handleChange={handelChange}
          inputValue={values.manager_password}
          inputName='manager_password'
          inputType='password'
        />

        <FormInput
          NumberMargin={4}
          isRequired={toggleModal}
          InputLabel='Password Confirm'
          handleChange={handelChange}
          inputValue={values.manager_password_confirm}
          inputName='manager_password_confirm'
          inputType='password'
        />

        <FormInput
          NumberMargin={4}
          isRequired={toggleModal}
          InputLabel='Phone Number'
          handleChange={handelChange}
          inputValue={values.manager_phone}
          inputName='manager_phone'
          inputType='Number'
        />

        <Button type="submit" marginTop={4} colorScheme="teal">
          {toggleModal ? 'Add Manager' : 'Update'}
        </Button>
      </Box>
      {loading && <Spinner color="red.500" />}
    </Container>
  )
}

export default ManagerForm