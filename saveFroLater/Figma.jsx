import React from "react";
import "./Figma.css";
import arrow from './images/arrow.png'
import book from './images/book1.jpg'
import book2 from './images/book2.jpg'
import book3 from './images/book3.jpg'
import book4 from './images/book4.jpg'
import book5 from './images/book5.jpg'
import booklogo from './images/booklogo.png'
import code from './images/code.png'
import ideabulb from './images/ideabulb.png'
import growth from './images/growth.png'
import pngwing from './images/pngwing.png'


 const Figma = () => {
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
                    <div className="text-wrapper">CONNECT</div>
                  </div>
                </div>
                <div className="sign-up">
                  <div className="div-wrapper">
                    <div className="text-wrapper">SignUp</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="navbar">
              <img className="pngwing" alt="Pngwing" src={pngwing} />
              <div className="text-wrapper-2">Home</div>
              <div className="text-wrapper-3">Borrow</div>
              <div className="text-wrapper-4">Store</div>
              <div className="text-wrapper-5">Contact</div>
              <div className="text-wrapper-6">Library Claw</div>
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
              <h1 className="a-LIBRARY-IS-a">&#34;A LIBRARY IS A HOSPITAL FOR THE MIND.&#34;</h1>
            </div>
          </div>
          <div className="footer-books">
            <div className="group-2">
              <div className="book">
                <img className="img" alt="Book" src={book2}/>
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
            <div className="arrow">
              <div className="overlap-3">
                <div className="arrow-circle" />
                <img className="arrow-removebg" alt="Arrow removebg" src={arrow} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Figma;
