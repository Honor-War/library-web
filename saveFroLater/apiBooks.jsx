import React, { useEffect, useState } from "react";
import "./Figma.css";
import { GoogleBooksAPI } from "google-books-js";
import logo from "./images/pngwing.png";
import physics from "./images/physics.jpg";
import search from "./images/search.png";
import { useNavigate } from "react-router-dom";

 

const FigmaBooks = () => {
  //push check
  const [preBook,setPreBook] = useState()
  let navigate = useNavigate();
  const handleHome = () => navigate(`/`);
  const handleStore = () => navigate(`/MyBooks`);
  const handleBorrow = () => navigate(`/Borrow`);
  const handlePayFee = () => navigate(`/MyBooks/TransactionQr`);

  const [data, setData] = useState([]);
  const api = new GoogleBooksAPI({
    key: "AIzaSyCJH3VI8VhqeMJWUi3Sup1e_2gHWiux_BI",
  });

  async function fetchBooks() {
    console.log("Entered into FetchBooks");
    const books = await api.search({
      filters: {
        title: "Chemistry",
        maxResults: 2,
      },
    });

    const data = books.items;

    setData(data);
    console.log("data", data);
  }

  const selectBook=()=>{
    setPreBook((book.volumeInfo.imageLinks &&
      book.volumeInfo.imageLinks.smallThumbnail))      
  }
  useEffect(()=>{
    selectBook();
    selectBook("")
  })
  

  return (
    <div className="books">
      <div className="div">
        <div className="overlap">
          <div className="overlap-group">
            <div className="booksbox">
            <div className=" Books">
             
             <div class="grid-container">
               {data?.map((book) => (
                 <div key={book.id}>
                   {console.log(book.id)}

                   <div className="partialGrid">
                     {/* <h4>Description : {book.volumeInfo.description}</h4><br/> */}
                     <img
                       className="grid-container"
                       onClick = {selectBook()}
                       
                       src={
                         book.volumeInfo.imageLinks &&
                         book.volumeInfo.imageLinks.smallThumbnail
                       }
                     />
                    
                   </div>

                   <h3>
                     Title <br /> {book.volumeInfo.title}
                     {console.log(book.volumeInfo.title)}
                   </h3>
                   <h4>Author : {book.volumeInfo.authors}</h4>
                   {console.log(book.volumeInfo.authors)}
                   
                 </div>
               ))}
             </div>
               </div>
              {/* <div className="overlap-2">
                <div  className="group">
                  <img className="book" alt="Book" src = {physics} />
                  <div className="text-wrapper">Applied Physics</div>
                  <div className="text-wrapper-2">A.K.JHA</div>
                </div>
                <div className="group-2">
                  <img className="img" alt="Book" src = {physics} />
                  <div className="text-wrapper-3">Applied Physics</div>
                  <div className="text-wrapper-4">A.K.JHA</div>
                  <div className="group-3">
                    <img className="book" alt="Book" src = {physics} />
                    <div className="text-wrapper">Applied Physics</div>
                    <div className="text-wrapper-2">A.K.JHA</div>
                    <div className="group-4">
                      <img  className="book" alt="Book" src = {physics} />
                      <div className="text-wrapper">Applied Physics</div>
                      <div className="text-wrapper-2">A.K.JHA</div>
                    </div>
                  </div>
                  <div className="group-5">
                    <img  className="book" alt="Book" src = {physics} />
                    <div className="text-wrapper">Applied Physics</div>
                    <div className="text-wrapper-2">A.K.JHA</div>
                  </div>
                </div>
                <div className="group-6">
                  <img  className="book-2" alt="Book" src = {physics} />
                  <div className="text-wrapper">Applied Physics</div>
                  <div className="text-wrapper-2">A.K.JHA</div>
                  <div className="group-7">
                    <img  className="book" alt="Book" src = {physics} />
                    <div className="text-wrapper">Applied Physics</div>
                    <div className="text-wrapper-2">A.K.JHA</div>
                    <div className="group-4">
                      <img  className="book" alt="Book" src = {physics} />
                      <div className="text-wrapper">Applied Physics</div>
                      <div className="text-wrapper-2">A.K.JHA</div>
                    </div>
                  </div>
                </div>
              </div> */}
              

            </div>
            <div className="search">
              <div className="overlap-3">
                <div className="text-wrapper-5">Search</div>
                <button
                onClick={() => {
                  fetchBooks();
                }}
              >
                Search
              </button>
              <h1>Books</h1>
                <img className="search-2" alt="Search" src={search} />
              </div>
            </div>
          </div>
          <div className="about-book">
            <h1 className="h-1">About the Book</h1>
            <img className="book-3" alt="Book" src={physics} />
            <div className="text-wrapper-6">Applied physics</div>
            <div className="text-wrapper-7">A.K.JHA</div>
            <div className="review-box">
              <img className="line" alt="Line" src="line-2.svg" />
              <div className="page">
                <div className="overlap-group-2">
                  <div className="text-wrapper-8">546</div>
                  <div className="text-wrapper-9">pages</div>
                </div>
              </div>
              <div className="rev">
                <div className="overlap-group-2">
                  <div className="text-wrapper-8">19K</div>
                  <div className="text-wrapper-9">reviews</div>
                </div>
              </div>
            </div>
            <div className="text-wrapper-10">Plot</div>
            <p className="p">
              Our life is dependent on light and we cannot imagine our life
              without light. Naturally, from very early days, human beings must
              have wondered about the nature of light. Simple and ........
            </p>
            <button className="connect">
              <div className="div-wrapper">
                <button className="text-wrapper-11">Read</button>
              </div>
            </button>
          </div>
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group-3">
            <div className="text-wrapper-12">CONNECT</div>
          </div>
        </div>
        <div className="navbar">
          <img className="pngwing" alt="Pngwing" src={logo} />
          <button onClick={handleHome} className="text-wrapper-13">
            Home
          </button>
          <button onClick={handleBorrow} className="text-wrapper-14">
            Borrow
          </button>
          <button onClick={handleStore} className="text-wrapper-15">
            Store
          </button>
          <button onClick={handlePayFee} className="text-wrapper-16">
            Pay Fee
          </button>
          <button className="text-wrapper-17">Library Claw</button>
        </div>
      </div>
    </div>
  );
};
export default FigmaBooks;
