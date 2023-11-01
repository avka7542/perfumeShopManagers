import { Button, ButtonGroup, Heading, VStack ,Spinner } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import LoginInput from "../../component/common/LoginInput";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useCookies } from 'react-cookie'



function Login() {

  const {isLoading,login,isAuthenticated} = useContext(AuthContext);
  const [cookies] = useCookies();

  if(isAuthenticated && cookies.current_page){
    return <Navigate to={`/${cookies.current_page}`} />
  }

  if(isAuthenticated && !cookies.current_page){
    return <Navigate to={`/products`} />
  }

  return (
    <Formik
    initialValues={{ manager_email: "", manager_password: "" }}
    validationSchema={Yup.object({
        manager_email: Yup.string()
        .required("Username required!")
        .min(6, "Username too short!")
        .max(28, "Username too long!")
        .email(),
        manager_password: Yup.string()
        .required("Password required!")
        .min(6, "Password too short!")
        .max(28, "Password too long!"),
    })}
    onSubmit={(values, actions) => {
      login(values)
      actions.resetForm();
    }}
  >
    <VStack
      as={Form}
      w='25%'
      m="auto"
      justify="center"
      h="80vh"
      spacing="1rem"
    >
      <Heading>Log In</Heading>
      <LoginInput
        name="manager_email"
        placeholder="Enter email"
        autoComplete="off"
        label="Email"
        type='email'
      />

      <LoginInput
        name="manager_password"
        placeholder="Enter password"
        autoComplete="off"
        type='password'
        label="Password"
      />

      <ButtonGroup pt="1rem">
        <Button w='96' colorScheme="teal" type="submit">
          Log In
        </Button>
      </ButtonGroup>
      {isLoading && <Spinner color="red.500" />}
    </VStack>
  </Formik>

  )
}

export default Login