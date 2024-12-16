import React, { useEffect, useState } from 'react'
import { useNavigate ,useLocation} from "react-router-dom";
import './Form.css'
const Fetch = () => {
  const location = useLocation();
  console.log('location', location)

  const [feeAmt,setFeeAmt] = useState(0)
  const [bookName,setBookName] = useState("HarryPotter")
  const [bookId,setBookId] = useState("Harry123")
  const [studentName,setStudentName] = useState("Clerk")
  const [studentId,setStudentId] = useState("N10491")

  useEffect = ()=>{
    setFeeAmt(location.state.amt);
    setBookName(location.state.bookName)
    setBookId(location.state.bookId)
  }
 


  return (
    <>
    <h1>Fetching</h1>
    
    <div>
     <div className='container'>
      <div className='box'>
        <h2>Student ID</h2>
        <strong>{studentId}</strong>
      </div>
      <div className='box'>
        <h2>Student Name</h2>
        <strong>{studentName}</strong>
      </div>
      <div className='box'>
        <h2>Book ID</h2>
        <strong>{bookId}</strong>
      </div>
      <div className='box'>
        <h2>Book Name</h2>
        <strong>{bookName}</strong>
      </div>
      <div className='box'>
        <h2>Fee</h2>
        <strong>{feeAmt}</strong>
      </div>
      <img
        src="https://via.placeholder.com/150"
        alt="Demo"
        className='image'
      />
    </div>
    </div>
    </>
  )
}

export default Fetch