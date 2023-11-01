import {
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Heading,
    Box,
    useDisclosure
  } from "@chakra-ui/react";
import ModalCategories from "../../common/modal/ModalCategories";
import { toast } from 'react-toastify';
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";

function CategoriesTable({ data }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [category,setCategory] = useState(null)
    const { setSendNewRequest } = useContext(AuthContext);

    function openCategoryModal(cat){
    setCategory(cat);
    onOpen();
    }

    async function deleteCategory(id){
      try {
        const response = await axios.delete(
          `${import.meta.env.VITE_SERVER_URL}/categories/managers/delete-category/${id}`
        );
  
        if (!response.data.success) {
          throw new Error(response.data.error);
        }
        
        setSendNewRequest(prev => !prev)

        toast.success(response.data.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 1000
        });

      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
          theme: "colored",
          autoClose: 1000
        });
      }
    }

  return (
    <Container maxW="container.xl">
        <Heading my={5}>Categories:</Heading>
        <Box textAlign={'right'}>
           <Button
          onClick={() => openCategoryModal(null)}
           >Add Category</Button>
        </Box>
        <Table variant="striped" maxW={'xl'} mx={'auto'}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>{item.category_name}</Td>
                <Td>
                  <Button
                    mx={2}
                    colorScheme="teal"
                    onClick={() => openCategoryModal(item)}
                  >
                    Edit
                  </Button>
                  <Button
                    mx={2}
                    colorScheme="red"
                    onClick={() =>
                      confirm("are u sure to delete this category?") &&
                      deleteCategory(item._id)
                    }
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <ModalCategories
        onClose={onClose}
        isOpen={isOpen}
        category={category}
        setSendNewRequest={setSendNewRequest}
        />
      </Container>
  )
}

export default CategoriesTable