import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import Axios from 'axios'
import { toast } from 'react-toastify';


import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-dropdown/style.css';

import Journal from './views/Journal/Journal'
import Login from './views/Login/Login';
import Register from './views/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


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
          toast.error('Something went wrong when validating your account. Try logging in again. \
          This app is also a demo, so if you are having trouble logging in, try registering a new user.')
          handleLogout()
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
        <Switch>
          <Route path="/login">
            {userLoggedIn ? <Redirect to='/' /> :
            <Login setCurrentUser={handleSetCurrentUser} />
            }
          </Route>
          <Route path="/register">
            {userLoggedIn ? <Redirect to='/' /> : <Register />}
          </Route>
        </Switch>
        <Route exact path='/'><Home></Home></Route>
        <ProtectedRoute path='/journals' component={Journal} handleLogout={handleLogout} userLoggedIn={userLoggedIn} token={token} currentUser={currentUser}/>
      </Router>
    </>
  );


  function Home(){
    if (userLoggedIn){
      return(
        <Redirect to='/journals/' />
      )
    }  else {
      return(
        <div className="home-container">
          <h1 className="is-size-1">Welcome to Bright Mind</h1>
          <div>
          <Link to="/login"><button className="button is-primary">Go To Login</button></Link>
          <Link to="/register"><button className="button is-link">Register</button></Link>
          </div>
        </div>
      )
    }
      }
}

export default App;
