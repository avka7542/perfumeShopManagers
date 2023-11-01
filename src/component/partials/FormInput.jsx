import {
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";

function FormInput({inputType,NumberMargin, isRequired, inputName, handleChange, inputValue, InputLabel }) {
   
   
    return (
        <FormControl isRequired={isRequired} marginTop={NumberMargin}>
            <FormLabel>{InputLabel}</FormLabel>
            <Input
                onChange={handleChange}
                value={inputValue}
                name={inputName}
                placeholder={InputLabel}
                type={inputType}
            />
        </FormControl>
    )
}

export default FormInput