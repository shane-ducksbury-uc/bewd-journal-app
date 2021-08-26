import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import Journal from './views/Journal/Journal'
import Login from './views/Login/Login';
import Register from './views/Register/Register'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


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
        <Header handleLogout={handleLogout}/>
        <Switch>
          <Route path="/login">
            {userLoggedIn ? <Redirect to='/' /> :
            <Login currentUser={currentUser} setCurrentUser={handleSetCurrentUser} />
            }
          </Route>
          <Route path="/register">
            {userLoggedIn ? <Redirect to='/' /> : <Register />}
          </Route>
        </Switch>
        <ProtectedRoute exact path='/' component={Home} userLoggedIn={userLoggedIn} />
        <ProtectedRoute path='/journals' component={Journal} userLoggedIn={userLoggedIn}/>
      </Router>
    </>
  );


  function Home(){
    return(
      <Redirect to='/journals/' />
    )
      }
}

export default App;
