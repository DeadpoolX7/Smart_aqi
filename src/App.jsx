import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
/* import Face from './Components/Face'
 */
import {Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Header from './Components/Header'
import SearchBar from './Components/SearchBar'
import WeatherApp from './Components/WeatherApp'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './auth/firebase'

function App() {
  const [user , setUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user);
        setUserEmail(user.email)
      }
      else{
        setUser(null)
      }
    })
    return ()=> unsubscribe();
  },[])

  return (
    <>
  
        <Navbar />
{/*         <div className='flex flex-col justify-center h-screen  items-center'>
        <Header />
        <SearchBar />
      </div> */}
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/dashboard/:id' element={user ? <WeatherApp email={userEmail}/> : <Navigate to={<Login/>}/>}/>
    </Routes>
      
    </>
  )
}

export default App
