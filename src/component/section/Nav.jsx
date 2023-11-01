import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaHamburger } from "react-icons/fa";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useContext, useState } from "react";
import ToggleColorMode from "../partials/ToggleColorMode";
import { useColorMode } from '@chakra-ui/color-mode'
import { AuthContext } from "../../context/AuthContext";
import {useCookies } from 'react-cookie'
import {Image } from '@chakra-ui/react'


function Nav() {

  const [isOpen,setIsOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const [ _, setCookie, removeCookie] = useCookies(['current_page']);


  const { colorMode } = useColorMode();

  function openNavBar(){
    setIsOpen((prev) => !prev)
  }

  function saveCurrentPage(page){
    setCookie("current_page",page,{ path: '/'})
    setIsOpen(false)
  }

  const nav_styles = {
    display:[isOpen ? 'flex': 'none','flex'],
    pos:[isOpen ? "absolute" : "relative"],
    bg:[isOpen ? colorMode === 'light' ? 'white' : 'black' : null],
    color:[isOpen ? colorMode === 'light' ? 'black' : 'white' : null],
    height:[isOpen && '100vh'],
    width:'100%',
    zIndex:99,
    top:"0",
    gap: 5,
    p: 7,
  };

  const button_styles = {
    top:5,
    left:5,
    display:["static","none"]
  }

  return (
    <>
    <Button sx={button_styles} onClick={openNavBar}>
      <FaHamburger color={[!isOpen ? colorMode === 'light' ? 'black' : 'white' : null]} size={20} />
    </Button>

      <Flex sx={nav_styles} direction={["column", "row"]}>
        {isOpen && <AiOutlineCloseCircle size={25} onClick={() => setIsOpen(false)} />}
      
        <Link to="/products" onClick={() => saveCurrentPage('products')}>
          <Box as="span">Products</Box>
        </Link>
        <Link to="/users" onClick={() => saveCurrentPage('users')}>
          <Box as="span">Users</Box>
        </Link>
        <Link to="/managers" onClick={() => saveCurrentPage('managers')}>
          <Box as="span">Managers</Box>
        </Link>
        <Link to="/orders" onClick={() => saveCurrentPage('orders')}>
          <Box as="span">Orders</Box>
        </Link>
        <Link to="/categories" onClick={() => saveCurrentPage('categories')}>
          <Box as="span">Categories</Box>
        </Link>
        <Link to="/" 
        onClick={() => {
          logout();
          removeCookie('current_page')
          setIsOpen(false)}
          }>
          <Box as="span">Log Out</Box>
        </Link>
      </Flex>

      <ToggleColorMode />

   
    </>
  );
}

export default Nav;
