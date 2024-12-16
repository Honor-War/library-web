import React from "react";
import { useState } from "react";
import abi from "../src/abis/libraryV5.json";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import "./Form.css";

const FigmaGetDetails = () => {
  const contractAddress = "0xA4b8295191DA40ad3b84811aebb86F3D512B98a9";
  const contractABI = abi;

  console.log("In Get Details");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  console.log("My Books");
  const [books, setBooks] = useState([]);
  const [studentId, setStudentId] = useState("");
  const [bookSerial, setBookSeial] = useState();
  const [fee, setFee] = useState();

  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/MyBooks/TransactionQr`;
    navigate(path);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("0", await contract.GetDetails("n", 0));

    let i = 0;
    while (true) {
      console.log(studentId);
      console.log(i);

      const myBook = await contract.GetDetails(studentId, i);

      const fee = ethers.utils.formatEther(myBook.lateFee);
      const bookSerial = ethers.utils.formatUnits(myBook.bookSerial);
      console.log("Book serial");
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
      const _studentName = myBook.studentName;

      const book = {
        id: parseInt(myBook.bookSerial, 16),
        _bookName,
        _bookId,
        _feeAmt,
        _studentName,
      };

      setBooks((books) => {
        return [...books, book];
      });
    }
  };
  const handleFetch = (
    _feeAmt,
    _bookId,
    _bookName,
    _studentId,
    _studentName
  ) => {
    navigate(`/MyBooks/TransactionQr`, {
      state: {
        message: "Export Values",
        amt: _feeAmt,
        bookId: _bookId,
        bookName: _bookName,
        studentId: _studentId,
        studentName: _studentName,
      },
    });
  };

  return (
    <>
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
              const { id, _bookId, _bookName, _feeAmt, _studentName } = book;
              <h1 align="center">
                {/* <span></span><strong>{studentId}</strong> */}
                {{ studentId } ? studentId : ""}
              </h1>;
              return (
                <div className="result-box">
                  <div className="center"></div>
                  <div key={id}>
                    <h4>Book Id :{_bookId}</h4>
                    <h4>Book Name :{_bookName}</h4>

                    {_feeAmt > 0 && _feeAmt < 1000 ? (
                      <button
                        onClick={() => {
                          handleFetch(
                            _feeAmt,
                            _bookId,
                            _bookName,
                            studentId,
                            _studentName
                          );
                          console.log("Clicked", _feeAmt);
                        }}
                        className="button"
                      >{`Pay ${_feeAmt} Wei`}</button>
                    ) : (
                      <div class="center">
                        <button
                          className="button"
                          onClick={async () => {
                            await contract.feeIncrement(studentId, id);
                          }}
                        >
                          Update bal
                        </button>
                      </div>
                    )}
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

export default FigmaGetDetails;
