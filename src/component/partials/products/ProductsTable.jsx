import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  Image,
  ButtonGroup,
  Button,
  useDisclosure,
  Container,
  Box,
  Heading
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import ModalEditProduct from '../../common/ModalEditProduct'
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import Pagination from "./Pagination";
import {Helmet} from "react-helmet";
import axios from "axios";


function ProductsTable({ products }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [toggle, setToggle] = useState(false);
  const [product, setProduct] = useState({});
  const { setSendNewRequest } = useContext(AuthContext);
  //pagination states
  const [currentPage,setCurrentPage] = useState(1);
  const [productPerPage] = useState(4)

  //מה האינדקס של המוצר האחרון בדף
  const indexOfLastProduct = currentPage * productPerPage
  //מה האינדקס של המוצר הראשון בדף
  const indexOfFirstProduct = indexOfLastProduct - productPerPage
  //מניפולציה על המערך להחזיר את המוצרים מאינדקס עד אינדקס
  const currentProducts = products.slice(indexOfFirstProduct,indexOfLastProduct)
  

  const handleOpenModal = (product) => {
    product && setProduct(product);
    !product && setProduct(null)
    onOpen();
  };

  const deleteProduct = async(id) => {
    try {
      await axios.delete
      (`${import.meta.env.VITE_SERVER_URL}/products/managers/delete/${id}`);
      setSendNewRequest(prev => !prev)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Helmet>
            <title>Product</title>
            <meta name="description" content="Nested component" />
        </Helmet>
    <Container maxW='container.xl'>
    <Heading>Products:</Heading>
    <Box textAlign='right'>
    <Button
    onClick={() => handleOpenModal()}
    >Create Product</Button>
    </Box>
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Price</Th>
            <Th>OnSale</Th>
            <Th>Image</Th>
            <Th>Action</Th>
            {/* <Th>Description</Th> */}
          </Tr>
        </Thead>
        <Tbody >
          {currentProducts.map((product) => (
            <Tr key={product._id}>
              <Th>{product.product_name}</Th>
              <Th>{product.product_price}</Th>
              <Th >{product.product_onsale}</Th>
              <Th>
                <Image
                  objectFit="cover"
                  boxSize="50px"
                  src={product.product_image}
                  alt={product.product_name}
                  />
              </Th>
              <Th>
                <ButtonGroup>
                  <Button>
                    <DeleteIcon color="red.300" onClick={()=> deleteProduct(product._id)}/>
                  </Button>
                  <Button onClick={() => handleOpenModal(product)}>
                    <EditIcon color="blue.300" />
                  </Button>
                </ButtonGroup>
              </Th>
                  {/* <Th>{product.product_description}</Th> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <ModalEditProduct
        isOpen={isOpen}
        onClose={onClose}
        product={product}
      />
     
    </TableContainer>
    <Pagination
    productPerPage={productPerPage}
    currentPage={currentPage}
    totalProducts={products.length}
    setCurrentPage={setCurrentPage}
    />
    </Container>
    </>
  );
}

export default ProductsTable;
