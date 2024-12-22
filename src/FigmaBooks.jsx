import React, { useEffect, useState, useCallback } from "react";
import "./Figma.css";
import logo from "./images/pngwing.png";
import physics from "./images/physics.jpg";
import searchLogo from "./images/search.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ConnectButton } from '@mysten/dapp-kit'
import { getSubdomainAndPath, subdomainToObjectId } from './utils/blob.ts'
import { gallery } from './contracts/index.ts'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { CONTRACT_CONFIG } from './config/index.ts';

toast.configure();

const _data = [{
  volumeInfo: {
    imageLinks: {
      smallThumbnail: physics
    },
    title: "Atomic Habits",
    authors: 'James Clear',
    pageCount: 300,
    publisher: "Sample Publisher",
    description: "The life-changing million copy bestseller"
  }
}, {
  volumeInfo: {
    imageLinks: {
      smallThumbnail: 'https://m.media-amazon.com/images/I/61BqxChoN2L._SY466_.jpg'
    },
    title: "Read People Like a Book",
    authors: ' Patrick King ',
    pageCount: 600,
    publisher: "Paperback",
    description: "How to be More Likable and Charismatic"
  }
}, {
  volumeInfo: {
    imageLinks: {
      smallThumbnail: 'https://m.media-amazon.com/images/I/41JTDIpCZFL._SY445_SX342_.jpg'
    },
    title: "Tahl Raz",
    authors: 'Tahl Raz',
    pageCount: 800,
    publisher: "Business Negotiation Skills",
    description: "Negotiating as if Your Life Depended on It"
  }
}]
const FigmaBooks = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(_data);
  const [bookInfo, setBookInfo] = useState(data[0]);
  const account = useCurrentAccount();


  let navigate = useNavigate();
  const handleHome = () => navigate(`/`);
  const handleStore = () => navigate(`/MyBooks`);
  const handleBorrow = () =>
    navigate(`/Borrow`);

  const fetchDomainData = useCallback(async () => {
    try {
      // const url = window.location.origin;
      // const parsedUrl = getSubdomainAndPath(url);
      const parsedUrl = getSubdomainAndPath(`https://${CONTRACT_CONFIG.LIBRARY_ID}.walrus.site/`);
      console.log(account, parsedUrl, 'parsedUrl');
      if (!parsedUrl) return;
      const objectId = CONTRACT_CONFIG.LIBRARY_ID || subdomainToObjectId(parsedUrl.subdomain);
      console.log(objectId, 'objectId');
      if (!objectId) {
        return;
      } else {
        if (account) {
          const libraryData = await gallery.getLibrary(objectId);
          console.log(libraryData);
          const books = libraryData.blobs.map((blob) => {
            return {
              volumeInfo: {
                imageLinks: {
                  smallThumbnail: `https://aggregator.walrus-testnet.walrus.space/v1/${blob}`
                },
                title: blob.name,
                authors: 'James Clear',
                pageCount: 300,
                publisher: "Sample Publisher",
                description: "The life-changing million copy bestseller"
              }
            }
          })
          setData(books);


        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [account]);

  useEffect(() => {
    fetchDomainData();
  }, [account]);


  const handleRead = async () => {
    let url = bookInfo.volumeInfo.imageLinks.smallThumbnail;
    try {
      // 创建一个临时的 a 标签用于下载
      const link = document.createElement('a');

      // 获取文件名 - 从 URL 中提取或使用默认名称
      const fileName = url.split('/').pop() || 'book.pdf';

      // 设置下载链接和文件名
      link.href = url;
      link.download = fileName;
      link.target = '_blank';
      // 添加到文档中并触发点击
      document.body.appendChild(link);
      link.click();

      // 清理 DOM
      document.body.removeChild(link);
    } catch (error) {
      console.error('下载失败:', error);
      // 可以添加错误提示
    }
  };

  const handleSearch = (evt) => {
    setData(_data.filter(book => book.volumeInfo.title.toLowerCase().includes(search.toLowerCase())));
  };

  return (
    <div className="books">

      <div className="div">
        <div className="overlap">
          <div className="overlap-group">
            <div className="booksbox" >
              <div className="scrollView">
                {data?.map((book, index) => (
                  <div key={index}
                    className="grid-container-item"
                    onClick={() => {
                      setBookInfo(book);

                    }}>
                    <div className="partialGrid">
                      <img
                        className="partialGrid"
                        src={
                          book.volumeInfo.imageLinks &&
                          book.volumeInfo.imageLinks.smallThumbnail
                        }
                      />
                    </div>

                    <h3 style={{ textAlign: 'center' }}>
                      {book.volumeInfo.title}
                    </h3>
                  </div>
                  /*addes*/
                ))}
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
            <img className="book-3" alt="Book" src={bookInfo.volumeInfo.imageLinks.smallThumbnail} />
            <div className="text-wrapper-6">{bookInfo.volumeInfo.title}</div>
            <div className="text-wrapper-7">{bookInfo.volumeInfo.authors}</div>
            <div className="review-box">
              <img className="line" alt="Line" src="line-2.svg" />
              <div className="page">
                <div className="overlap-group-2">
                  <div className="text-wrapper-8">{bookInfo.volumeInfo.pageCount}</div>
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
              {bookInfo.volumeInfo.description}
            </p>

            <div className="button-group">
              <button>Download</button>
              <button>Reward</button>
              <button>thumbs-up</button>
              <button>Press</button>
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
            Upload
          </button>
          <button
            style={{ border: "none", background: "none" }}
            onClick={handleStore}
            className="text-wrapper-15"
          >
            Store
          </button>
          {/* <button
            style={{ border: "none", background: "none" }}
            onClick={handleInfo}
            className="text-wrapper-16"
          >
            Info
          </button> */}
          <button
            style={{ border: "none", background: "none" }}
            className="text-wrapper-17"
          >
            WBook
          </button>
        </div>

      </div>
      <div className="connectss">
        <ConnectButton
          connectText={'Connect Wallet'}
        />
      </div>
    </div>
  );
};
export default FigmaBooks;
