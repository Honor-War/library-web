import React, { useState } from "react";
import "./Form.css";
import abi from "./abis/libraryV4.json";
import { ethers } from "ethers";
//import {addr} from './contractAddress/libraryV2'
const Form = () => {
  const [studentId, setStudentId] = useState("");
  const [studentName, setStudentName] = useState("");
  const [bookId, setBookId] = useState("");
  const [bookName, setBookName] = useState("");

  const [people, setPeople] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const person = {
      id: new Date().getTime().toString(),
      studentId,
      studentName,
      bookId,
      bookName,
    };
    const exportPerson = { studentId, studentName, bookId, bookName };

    console.log("Details", exportPerson.studentId);

    const contractAddress = "0x9127d20BDecdC3b9c9D742379cf7000bd4cFd7Ca";
    const contractABI = abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    const Borrow = await contract.Borrow(
      exportPerson.studentId,
      exportPerson.studentName,
      exportPerson.bookId,
      exportPerson.bookName
    );

    await Borrow.wait();

    setPeople((people) => {
      return [...people, person];
    });
  };

  // const Borrow = async(e)=>{
  //     const contractAddress = '0x71ef1196d59bAdF6F28d41968e9742da2A930123'
  //     const contractABI = abi;
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)

  //     const contract = new ethers.Contract(contractAddress,contractABI,provider)

  // }
  return (
    <>
      <div className="home-page">
        <form className="my-form" onSubmit={handleSubmit}>
          <h1 className="h1" align="center">
            Details
          </h1>
          <div>
            <label htmlFor="Student ID :">
              {" "}
              <strong>Student ID :</strong>{" "}
            </label>
            <input
              placeholder="180001"
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
              placeholder='"Nx2234Vk"'
              type="text"
              onChange={(e) => {
                setBookId(e.target.value);
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
              placeholder='"Harry Potter"'
              type="text"
              onChange={(e) => {
                setBookName(e.target.value);
              }}
              value={bookName}
            />
            <br />
          </div>

          <br />

          <div class="center">
            <button>Borrow Book</button>
          </div>
        </form>

        <h1 align="center">Recent Borrowings </h1>

        <div class="grid-container">
          {people.map((person) => {
            const { id, studentId, studentName, bookId, bookName } = person;
            return (
              <div className="result-box">
                <div key={id}>
                  <h2>Student Id : {studentId}</h2>
                  <h4>Stundent Name :{studentName}</h4>
                  <h4>Book Id :{bookId}</h4>
                  <h4>Book Name :{bookName}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Form;
