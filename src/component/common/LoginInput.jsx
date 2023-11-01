import {
  FormControl,
  FormErrorMessage,
  FormLabel
} from "@chakra-ui/form-control";
import {InputRightElement , InputGroup } from '@chakra-ui/react'
import { CheckIcon } from "@chakra-ui/icons";
import { Input } from "@chakra-ui/input";
import { Field, useField } from "formik";

function LoginInput({label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.touched && meta.error}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
      <Input as={Field} {...field} {...props}/>
      {
        meta.value && !meta.error &&
        <InputRightElement>
        <CheckIcon color="green.500" />
      </InputRightElement>
      }
      </InputGroup>
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default LoginInput;
