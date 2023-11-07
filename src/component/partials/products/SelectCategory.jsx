import {
    Button,
    Divider,
    FormControl,
    FormLabel,
    ListItem,
    Select,
    Spinner,
    UnorderedList
  } from '@chakra-ui/react';
  import axios from 'axios';
import { useEffect, useState } from 'react';
import useFetch from '../../../hooks/useFetch';

const url = `${import.meta.env.VITE_SERVER_URL}/categories/managers/all`

function SelectCategory({chosenCategories ,setChosenCategories, values ,setValues}) {
  
    const [data,isLoading,error] = useFetch(url)

    useEffect(() => {
        const arr = [];

        chosenCategories.map((cc) => {
            arr.push({
                category:cc._id
            })
        })
        setValues(() => {
            return{
                ...values,categories:arr
            }
        })
    },[chosenCategories])

   

  return (
   <>
   {isLoading && <Spinner color='red.500' />}

   { error && <span>{error.message}</span> }

   {data && (
    <>
      <FormControl marginTop={4}>
      <FormLabel>Categories</FormLabel>
      <Select 
      onChange={(e) => {
        const obj = JSON.parse(e.target.value);
        //בודק עם הקטגוריה קיימת כבר המערך 
        //אם כן אז אני לא מוסיף אותה שוב למערף
        const exists = chosenCategories.some((cc) => {
            return cc._id === obj._id
        })

        if(!exists){
         setChosenCategories(() => {
            return [...chosenCategories,obj]
        })
    }
}}
      placeholder='Select Category'
      >
       {data.categories.map((category) => (
        <option 
        key={category._id}
        value={JSON.stringify(category)}
        >{category.category_name}</option>
       ))}
      </Select>
    </FormControl>

    <Divider />

    <UnorderedList>
      {chosenCategories.map((category) => (
        <ListItem key={category._id}>
        {category.category_name}
        <Button
        onClick={() => {
            const filteredChosen = chosenCategories.filter((cc) => {
                return category._id !== cc._id
            })
            setChosenCategories(filteredChosen)
        }}
        >
            X
        </Button>
        </ListItem>
      ))}
    </UnorderedList>
</>
   )}
   </>
  )
}

export default SelectCategory