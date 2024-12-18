import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import TransacQrForm from "./TransacQrForm";
import Form from "./FigmaForm";
import MyBooks from "./FigmaBooks";
import FigmaBook from "./FigmaBook";
import FigmaInfo from "./FigmaInfo";
import SignUp from "./SignUp";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { networkConfig, network } from "./config/index.ts"
import "@mysten/dapp-kit/dist/index.css";
const queryClient = new QueryClient();

const App = () => {
  return (

    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={network}>
        <WalletProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Borrow" element={<Form />} />
              <Route path="/MyBooks" element={<MyBooks />} />
              <Route path="/Book" element={<FigmaBook />} />
            </Routes>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>

  );
};

export default App;

