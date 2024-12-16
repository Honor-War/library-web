import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import TransacQrForm from "./TransacQrForm";
import Form from "./FigmaForm";
import MyBooks from "./FigmaBooks";
import FigmaBook from "./FigmaBook";
import FigmaInfo from "./FigmaInfo";
import SignUp from "./SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Borrow" element={<Form />} />
      <Route path="/MyBooks" element={<MyBooks />} />
      <Route path="MyBooks/TransactionQr" element={<TransacQrForm />} />
      <Route path="/Book" element={<FigmaBook />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/info" element={<FigmaInfo />} />

    </Routes>
  );
};

export default App;
