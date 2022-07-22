import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Axios from 'axios'
import { toast } from 'react-toastify';


import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import 'react-dropdown/style.css';

import Journal from './views/Journal/Journal'
import Login from './views/Login/Login';
import Register from './views/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './views/Home/Home'


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [token, setToken] = useState()

  const handleSetCurrentUser = (e) => {
    setCurrentUser(e)
    setUserLoggedIn(true)
  }

  const handleLogout = (e) => {
    setCurrentUser();
    localStorage.clear()
    sessionStorage.clear()
    setUserLoggedIn(false)
  }

  // https://www.freecodecamp.org/news/how-to-persist-a-logged-in-user-in-react/
  // This is to check localstorage for an existing token on refresh and then validate it. 
  useEffect(() => {
    async function validateCachedToken(){
      const token = localStorage.getItem('userToken')
      if (token) {
        const foundToken = JSON.parse(token)
        try {
          const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/users`
          const response = await Axios.get(API_ENDPOINT, {headers: {
            'Authorization': `Bearer ${foundToken.accessToken}`
          }})
          if (response.status === 200) {
            setToken(foundToken)
            setUserLoggedIn(true)
            setCurrentUser(response.data)
          }
        } catch (e){
          handleLogout()
          toast.error('Something went wrong when validating your account. Try logging in again. \
          This app is also a demo, so if you are having trouble logging in, try registering a new user.')
        }
      } else {
        handleLogout()
      }
    } validateCachedToken()
  }, [userLoggedIn])

  return (
    <>
      <Router>
        <ToastContainer />
        {/* <Routes> */}
          {/* <Route path="/login"> */}
            {/* {userLoggedIn ? <Navigate to='/' /> :
            <Login setCurrentUser={handleSetCurrentUser} />
            } */}
          {/* </Route> */}
          {/* <Route path="/register"> */}
            {/* {userLoggedIn ? <Navigate to='/' /> : <Register />} */}
          {/* </Route> */}
        {/* </Routes> */}
        <Routes>
          <Route path='/login' element={userLoggedIn ? <Navigate to='/' /> :
            <Login setCurrentUser={handleSetCurrentUser} />} />
          <Route path='/register' element={userLoggedIn ? <Navigate to='/' /> : <Register />} />
          <Route path='/journals' element={<ProtectedRoute component={Journal} handleLogout={handleLogout} userLoggedIn={userLoggedIn} token={token} currentUser={currentUser}/>} />
          <Route exact path='/' element={<Home userLoggedIn={userLoggedIn} />} />
        </Routes>
        {/* <ProtectedRoute path='/journals' component={Journal} handleLogout={handleLogout} userLoggedIn={userLoggedIn} token={token} currentUser={currentUser}/> */}
      </Router>
    </>
  );
}

export default App;
