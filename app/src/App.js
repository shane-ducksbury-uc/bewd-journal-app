import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory, Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'

import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-dropdown/style.css';

import Header from './components/Header/Header';
import Journal from './views/Journal/Journal'
import Login from './views/Login/Login';
import Register from './views/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Debug from './views/DebugView/Debug';


function App() {
  const [currentUser, setCurrentUser] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState(false);

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
  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
      setUserLoggedIn(true)
    }
  }, [userLoggedIn])

  return (
    <>
      <Router>
        <ToastContainer />
        <Switch>
          {/* <Header handleLogout={handleLogout} userLoggedIn={userLoggedIn}/> */}
          <Route path="/login">
            {userLoggedIn ? <Redirect to='/' /> :
            <Login currentUser={currentUser} setCurrentUser={handleSetCurrentUser} />
            }
          </Route>
          <Route path="/register">
            {userLoggedIn ? <Redirect to='/' /> : <Register />}
          </Route>
        </Switch>
        <Route exact path='/'><Home></Home></Route>
        <ProtectedRoute path='/journals' component={Journal} handleLogout={handleLogout} userLoggedIn={userLoggedIn}/>
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
