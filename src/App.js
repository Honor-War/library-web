import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import TransacQrForm from "./TransacQrForm";
import Form from "./FigmaForm";
import MyBooks from "./FigmaBooks";
import FigmaBook from "./FigmaBook";
import FigmaInfo from "./FigmaInfo";
import SignUp from "./SignUp";
import { WalletKitProvider } from '@mysten/wallet-kit';
const App = () => {
  return (
    <WalletKitProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Borrow" element={<Form />} />
        <Route path="/MyBooks" element={<MyBooks />} />
        <Route path="/Book" element={<FigmaBook />} />

      </Routes>

    </WalletKitProvider>


  );
};

export default App;
