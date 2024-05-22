'use client'
import { loginAsCustomer } from '@/api/service';
import React, { useState } from 'react';
import { UseDispatch, useDispatch } from 'react-redux';
import { login } from '@/redux/slice/AuthSlice';
import { useRouter } from 'next/navigation';

const LoginBox = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter()

  const handleLogin = async (userType: string) => {
   try {
    if(userType == 'customer'){
        dispatch(login({user:await loginAsCustomer(username, password)}))
        router.push("/")
    }
    else{
        
    }
   } catch (error) {
     alert("username atau password salah")
   }
  };

  return (
    <div className="max-w-lg mx-auto rounded-lg  ">
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 text-black py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 text-black border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="flex justify-between space-x-4">
        <button
          onClick={() => handleLogin('admin')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Login as Admin
        </button>
        <button
          onClick={() => handleLogin('customer')}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none"
        >
          Login as Customer
        </button>
      </div>
    </div>
  );
};

export default LoginBox;
