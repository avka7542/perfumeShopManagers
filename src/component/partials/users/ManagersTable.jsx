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
  import ModalManager from "../../common/modal/ModalManager";
  import { useContext, useState } from "react";
  import axios from "axios";
  import { AuthContext } from "../../../context/AuthContext";
  import ManagersPagination from "./ManagerPagination";
  import {Helmet} from "react-helmet";
  

 function ManagersTable({data}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toggleModal,setToggleModal] = useState(false);
    const [managerId,setManagerId] = useState(null);
    const { setSendNewRequest } = useContext(AuthContext); 
  
    const [currentPage,setCurrentPage] = useState(1);
    const [managersPerPage] = useState(4)
  
    const indexOfLastManager = currentPage * managersPerPage
    const indexOfFirstManager = indexOfLastManager - managersPerPage
    const currentManagers = data.slice(indexOfFirstManager,indexOfLastManager)
  
    const handleActionManager = (toggleAction,id) => {
      setToggleModal(toggleAction)
      id && setManagerId(id)
      onOpen()
    }
  
    const handleDeleteManager = async(managerId) => {
      try {
        await axios.delete
        (`${import.meta.env.VITE_SERVER_URL}/users/delete-managers/${managerId}`);
        setSendNewRequest(prev => !prev)
       
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
     <Helmet>
            <title>Managers</title>
            <meta name="description" content="Nested component" />
        </Helmet>
    <Container maxW="container.xl">
    <Heading>
      Managers
    </Heading>
    <Box textAlign="right">
    <Button
    onClick={() => handleActionManager(true)}
    >Create Manager</Button>
    </Box>
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Phone</Th>
        </Tr>
      </Thead>
      <Tbody>
        {currentManagers.map((manager) => (
          <Tr key={manager._id}>
            <Td>{manager.manager_name}</Td>
            <Td>{manager.manager_email}</Td>
            <Td maxW={150}>{manager.manager_phone}</Td>
            <Td>
              <Button
                mx={2}
                colorScheme="teal"
                onClick={() => handleActionManager(false,manager._id) }
              >
                Edit
              </Button>
              <Button
                mx={2}
                colorScheme="red"
                onClick={() => handleDeleteManager(manager._id)}
              >
                Delete
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
    <ModalManager
    isOpen={isOpen}
    onClose={onClose}
    toggleModal={toggleModal}
    managerId={managerId}
    />
    <ManagersPagination
    managersPerPage={managersPerPage}
    currentPage={currentPage}
    totalManagers={data.length}
    setCurrentPage={setCurrentPage}
    />
  </Container>
  </>
  )
}

export default ManagersTable