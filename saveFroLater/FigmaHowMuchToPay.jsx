import React from "react";
import { useState } from "react";
import abi from "../src/abis/libraryV4.json";
import { ethers } from "ethers";

import { useNavigate } from "react-router-dom";
import "./Form.css";

const FigmaHowMuchToPay = () => {
  console.log("My Books");
  const [books, setBooks] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [fee, setFee] = useState();

  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/MyBooks/TransactionQr`;
    navigate(path);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const contractAddress = "0x2659e67BeC53930a1fF519d04402b663Bc4aE1CF";
    const contractABI = abi;

    console.log("In pay fee");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    //console.log(await contract.GetDetails("N180491", 0));
    const fee = await contract.howMuchToPay("n", 1);
    console.log("Fee", fee.toSting());
  };

  return (
    <>
      <p>Hello boooks</p>
      <div className="home-page">
        <br />
        <br />
        <form className="my-form" onSubmit={handleSubmit}>
          <h1 className="h1" align="center">
            Get Deatils
          </h1>
          <div>
            <label htmlFor="Student ID :">
              {" "}
              <strong>Student ID :</strong>{" "}
            </label>
            <input
              placeholder="N180001"
              type="text"
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
              value={studentId}
            />{" "}
            <br />
          </div>

          <br />

          <div class="center">
            <button>My Books</button>
          </div>
        </form>
        <div>
          <div class="grid-container">
            {books.map((book) => {
              const { id, _bookId, _bookName } = book;
              <h1 align="center">{{ studentId } ? studentId : ""}</h1>;
              return (
                <div className="result-box">
                  <div className="center"></div>
                  <div key={id}>
                    <h4>Book Id :{_bookId}</h4>
                    <h4>Book Name :{_bookName}</h4>
                    <button onClick={routeChange}>{`Pay ${fee} Wei`}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default FigmaHowMuchToPay;
