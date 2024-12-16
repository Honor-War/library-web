import React, { useEffect } from "react";
import "./Figma.css";
import "./Form.css"
import logo from "./images/pngwing.png";
import bookss from './images/bookss.png'
import bookDetail from './images/bookDetail.png'
import booksTree from "./images/bookTree.png";
import { useNavigate,useLocation} from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import QR from './images/QR.png'
import buttonText from "./Ui";
import transacVid from './videos/transacVid.mp4'
import abi from "./abis/libraryV7.json";
import load1 from "./images/load1.gif";
import tick from "./images/tickFinal.gif";
import Popup from "reactjs-popup";
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()

const FigmaInfo = () => {
  const location = useLocation();
  console.log('location', location)
  const values = location.state;


  const [bookSerial,setBookserial] = useState("")
  const images = [QR, load1, tick];
  const [msg, setMsg] = useState("0x4F9cEf395bD8376dCC033F9F93d7b7D8dd6AC55B");

  const [pic, setPic] = useState(images[0]);
  const [lateFee,setLateFee] = useState();

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [books, setBooks] = useState([]);
  const contractAddress = "0x56C655714E5E6f9038b4294D0dC578EB53F155fA";
  const contractABI = abi;

  console.log("In Figma Info");
 


  const [details,setDetails] = ("Details")
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [buttonText, setButtonText] = useState("Connect");
  const [bookButton, setBoookButton] = useState("Borrow Book");
  const [feeAmt,setFeeAmt] = useState(0)
  const [people, setPeople] = useState([]);
  const [contract,setContract] = useState();
  const [fee,setFee] = useState()
  let [transactionState, setTransactionState] = useState(0);

useEffect(()=>{setStudentId(studentId)})
  // console.log("Book Name", _bookName);
  // console.log("Book ID",_bookId);
  const handleSubmit = async (e) => {try {
    
      e.preventDefault();
  
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      setContract(contract)
  
      let i = 0;
      while (true) {
        console.log(studentId);
        console.log(i);
    
        const myBook = await contract.GetDetails(studentId, i);
  
        console.log("Book", myBook);
        
  
        const fee = ethers.utils.formatEther(myBook.lateFee);
        
        // setBookserial(_bookSerial)
        console.log("Book Seial",bookSerial);
        console.log("Fee", fee);
        setFee(fee);
        const length = await contract.BookCount(studentId);
        console.log("length", length.toString());
  
        if (i <= length - 1) {
          i++;
        } else {
          break;
        }
        const _name = await myBook.studentName;
  
        const _bookId = myBook.bookId;
        const _bookName = myBook.bookName;
        const _feeAmt = parseInt(myBook.lateFee);
        setLateFee(_feeAmt)
        const _studentName = myBook.studentName;
        const _bookSerial = parseInt(myBook.bookSerial)
        const _borrowTime = parseInt(myBook.BorrowTime)
        console.log("Borrow Time",_borrowTime);
  
        const book = {
          id: parseInt(myBook.bookSerial, 16),
          _bookName,
          _bookId,
          _feeAmt,
          _studentName,
          _bookSerial,
          _borrowTime
        };
  
        setBooks((books) => {
          return [...books, book];
        });
      }
    
  } catch (error) {
    // toast.error(`Install and connect Metamask`)
    alert(error);
  }};
  function timestampToIST(timestamp) {
    const milliseconds = timestamp * 1000;
    const dateObj = new Date(milliseconds);
  
    // Get the UTC date and time
    const utcYear = dateObj.getUTCFullYear();
    const utcMonth = (dateObj.getUTCMonth() + 1).toString().padStart(2, '0');
    const utcDay = dateObj.getUTCDate().toString().padStart(2, '0');
    const utcHours = dateObj.getUTCHours().toString().padStart(2, '0');
    const utcMinutes = dateObj.getUTCMinutes().toString().padStart(2, '0');
    const utcSeconds = dateObj.getUTCSeconds().toString().padStart(2, '0');
  
    // Convert UTC time to IST time
    const istHours = (dateObj.getUTCHours() + 5) % 24; // Adding 5 hours for IST
    const istMinutes = dateObj.getUTCMinutes() + 30; // Adding 30 minutes for IST
    const istMinutesFormatted = istMinutes.toString().padStart(2, '0');
    const formattedDateTime = `${utcDay}-${utcMonth}-${utcYear}  ${istHours}:${istMinutesFormatted}:${utcSeconds} IST`;
    return formattedDateTime;
  }
  
  const timestamp = 1690647063;
  const formattedDateTime = timestampToIST(timestamp);
  console.log(formattedDateTime);
  

 const  handleFetch = (_feeAmt,_bookId,_bookName,_studentId,_studentName,_bookSerial)=>{
   navigate(`/MyBooks/TransactionQr`,{

    state: {
        message: "Export Values",
        amt : _feeAmt,
        bookId : _bookId,
        bookName : _bookName,
        studentId :_studentId,
        studentName :_studentName,
        bookSerial:_bookSerial,


    },
})

    
  }

 
 

  const _feeAmt = values?values.amt: "";
   const _bookId = values?bookId:"Demo Book Id"
   const _bookName = values?bookName:"Demo Book "
   const _studentId = values?studentId:"No Student Id"
   const _studentName = values?studentName:"No student Name"
   
   console.log("Fee",_feeAmt,_bookId,_bookName,_studentName);

  const ButtonText = async () => {
    if (window.ethereum) {
      const truncate = (text, startChars, endChars, maxLength) => {
        if (text.length > maxLength) {
          var start = text.substring(0, startChars);
          var end = text.substring(text.length - endChars, text.length);
          while (start.length + end.length < maxLength) {
            start = start + ".";
          }
          return start + end;
        }
        return text;
      };
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const balance = await provider.getBalance(accounts[0]);
      console.log("Balance", balance);
      setButtonText(truncate(accounts[0], 4, 4, 11));
    } else {
      // alert("Install metamask");
      toast.warning(" Install and Connect Metamask",{
        position: toast.POSITION.TOP_CENTER
      })
    }
  };

  let navigate = useNavigate();

  const handleHome = () => {
    let path = `/`;
    navigate(path);
  };
  const handleConnect = async () => {
    let path = `/Connect`;
    navigate(path);
  };
  const hadleSignUp = () => {
    let path = `/signUp`;
    navigate(path);
  };
  const handleBorrow = () => {
    let path = `/Borrow`;
    navigate(path);
  };
  const handleInfo = ()=>navigate(`/info`)
  const handleStore = () => {
    let path = `/MyBooks`;
    navigate(path);
  };
  const handlePayFee = () => {
    let path = `/MyBooks/TransactionQr`;
    navigate(path);
  };

  const reportError = (error) => {
    console.log(JSON.stringify(error), "red");
    // throw new Error(error);
    toast.error(`Error found ${error}`,{
      position: toast.POSITION.TOP_CENTER
    })
  };


  

  return (
    <div className="form">

    
      <div className="div">
        <div className="connect">
          <div className="overlap-group">
            <button style = {{border:"none",background:"none"}}onClick={ButtonText} className="text-wrapper">
              {buttonText}
            </button>
          </div>
        </div>
        <div className="navbar">
          <img className="pngwing" alt="Pngwing" src={logo} />
          <button style = {{border:"none",background:"none"}}onClick={handleHome} className="h-1">
            Home
          </button>
          <button style = {{border:"none",background:"none"}}onClick={handleBorrow} className="text-wrapper-2">
            Borrow
          </button>
          <button style = {{border:"none",background:"none"}}onClick={handleStore} className="text-wrapper-3">
            Store
          </button>
          <button style = {{border:"none",background:"none"}}onClick={handleInfo} className="text-wrapper-4">
            Info
          </button>
          <button style = {{border:"none",background:"none"}}className="text-wrapper-5">Library Claw</button>
        </div>
        <div className="overlap">
          <div className="form-wrapper">

          <div className="home-page">
        <br />
        <br />
        <form className="my-form" onSubmit={handleSubmit}>
          <h1 className="h1" align="center">
            Get Details
          </h1>
          <div>
            <label htmlFor="Student ID :">
              {" "}
              <strong>Student ID :</strong>{" "}
            </label>
            <input
            style={{height:"30px",fontSize:"20px"}}
              placeholder="N180001"
              type="text"
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
              value={studentId}
            />{" "}
            <br />
            <div className="center">
            <button onClick={handleSubmit} >My Books</button>
          </div>
          </div>

          <br />

          
        </form>
      
          <div class="grid-container" style={{overflowY:"auto",overflowX:"hidden",height:"388px",marginLeft:"-50px",marginTop:"10px",textAlign:"center"}}>
            
            {books.map((book) => {
              const { id, _bookId, _bookName, _feeAmt ,_studentName,_bookSerial,_borrowTime} = book;
              <h1 align="center">
                {/* <span></span><strong>{studentId}</strong> */}
                {{ studentId } ? studentId : ""}
              </h1>;
              return (
                <div className="result-box">
                  <div className="center"></div>
                  <div key={id}>
                    <h4>Book Id :<strong>{_bookId}</strong></h4>
                    <h4>Book Name :<strong>{_bookName}</strong></h4>
                    {console.log("Borrow : ",_borrowTime)}
                    <h4>Borrow time : <strong>{timestampToIST(_borrowTime)}</strong></h4>
                    {console.log("_feeAmt of",_bookSerial,_feeAmt)}
                   {/* Checking f */}

                   {_feeAmt >=1 ? <button className="button" onClick={async () => {
                            try {


                              await contract.feeIncrement(studentId, id);
                              await delay(15000)
                             
                            } catch (error) {
                              toast.error(`Contract Interaction Error ${error}`,{
                                position: toast.POSITION.TOP_CENTER
                              })
                            }
                          
                          }}>Update Fee</button>:""}


                    {_feeAmt >= 15 ? (
                      <div class="center">
                        <button
                          className="button"
                          onClick={ () => { handleFetch(_feeAmt,_bookId,_bookName,studentId,_studentName,_bookSerial)
                           
                          
                          }}
                        >
                        <strong> Pay {_feeAmt /1000} Matics and Submit </strong>  
                        </button>
                      </div>
                    ) :<strong>Late Fee : 0</strong>
                    
                    
                    
                    }
                  </div>
                </div>
              );
            })}
          </div>
        
      </div>

            
            <div className="overlap-wrapper">
              

              <div>
         

                {/* ************************************************ Recent Borrowings **************************************** */}
       
              </div>
            </div>
          </div>
          <div className="left-discription">
            <div className="overlap-3">
              <div className="connect-wallet">


                <div className="ellipse" />
                <div className="text-wrapper-11">Connect Wallet</div>
              </div>
              <div className="fillform">
               
                  <div className="ellipse" />
                
                <div className="text-wrapper-12">Fill the form</div>
              </div>
              
              <div className="connect-wallet-2">
                <div className="ellipse" />
                <div className="text-wrapper-11">Borrow book</div>
              </div>
              <div className="connect-wallet-3">
              
                <div className="ellipse-wrapper">
                  <div className="ellipse-2" />
                </div>
                <div className="text-wrapper-12">Get Details</div>
              
              </div>
              {/* <img className="line" alt="Line" src="line-1.svg" /> */}
              <div className="ellipse" />
            </div>


            <img style={{top:"302px"}} className="img" alt="Pngwing" src={bookss} />
          

            
           

          </div>
    
        </div>

        
      </div>
    </div>
  );
};
export default FigmaInfo;
