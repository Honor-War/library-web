import React from "react";
import "./Figma.css";
import logo from "./images/pngwing.png";
import booksTree from "./images/bookTree.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import abi from "./abis/libraryV7.json";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from '@emailjs/browser';

toast.configure();

const FigmaForm = () => {

  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  
  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate ); // "17-6-2022"
  let deadline = `${day}-${month +1}-${year}`;
  console.log(deadline);


  const location = useLocation();
  console.log("location", location);
  const values = location.state;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  
  
const [hash,setHash] = useState('0x7cd23........c43f')
  const [details, setDetails] = "Details";
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");
  const [buttonText, setButtonText] = useState("Connect");
  const [bookButton, setBoookButton] = useState("Borrow Book");
  const [succesfull, setSuccessfull] = useState(" ");

  const [people, setPeople] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (checkIdInput(studentId) && studentName && bookId && bookName) {
        const person = {
          id: new Date().getTime().toString(),
          studentId,
          studentName,
          bookId,
          bookName,
        };
        setBoookButton("Loading.....");
        const exportPerson = { studentId, studentName, bookId, bookName };

        console.log("Details", exportPerson.studentId);

        const contractAddress = "0x56C655714E5E6f9038b4294D0dC578EB53F155fA";
        const contractABI = abi;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const Borrow = await contract.Borrow(
          exportPerson.studentId,
          exportPerson.studentName,
          exportPerson.bookId,
          exportPerson.bookName
        );
       console.log("Hash ",Borrow.hash);
 
       let hashCode = Borrow.hash
       setHash((hashCode));
        console.log(hash);
        await Borrow.wait();
       sendEmail();

        setPeople((people) => {
          return [...people, person];
        });

        setStudentId("");
        setStudentName("");
        setBookId("");
        setBookName("");
        setSuccessfull(
          toast.success("Borrowed successful", {
            position: toast.POSITION.TOP_CENTER,
          })
        );
        await delay(5000);
        setSuccessfull("");
      } else {
        // alert("Fill details correctly Especially ID ");
        toast.warning("Enter details correctly Especially ID", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      // reportError(error);
      // alert()
      toast.error(`Error Found :${error}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  function generateEmail(id) {
    return `${id}@rguktn.ac.in`;
  }
  let id = "N181061"
  const email = generateEmail(id.toLowerCase());
  console.log(email);


  const sendEmail = () => {
    

    emailjs.send('service_qqxen1v', 'template_x9mfcfq',
        {
            bookName: `${bookName}`,
            
            message: `Hey ${studentName} (${studentId}),The Book :" ${bookName} " having Book Id : " ${bookId} " Borrowed successfully on  ${currentDate}.Transaction hash of :" ${hash} " submit before ${deadline}`,
            studentMail:`${generateEmail(studentId.toLowerCase())}`
          },
        'RVorn7tXnujE8ioJt')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
};

  function checkIdInput(id) {
    // Check if the length is 7
    if (id.length !== 7) {
      return false;
    }

    // Convert the first letter to uppercase
    const firstLetter = id[0].toUpperCase();

    // Check if the first letter is "N", "R", "I", or "S"
    if (!["N", "R", "I", "S"].includes(firstLetter)) {
      return false;
    }

    // Check if the last 4 digits are less than 1500
    const lastDigits = parseInt(id.slice(3), 10);
    if (isNaN(lastDigits) || lastDigits >= 1500) {
      return false;
    }

    return true;
  }

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

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        const balance = await provider.getBalance(accounts[0]);
        console.log("Balance", balance);
        setButtonText(truncate(accounts[0], 4, 4, 11));
      } catch (error) {
        toast.error(` Install and Connect Metamask`);
      }
    } else {
      // alert("Install metamask");
      toast.warning(" Install and Connect Metamask", {
        position: toast.POSITION.TOP_CENTER,
      });
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

  const handleBorrow = () => {
    let path = `/Borrow`;
    navigate(path);
  };
  const handleStore = () => {
    let path = `/MyBooks`;
    navigate(path);
  };
  const handleInfo = () => navigate(`/info`);

  return (
    <div className="form">
      <div className="div">
        <div className="connect">
          <div className="overlap-group">
            <button
              style={{ border: "none", background: "none" }}
              onClick={ButtonText}
              className="text-wrapper"
            >
              {buttonText}
            </button>
          </div>
        </div>
        <div className="navbar">
          <img className="pngwing" alt="Pngwing" src={logo} />
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleHome}
            className="h-1"
          >
            Home
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleBorrow}
            className="text-wrapper-2"
          >
            Borrow
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleStore}
            className="text-wrapper-3"
          >
            Store
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleInfo}
            className="text-wrapper-4"
          >
            Info
          </button>
          <button
            style={{ border: "none", background: "none" }}
            className="text-wrapper-5"
          >
            Library Claw
          </button>
        </div>
        <div className="overlap">
          <div className="form-wrapper">
            <div className="overlap-wrapper">
              <div>
                <form
                  className="my-form"
                  style={{ fontSize: "20px" }}
                  onSubmit={handleSubmit}
                >
                  <h1 className="h1" align="center">
                    <strong>Details</strong>
                  </h1>
                  <div>
                    <label htmlFor="Student ID :">
                      {" "}
                      <strong>Student ID :</strong>{" "}
                    </label>
                    <input
                      style={{ fontSize: "20px" }}
                      placeholder="N180001"
                      type="text"
                      onChange={(e) => {
                        setStudentId(e.target.value);
                      }}
                      value={studentId}
                    />{" "}
                    <br />
                  </div>
                  <div>
                    <label htmlFor="Student Name :">
                      <strong>Student Name :</strong>{" "}
                    </label>
                    <input
                      style={{ fontSize: "20px" }}
                      placeholder="Alice"
                      type="text"
                      onChange={(e) => {
                        setStudentName(e.target.value);
                      }}
                      value={studentName}
                    />
                    <br />
                  </div>
                  <div>
                    <label htmlFor="Book Id :">
                      <strong>Book ID :</strong>
                    </label>
                    <input
                      style={{ fontSize: "20px" }}
                      placeholder={values ? values.bookId : "XundHJYd43nud"}
                      type="text"
                      onChange={(e) => {
                        values
                          ? setBookId(values.bookId)
                          : setBookId(e.target.value);
                      }}
                      value={bookId}
                    />
                    <br />
                  </div>

                  <div>
                    <label htmlFor="Book Name :">
                      <strong>Book Name :</strong>
                    </label>
                    <input
                      style={{ fontSize: "20px" }}
                      placeholder={values ? values.bookName : "Harry Potter"}
                      type="text"
                      onChange={(e) => {
                        values
                          ? setBookName(values.bookName)
                          : setBookName(e.target.value);
                      }}
                      value={bookName}
                    />
                    <br />
                  </div>

                  <br />

                  <div class="center">
                    {studentId && studentName && bookId && bookName ? (
                      <button>{bookButton}</button>
                    ) : (
                      <button>Complete the form</button>
                    )}
                  </div>
                </form>
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
                <div className="ellipse-wrapper">
                  <div className="ellipse-2" />
                </div>
                <div className="text-wrapper-12">Fill the form</div>
              </div>
              <div className="connect-wallet-2">
                <div className="ellipse" />
                <div className="text-wrapper-11">Borrow book</div>
              </div>
              <div className="connect-wallet-3">
                <p style={{top:"-20px"}} className="text-wrapper-11">Return the book in time <br/>else pay 0.015 Matics / day</p>
                <div className="ellipse" />
              </div>
              {/* <img className="line" alt="Line" src="line-1.svg" /> */}
              <div className="ellipse-3" />
            </div>
            <img className="img" alt="Pngwing" src={booksTree} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FigmaForm;
