import React, { useState } from "react";
import QR from "./images/QR.png";
import { ethers } from "ethers";
import { useEffect } from "react";
import load1 from "./images/load1.gif";
import tick from "./images/tick.gif";

const TransationQr = () => {
  let [transactionState, setTransactionState] = useState(0);


  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [feeAmt,setFeeAmt] = useState(0)

  const [people, setPeople] = useState([]);

  const images = [QR, load1, tick];
  const [msg, setMsg] = useState("0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B");

  const [pic, setPic] = useState(images[0]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));



  const reportError = (error) => {
    console.log(JSON.stringify(error), 'red')
    throw new Error(error)
  }
  return (
    <div className="App">
      <h1>Transaction Page</h1>

      <div >
     <div className='container'>
      <div className='box'>
        <h2>Student ID</h2>
        <strong>{studentId}</strong>
      </div>
      <div className='box'>
        <h2>Student Name</h2>
        <strong>{studentName}</strong>
      </div>
      <div className='box'>
        <h2>Book ID</h2>
        <strong>{bookId}</strong>
      </div>
      <div className='box'>
        <h2>Book Name</h2>
        <strong>{bookName}</strong>
      </div>
      <div className='box'>
        <h2>Fee</h2>
        <strong>{feeAmt}</strong>
      </div>

      <img
        src={pic}
        alt="0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B"
        className="image"
      />
    </div>
    </div>

     
      <br />

      <div>
        <br />
        {{ msg } ? <strong>{msg}</strong> : ""}
      </div>

     

    </div>
  );
};

export default TransationQr;
