import React, { useState } from "react";
import QR from "./images/QR.png";
import { ethers } from "ethers";
import { useEffect } from "react";
import load1 from "./images/load1.gif";
import tick from "./images/tick.gif";
import { useNavigate ,useLocation} from "react-router-dom";

const TransationQr = () => {
  
  
  
  let [transactionState, setTransactionState] = useState(0);


  
  const [studentId, setStudentId] = useState("N180491");
  const [studentName, setStudentName] = useState("ChaX");
  const [bookId, setBookId] = useState("Apple123");
  const [bookName, setBookName] = useState("Apple");
  const [feeAmt,setFeeAmt] = useState(0)
  

  
  const images = [QR, load1, tick];
  const [msg, setMsg] = useState("0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B");

  const [pic, setPic] = useState(images[0]);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));


  

  const handleTransaction = async () => 
  
  {
    
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.enable();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
  
        const initialBalance = await provider.getBalance(
          "0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B"
        );
        const formatedInitialBalance = ethers.utils.formatEther(initialBalance);
        console.log("formatedInitialBalance", formatedInitialBalance);
  
        while (transactionState === 0) {
          const updatedBalance = await provider.getBalance(
            "0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B"
          );
          const formatedUpdatedBalance = ethers.utils.formatEther(updatedBalance);
          const difference = formatedUpdatedBalance - formatedInitialBalance;
          console.log("formatedupdatedBalance", formatedUpdatedBalance);
          console.log("Differnce", difference);
  
          await delay(2000);
          console.log("Waiting..");
  
          if (difference >= 0.0149) {
            setPic(images[1]);
            setMsg("Transaction Loading");
            console.log("Transaction Done");
            await delay(4000);
            setMsg("Transaction Done ✔");
            setPic(images[2]);
  
            break;
          } else {
            console.log("Transaction not yet done");
          }
          setTransactionState(1);
        }

        
      } catch (error) {
        reportError(error)
      }

      
    } else {
      alert("Please Install Metamask");
    }
  };
  const location = useLocation();
  console.log('location', location)

  
 const values = location.state;
 

 const _feeAmt = values?values.amt:0;
  const _bookId = values?bookId:"Dfsf"
  const _bookName = values?bookName:"Harry"
  const _studentId = values?studentId:"No Id"
  const _studentName = values?studentName:"No Name"
  
  console.log("Fee",_feeAmt,_bookId,_bookName,_studentName);

  useEffect(() => {

   
    handleTransaction();
    setFeeAmt(_feeAmt);
    setBookId(_bookId);
    setBookName(_bookName);
    setStudentId(_studentId);
    setStudentName(_studentName)
   
    
  }, [transactionState]);

  const reportError = (error) => {
    console.log(JSON.stringify(error), 'red')
    throw new Error(error)
  }

  console.log("Fee",feeAmt);


  return (
   

<div className="App">

  <div>


  
      <strong>Transaction Page</strong>

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
        <h2>Fee in Eth</h2>
        <strong>{feeAmt/1000}</strong>
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

    </div>
    

      
      

   
  );
};

export default TransationQr;
