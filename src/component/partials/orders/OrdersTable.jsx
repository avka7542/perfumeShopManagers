import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ButtonGroup,
  Button,
  Container,
  Heading,
  Select,
  Text,
  Divider,
  InputRightElement,
  Input,
  InputGroup,
  HStack,
  useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import { SearchIcon, ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import ModalOrder from "../../common/modal/ModalOrder";
import OrdersPagination from "./OrdersPagination";
import {Helmet} from "react-helmet";

function OrdersTable({ orders, changeStatus }) {
  const [filterStatus, setFilterStatus] = useState(null);
  //עושים שימוש בסטייט להריץ את המערך של ההזמנות
  const [dataOrders, setDataOrders] = useState([...orders]);
  //state שהאינפוט של החיפוש משנה
  const [searchTerm, setSearchTerm] = useState("");
  //סטייט שמייצג לנו את המצב מהגדול אל הקטן או ההפך
  const [sort, setSort] = useState("ASC");
  // מייצג לנו את האינדקס לפי איזה רשומה אנחנו רוצים למיין
  const [sortIndex, setSortIndex] = useState(null);
  // סטייט בשביל המודל
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [order, setOrder] = useState(null);
  const { colorMode } = useColorMode();

  const [currentPage,setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(4)

  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = dataOrders.slice(indexOfFirstOrder,indexOfLastOrder)

  const getOrder = (ord) => {
    setOrder(ord)
    onOpen()
  }

  const sortColumnInTable = (col, nestedCol) => {
    if (sort === "ASC") {
      const sorted = dataOrders.sort((a, b) => {
        if (nestedCol) {
          return a[nestedCol][col] > b[nestedCol][col] ? 1 : -1;
        } else {
          return a[col] > b[col] ? 1 : -1;
        }
      });
      setDataOrders(sorted);
      setSort("DESC");
    }
    if (sort === "DESC") {
      const sorted = dataOrders.sort((a, b) => {
        if (nestedCol) {
          return a[nestedCol][col] > b[nestedCol][col] ? -1 : 1;
        } else {
          return a[col] > b[col] ? -1 : 1;
        }
      });
      setDataOrders(sorted);
      setSort("ASC");
    }
  };

  useEffect(() => {
    orders.map((order) => (order.order_number = order.order_number.toString()));
    
    //כאן אני מייצר משתנה שמכיל את המערך אחרי סינון
    const searchResults = orders.filter(
      (order) =>
        order.customer_details.customer_name.includes(searchTerm) ||
        order.customer_details.customer_phone.includes(searchTerm) ||
        order.order_number.includes(searchTerm)
    );
    //פה אני משנה את הסטייט שאחראי על ייצוג ההזמנות
    setDataOrders(searchResults);
  }, [searchTerm]);

  useEffect(()=> {
    setDataOrders([...orders])
  },[orders])

  return (
      <>
       <Helmet>
            <title>Orders</title>
            <meta name="description" content="Nested component" />
        </Helmet>
    <Container maxW="container.xl">
      <Heading>Orders:</Heading>
      <Text mb={2.5}>total:{orders.length}</Text>
      <Divider />
      <HStack justifyContent={"space-between"}>
        <ButtonGroup my={5}>
          <Button
            variant={filterStatus === null ? "solid" : "outline"}
            onClick={() => setFilterStatus(null)}
            colorScheme="teal"
          >
            All
          </Button>
          <Button
            variant={filterStatus === 1 ? "solid" : "outline"}
            onClick={() => setFilterStatus(1)}
            colorScheme="yellow"
          >
            New
          </Button>
          <Button
            variant={filterStatus === 2 ? "solid" : "outline"}
            onClick={() => setFilterStatus(2)}
            colorScheme="purple"
          >
            Process
          </Button>
          <Button
            variant={filterStatus === 3 ? "solid" : "outline"}
            onClick={() => setFilterStatus(3)}
            colorScheme="green"
          >
            Done
          </Button>
          <Button
            variant={filterStatus === 4 ? "solid" : "outline"}
            bg={colorMode === "dark" && filterStatus === 4 && "white"}
            onClick={() => setFilterStatus(4)}
            colorScheme={colorMode === "dark" ? "white" : "blackAlpha"}
          >
            Canceled
          </Button>
        </ButtonGroup>
        <InputGroup maxW={480}>
          <Input
            placeholder="search by order number, customer name, customer phone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement>
            <SearchIcon />
          </InputRightElement>
        </InputGroup>
      </HStack>
      <Divider />
      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th
                onClick={() => {
                  sortColumnInTable("order_number");
                  setSortIndex(1);
                }}
              >
                <HStack>
                  <span>Order Number</span>
                  {sortIndex === 1 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 1 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th
                onClick={() => {
                  sortColumnInTable("created_at");
                  setSortIndex(2);
                }}
              >
                <HStack>
                  <span>Date</span>
                  {sortIndex === 2 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 2 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th
                onClick={() => {
                  sortColumnInTable("customer_name", "customer_details");
                  setSortIndex(3);
                }}
              >
                <HStack>
                  <span>Customer Name</span>
                  {sortIndex === 3 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 3 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th
                onClick={() => {
                  sortColumnInTable("customer_phone", "customer_details");
                  setSortIndex(4);
                }}
              >
                <HStack>
                  <span>Customer Phone</span>
                  {sortIndex === 4 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 4 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th>Customer Adresss</Th>
              <Th
                onClick={() => {
                  sortColumnInTable("total_price");
                  setSortIndex(5);
                }}
              >
                <HStack>
                  <span>Total</span>
                  {sortIndex === 5 && sort === "ASC" && <ArrowDownIcon />}
                  {sortIndex === 5 && sort === "DESC" && <ArrowUpIcon />}
                </HStack>
              </Th>
              <Th>status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentOrders
              .filter((order) => {
                if (filterStatus === null) {
                  return order;
                } else if (filterStatus === 1) {
                  return order.status === 1;
                } else if (filterStatus === 2) {
                  return order.status === 2;
                } else if (filterStatus === 3) {
                  return order.status === 3;
                } else if (filterStatus === 4) {
                  return order.status === 4;
                }
              })
              .map((order, index) => (
                <Tr key={order._id}>
                  <Td>{index + 1}</Td>
                  <Td
                  color={'blue'}
                  cursor={'pointer'}
                  onClick={() => getOrder(order)}
                  >{order.order_number}</Td>
                  <Td>
                    {new Date(order.created_at).toLocaleString("en-US", {
                      weekday: "short",
                      month: "short",
                      year: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </Td>
                  <Td>{order.customer_details.customer_name}</Td>
                  <Td>{order.customer_details.customer_phone}</Td>
                  <Td>
                    {order.customer_details.customer_address.street + " "},
                    {order.customer_details.customer_address.building + " "},
                    {order.customer_details.customer_address.city}
                  </Td>
                  <Td>{order.total_price}</Td>
                  <Td>
                    <Select
                      value={order.status}
                      bg={
                        order.status === 1
                          ? "yellow.100"
                          : order.status === 2
                          ? "purple.100"
                          : order.status === 3
                          ? "green.100"
                          : "blackAlpha.100"
                      }
                      onChange={(e) => {
                        changeStatus(order._id, e.target.value);
                      }}
                    >
                      <option value="1">New</option>
                      <option value="2">Processing</option>
                      <option value="3">Done</option>
                      <option value="4">Canceled</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
        <OrdersPagination
          ordersPerPage={ordersPerPage}
          currentPage={currentPage}
          totalUsers={dataOrders.length}
          setCurrentPage={setCurrentPage}
      />
      </TableContainer>
    
      <ModalOrder
      isOpen={isOpen}
      onClose={onClose}
      order={order}
      changeStatus={changeStatus}
      />
    </Container>
    </>
  );
}

export default OrdersTable;
