import { useState } from "react";
import { ethers } from "ethers";
import abi from './greeterABI.json'

import React from 'react'

function GreetMsg() {
    const[greet,setGreet] = useState("")
    const[branch,setBranch] = useState('')
    const contractAddress = '0x2d86EC1a89e2411C495880651E5e93e91666D5b9'
    const contractABI = abi;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const contract = new ethers.Contract(contractAddress,contractABI,provider)

    

const getGreet = async(e)=>{
    const greetMsg = await contract.greet();
    const branch = await contract.getBranch();
    setGreet(greetMsg)
    setBranch(branch)
}
  return (
    <div>

        <button onClick={getGreet}>
                Get Greet
        </button>

        <p>{greet}</p>
        <p>{branch}</p>



    </div>
  )
}

export default GreetMsg





