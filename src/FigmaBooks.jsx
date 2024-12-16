import React, { useEffect, useState } from "react";
import "./Figma.css";
import { GoogleBooksAPI } from "google-books-js";
import logo from "./images/pngwing.png";
import physics from "./images/physics.jpg";
import searchLogo from "./images/search.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const FigmaBooks = () => {
  const [img, setImg] = useState(physics);
  const [title, setTitle] = useState("Applied Physics");
  const [author, setAuthor] = useState("A.K JHA");
  const [pages, setPages] = useState("506");
  const [reviews, setReviews] = useState("NA");
  const [plot, setPlot] = useState("Not Available");
  const [search, setSearch] = useState("");
  const [id, setId] = useState("");
  const [publisher, setPublisher] = useState("Narmada Publisher");
  const [subTitle, setSubtitle] = useState("Subtitle Here");

  let navigate = useNavigate();
  const handleHome = () => navigate(`/`);
  const handleStore = () => navigate(`/MyBooks`);
  const handleBorrow = () =>
    navigate(`/Borrow`, { state: { bookId: id, bookName: title } });
  const handleInfo = () => navigate(`/info`);
  const handlePayFee = () => navigate(`/MyBooks/TransactionQr`);
  const handleRead = () =>
    navigate(`/Book`, {
      state: {
        title: title,
        author: author,
        pages: pages,
        reviews: reviews,
        plot: plot,
        id: id,
        img: img,
        publisher: publisher,
        subTitle: subTitle,
      },
    });

  const [data, setData] = useState([]);
  const api = new GoogleBooksAPI({
    key: "AIzaSyCJH3VI8VhqeMJWUi3Sup1e_2gHWiux_BI",
  });

  async function fetchBooks() {
    const books = await api.search({
      filters: {
        title: search,
        maxResults: 2,
      },
    });

    const data = books.items;

    setData(data);
    console.log("data", data);
  }

  useEffect((_e) => {
    // e.preventDefault()
    setSearch(search);

    console.log("search", search);
  });

  const handleSearch = (evt) => {
    if (evt.key === "Enter") {
      fetchBooks();
      console.log("Hello");
      setSearch("");
    }
  };

  return (
    <div className="books">
     
      <div className="div">
        <div className="overlap">
          <div className="overlap-group">
            <div className="booksbox" style={{ display: "grid" }}>
              <div className=" Books" style={{ display: "inline-grid" }}>
                <div className="scrollView">
                  <div class="grid-container">
                    {data?.map((book) => (
                      <div key={book.id}>
                        {/* {console.log(book.id)} */}

                        <div className="partialGrid">
                          <img
                            className="grid-container"
                            src={
                              book.volumeInfo.imageLinks &&
                              book.volumeInfo.imageLinks.smallThumbnail
                            }
                          />
                        </div>

                        <h3>
                          Title <br /> {book.volumeInfo.title}
                        </h3>
                        <h4>Author : {book.volumeInfo.authors}</h4>

                        <button
                          type="button"
                          style={{
                            background: "#f3cacccb",
                            borderRadius: "5px",
                            border: "3px solid black",
                            top: "2px",
                            fontWeight: "normal",
                          }}
                          onClick={() => {
                            setId(book.id);
                            setAuthor(book.volumeInfo.authors);

                            setTitle(book.volumeInfo.title);
                            setPages(book.volumeInfo.pageCount);
                            setPublisher(book.volumeInfo.publisher);
                            setSubtitle(book.volumeInfo.subTitle);
                            console.log(book.volumeInfo.publisher);
                            // setPdfLink()
                            setReviews();
                            setImg(
                              book.volumeInfo.imageLinks &&
                                book.volumeInfo.imageLinks.smallThumbnail
                            );
                            setPlot(book.volumeInfo.description);
                          }}
                        >
                          <strong>Preview</strong>
                        </button>
                      </div>
                      /*addes*/
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="search">
              <div className="overlp-3">
               
                <input
                  className="text-wrapper-5"
                  placeholder="   Enter your book name here"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    e.preventDefault();
                    setSearch(e.target.value);
                  }}
                  onKeyDown={handleSearch}
                />{" "}
                <br />
                <img className="search-2" alt="Search" src={searchLogo} />
              </div>
            </div>
          </div>
          <div className="about-book">
            <h1 className="h-1">About the Book</h1>
            <img className="book-3" alt="Book" src={img} />
            <div className="text-wrapper-6">{title}</div>
            <div className="text-wrapper-7">{author}</div>
            <div className="review-box">
              <img className="line" alt="Line" src="line-2.svg" />
              <div className="page">
                <div className="overlap-group-2">
                  <div className="text-wrapper-8">{pages}</div>
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
            <div className="text-wrapper-10">Description</div>
            <p className="scrollDescription">
              <br />
              {plot}
            </p>
            <div className="connect">
              <div className="div-wrapper">
                <button
                  style={{ border: "none", background: "none" }}
                  onClick={handleRead}
                  className="text-wrapper-11"
                >
                  Read
                </button>
              </div>
            </div>

            <div className="div-wrapperBorrow">
              <button
                style={{ border: "none", background: "none" }}
                onClick={handleBorrow}
                className="text-wrapper-12"
              >
                Borrow
              </button>
            </div>
          </div>
        </div>
        <div className="overlap-group-wrapper">
          
        </div>
        <div className="navbar">
          <img className="pngwing" alt="Pngwing" src={logo} />
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleHome}
            className="text-wrapper-13"
          >
            Home
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleBorrow}
            className="text-wrapper-14"
          >
            Borrow
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleStore}
            className="text-wrapper-15"
          >
            Store
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleInfo}
            className="text-wrapper-16"
          >
            Info
          </button>
          <button
            style={{ border: "none", background: "none" }}
            className="text-wrapper-17"
          >
            Library Claw
          </button>
        </div>
      </div>
    </div>
  );
};
export default FigmaBooks;
