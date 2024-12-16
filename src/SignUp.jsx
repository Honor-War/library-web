import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('lovachakravarthi@gmail.com');
  const [name, setName] = useState('Chakri_Chax');
  const [password, setPassword] = useState('Chaxaf');
  const [walletAddress, setWalletAddress] = useState('0x5e4k3j....');
  const [cropName, setCropName] = useState('Batthai');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the details to the console
    console.log('Email:', email);
    console.log('Name:', name);
    console.log('Password:', password);
    console.log('Wallet Address:', walletAddress);
    console.log('Crop Name:', cropName);

    // Clear the form fields
    setEmail('');
    setName('');
    setPassword('');
    setWalletAddress('');
    setCropName('');
  };
  

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Sign Up</h1>
        <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Wallet Address:</label>
            <input
              type="text"
              placeholder="Enter your wallet address"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Crop Name:</label>
            <input
              type="text"
              placeholder="Enter the crop name"
              className="w-full border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="flex justify-center mt-4">
          <Link to="/" className="text-blue-500 underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;