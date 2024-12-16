import React, { useEffect, useState } from 'react'
import "./Figma.css";
import arrow from './images/arrow.png'

import book2 from './images/book2.jpg'
import book3 from './images/book3.jpg'

import book5 from './images/book5.jpg'
import booklogo from './images/booklogo.png'
import code from './images/code.png'
import ideabulb from './images/ideabulb.png'
import growth from './images/growth.png'
import pngwing from './images/pngwing.png'

import { Link, useNavigate } from "react-router-dom";
import { ethers } from 'ethers';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()




 const Ui = () => {

  useEffect(()=>{
    toast.info("Customize your screen size for better experience")
  },[])
  const [buttonText,setButtonText] = useState("Connect")
  console.log("Hello");

  const handleConnect = async()=>{
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    setButtonText(truncate(accounts[0], 4, 4, 11));
    } catch (error) {
      toast.warning("Install and Connect Metamask",{
        position: toast.POSITION.TOP_CENTER
      })
    }
    
  }
  
  const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      var start = text.substring(0, startChars)
      var end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
  }



  let navigate = useNavigate();

  const handleHome =()=>
  {
    let path = `/`
    navigate(path);
  }
  
    const hadleSignUp =()=>{
      // let path = `/signUp`
      // navigate(path)
      toast.info("No Need to signUp")

    }
    const handleInfo =()=>navigate(`/info`)
    const handleBorrow =()=>{
      let path = `/Borrow`
      navigate(path);
    }
    const handleStore =()=>{
      let path = `/MyBooks`
      navigate(path);
    }
    const handlePayFee =()=>{
      let path = "MyBooks/TransactionQr"
      navigate(path);
    }
   

  return (
    <div className="desktop">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <div className="div">
              <div className="navy-box" />
              <div className="circles">
                <div className="overlap-group-2">
                  <div className="middle-circle" />
                  <div className="outer-circle" />
                  <div className="inner-circle" />
                  <div className="bulb-circ" />
                  <div className="code-circ" />
                  <div className="growthcir" />
                  <img className="code" alt="Code" src={code}/>
                  <img className="idea-bulb" alt="Idea bulb" src={ideabulb} />
                  <img className="growth" alt="Growth" src={growth}/>
                </div>
              </div>
              {/* <div className="girl" /> */}
              <div className="group">
                
                
                <div className="connect">
                  <div className="div-wrapper">
                    <button style = {{border:"none",background:"none"}}onClick={handleConnect} className="text-wrapper">{buttonText}</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar">
              <img className="pngwing" alt="Pngwing" src={pngwing} />
              <button style = {{border:"none",background:"none"}} className="text-wrapper-2">Home</button>
              <button style = {{border:"none",background:"none"}}onClick={handleBorrow} className="text-wrapper-3">Borrow</button>
              <button style = {{border:"none",background:"none"}}onClick={handleStore} className="text-wrapper-4">Store</button>
              <button style = {{border:"none",background:"none"}}onClick={handleInfo} className="text-wrapper-5">Info</button>
              <a href="https://cosmoclaw.com/">
              <button style = {{border:"none",background:"none"}} className="text-wrapper-6">Library Claw</button>

              </a>
              
            </div>
          </div>
          <div className="quotes">
            <div className="overlap-2">
              <div className="explore-box">
                <div className="text-wrapper-7">Explore Your Favorite Books</div>
              </div>
              <img
                className="pngtree-books-logo"
                alt="Pngtree books logo"
                src={booklogo}
              />
              <h1 className="a-LIBRARY-IS-a">&#34;A LIBRARY IS A HOSPITAL FOR THE MIND..!!&#34;</h1>
            </div>
          </div>
          <div className="footer-books">
            <div className="group-2">

              <div className="book">
                <img className="book-2" alt="Book" src={book2}/>
              </div>
              

              <div className="book-wrapper">
                <img className="book-2" alt="Book" src={book5}/>
              </div>

              

              <div className="overlap-group-wrapper">
                <div className="overlap-group-3">
                  <img className="book-3" alt="Book" src={book3}/>
                  <div className="rectangle" />
                </div>
              </div>
            </div>
            <button style = {{border:"none",background:"none"}}onClick={handleStore} className="arrow">
              <div className="overlap-3">
                <div className="arrow-circle" />
                <img className="arrow-removebg" alt="Arrow removebg" src={arrow} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Ui;
