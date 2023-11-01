import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './context/AuthContext.jsx';




ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider>
    <AuthContextProvider>
      <ToastContainer />
      <App />
    </AuthContextProvider>
  </ChakraProvider>
)
