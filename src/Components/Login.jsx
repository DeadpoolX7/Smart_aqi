
// src/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../auth/firebase';
import { useNavigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(auth, email, password);
      const userId = userCredentials.user.uid;
      console.log(userCredentials)
      console.log(userCredentials.user.email)
      console.log(userId)
      navigate(`/dashboard/${userId}`,{state:{email}});
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('No account found with this email. Please create one.');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password. Please try again.');
      } else {
        toast.error('Error logging in. Please try again.');
      }
    }
  };

  return (
    <>
    <ToastContainer />
    <div className="flex items-center justify-center h-screen ">
    <div className="w-1/2 p-4 border-2 flex flex-col items-center">
      <h2 className='text-2xl font-medium'>Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col w-full items-center">
        <div className="mb-4 w-full">
          <label htmlFor='e-mail'>Email:</label>
          <input
          id='e-mail'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4 w-full relative">
          <label htmlFor='password'>Password:</label>
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
        <p className="mb-4">
          Don't have an account? <a href="/signup" className='text-blue-600 font-semibold hover:underline'>Click to Sign-up</a>
        </p>
        <button type="submit" className="px-4 py-2 text-xl border rounded bg-slate-700 text-white hover:scale-105 hover:bg-teal-800 transition-all">Log in</button>
      </form>
    </div>
  </div>
  </>
  );
}

export default Login;
