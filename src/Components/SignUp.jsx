// src/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredentials.user.uid;
      navigate(`/dashboard/${userId}}`,{state:{email}});
    } catch (error) {
      toast.error('Error signing up:', error);
    }
  };

  return (
    <>
    <ToastContainer/>
    <div className="flex items-center justify-center h-screen ">
    <div className="w-1/2 p-4 border-2 bg-white bg-opacity-70 rounded-lg shadow-lg">
    <h2 className="text-2xl mb-4 text-center">Signup</h2>
    <form onSubmit={handleSignup} className="flex flex-col w-full items-center">
      <div className="mb-4 w-full">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4 w-full relative">
        <label>Password:</label>
        <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 py-1 text-gray-500 my-7"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Signup</button>
    </form>
    <p className='my-4'>Already Have an account. <a href="/" className='text-blue-600 font-semibold hover:underline'>Click to Log in.</a></p>
  </div>
  </div>
  </>
  );
}

export default Signup;
