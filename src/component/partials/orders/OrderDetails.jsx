import {
  Heading,
  Divider,
  Container,
  HStack,
  Text,
  Box,
  Table,
  Tr,
  Th,
  Td,
  Tbody,
  Thead,
  Image,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import {DeleteIcon} from '@chakra-ui/icons'

function OrderDetails({ order ,onClose , deleteOrder , changeStatus}) {
  const [dataOrder, setDataOrder] = useState({ ...order });

const total = dataOrder.products.reduce((total,product) => {
    return total + product.quantity * product.RTP
},0)

  return (
    <>
      <Container maxW={"container.xl"}>
        <Divider />
        <HStack my={5}>
          <Heading size="sm">Customer Details :</Heading>
          <Text>name : {dataOrder?.customer_details?.customer_name}</Text>
          <Text>phone : {dataOrder?.customer_details?.customer_phone}</Text>
          <Text>
            address :
            <span>{dataOrder?.customer_details?.customer_address.street}{" "}</span>
            <span>
              {dataOrder?.customer_details?.customer_address.building}{" "}
            </span>
            <span>{dataOrder?.customer_details?.customer_address.city}</span>
          </Text>
        </HStack>
        <Divider />
        <Heading my={5}>Products :</Heading>
        <Divider />
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>name</Th>
              <Th>quantity</Th>
              <Th>unit price</Th>
              <Th>total price</Th>
              <Th>Image</Th>
            </Tr>
          </Thead>
          <Tbody>
            {dataOrder.products.map((product) => {
              return (
                <Tr key={product?.product?._id}>
                  <Td>{product?.product?.product_name}</Td>
                  <Td>{product.quantity}</Td>
                  <Td>{product.RTP}$</Td>
                  <Td>{product.quantity * product.RTP}$</Td>
                  <Td>
                    <Image
                      boxSize="50"
                      objectFit="cover"
                      src={product?.product?.product_image}
                      alt={product?.product?.product_name}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <Heading my={15} size="sm">
          Total : {total}$
        </Heading>
        <Divider />
        <Heading my={15} size="sm">
          Payment Details :
        </Heading>
        <Divider />
        <Box my={5}>
          <Text as="p">
            terminal number - {dataOrder.payment_details.terminal_number}
          </Text>
          <Text as="p">
            transaction_number - {dataOrder.payment_details.transaction_number}
          </Text>
          <Text as="p">
            transaction_date - {dataOrder.payment_details.transaction_date}
          </Text>
          <Text as="p">
            last_digits - XXXX-XXXX-XXXX-{dataOrder.payment_details.last_digits}
          </Text>
        </Box>
        <HStack spacing={10} justifyContent="center" padding={15} my={25}>
          <Select
             maxW={'24'}
            value={dataOrder.status}
            bg={
              dataOrder.status === 1
                ? "yellow.100"
                : dataOrder.status === 2
                ? "purple.100"
                : dataOrder.status === 3
                ? "green.100"
                : "blackAlpha.100"
            }
            onChange={(e) => {
              const answer = confirm("are u sure ? ");
              if (answer) {
                changeStatus(dataOrder._id, e.target.value);
                setDataOrder((prev_order) => {
                   return {...prev_order,status:parseInt(e.target.value)}
                })
              }
            }}
          >
            <option value="1">New</option>
            <option value="2">Processing</option>
            <option value="3">Done</option>
            <option value="4">Canceled</option>
          </Select>
          <Button colorScheme="red" onClick={()=>{
            const answer = confirm("are you sure to delete this order?");
            if (answer) {
                deleteOrder(dataOrder._id);
                onClose()
            }
          }}>
            <DeleteIcon />
          </Button>
        </HStack>
      </Container>
    </>
  );
}

export default OrderDetails;
