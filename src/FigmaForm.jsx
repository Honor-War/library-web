import React from "react";
import "./Figma.css";
import logo from "./images/pngwing.png";
import booksTree from "./images/bookTree.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CoverUpload from "./Coverupload.jsx";
import { ConnectButton } from '@mysten/dapp-kit'

toast.configure();

const FigmaForm = () => {

  const location = useLocation();
  const values = location.state;
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const [studentName, setStudentName] = useState("");

  const [bookName, setBookName] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStudentName('');
    setBookName('');
    toast.success("Book uploaded successfully", {
      position: toast.POSITION.TOP_CENTER,
    });
  };






  let navigate = useNavigate();

  const handleHome = () => {
    let path = `/`;
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

  return (
    <div className="form">
      <div className="div">
        <div className="connect">
          {/* <div className="overlap-group">
            <button
              style={{ border: "none", background: "none" }}
              onClick={ButtonText}
              className="text-wrapper"
            >
              {buttonText}
            </button>
          </div> */}
          <ConnectButton
            connectText={'Connect Wallet'}
          // connectedText={`Connected: ${formatAddress(currentAccount?.address)}`}
          />
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
            Upload
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
            className="text-wrapper-5"
          >
            W-Library
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
                    <label htmlFor="User Name :">
                      <strong>User Name :</strong>{" "}
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
                  <div>
                    <label htmlFor="Book Image :">
                      <strong>Book Image :</strong>
                    </label>
                    <CoverUpload />
                  </div>

                  <br />

                  <div class="center">
                    <button>Complete the form</button>
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
                <p style={{ top: "-20px" }} className="text-wrapper-11">If someone downloads <br /> you will receive a certain fee</p>
                <div className="ellipse" />
              </div>
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
