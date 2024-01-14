import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DataProvider from './redux/store';
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Chat/context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById('root');

const root = ReactDOM.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <DataProvider>
        <ChatProvider>
          <App />
        </ChatProvider>
      </DataProvider>
    </ChakraProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
