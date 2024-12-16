import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';
import abi from './abis/libraryV3.json'
import QR from './images/QR.png';

const PaymentPage = () => {
  const [fee, setFee] = useState("0");
  
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const handlefeeChange = (e) => {
    setFee(e.target.value);
  };


  const handleTransfer = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.enable();
      const contractAddress = "0x60F4b355f9CA0D05F6e59ebB7B473b03E39eB24c"
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);
      // const payFee = await contract.payFee( "N18",0,{ value:ethers.utils.parseUnits('100', 'wei')});
      // await payFee.wait()
      // alert('Transfer successful!');

      const initialBalance = await provider.getBalance("0xa7886958a25079228836fB0f8AbcF13E6b08e24A");
      const formatedInitialBalance = ethers.utils.formatEther(initialBalance);
      
      console.log("formatedInitialBalance",formatedInitialBalance);

      await window.ethereum
  .request({
    method: "eth_sendTransaction",
    params: [
        {
          from: window.ethereum.selectedAddress,
          to: "0xa7886958a25079228836fB0f8AbcF13E6b08e24A",
          value:String(ethers.utils.parseUnits("1000000",'wei')), // convert to WEI
          
          },
          
        ],
      })
  .then((result) => console.log("Transaction Hash",result))
  .catch((error) => console.log(error));

      console.log("Loading .....");
      await delay(17000);
      const updatedBalance = await provider.getBalance("0xa7886958a25079228836fB0f8AbcF13E6b08e24A");
      const formatedUpdatedBalance = ethers.utils.formatEther(updatedBalance);
      console.log("formatedupdatedBalance",formatedUpdatedBalance)

      console.log("Difference",formatedInitialBalance - formatedUpdatedBalance);
      
    }
     else {
      alert('Please install MetaMask to use this DApp.');
    }
  };

  return (
    <div className="App">
      <h1>Payment Page</h1>
      {/* <input type="number" value={fee} onChange={handlefeeChange} placeholder="fee" /> */}


        


      <img src={QR} alt="0xa7886958a25079228836fB0f8AbcF13E6b08e24A" style={{width:"150px",height:"150px"}}/><br/>
      <h3><strong>0xa7886958a25079228836fB0f8AbcF13E6b08e24A</strong></h3>
     
      <button onClick={handleTransfer}>PayFee</button>
    </div>
  );
}

export default PaymentPage
 
// await window.ethereum
//   .request({
//     method: "eth_sendTransaction",
//     params: [
//         {
//           from: window.ethereum.selectedAddress,
//           to: "0x4dxxxxxxxxxxxxxxxxxx2dr9820C",
//           value: String(0.11 * 1000000000000000000), // convert to WEI
//           },
//         ],
//       })
//   .then((result) => console.log(result))
//   .catch((error) => console.log(error));