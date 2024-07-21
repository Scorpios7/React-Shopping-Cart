import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { ShoppingCartProvider } from './context/ShoppingCartContext.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <BrowserRouter>
        <ShoppingCartProvider>
          <App />
        </ShoppingCartProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>,
)
