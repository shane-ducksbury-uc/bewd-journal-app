import React, { useState, useCallback, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';
import Header from './components/Header/Header';
import JournalEntries from './views/JournalEntries/JournalEntries';
import NewJournalEntry from './views/NewJournalEntry/NewJournalEntry'
import { JournalEntry } from './views/JournalEntry/JournalEntry';


function App() {

  const [journalEntries, setJournalEntries] = useState([])
  // State will be updated to use login instead. Setting state here for the moment.
  const [currentUser, setCurrentUser] = [
    {
      email: "my_email@email.com",
      password: "password",
      first_name: "Harry",
      last_name: "Potter",
      salt: null,
      id: "4df3bd9a-c276-4d96-b3ef-70cd5c905238",
    },
  ];

  const handleJournalEntries = (e) => {
    setJournalEntries(e)
  }

  return (
    <>
    <Router>
    <Header currentUser={currentUser}/>
      <Switch>
        <Route path='/new-journal-entry'>
          <NewJournalEntry />
        </Route>
        <Route exact path='/journal'>
          <JournalEntries journalEntries={journalEntries} handleJournalEntries={handleJournalEntries} currentUser={currentUser}/>
        </Route>
        <Route path='/journal/:journalEntryId'>
            <JournalEntry />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>

    </>
  )

  function Home(){
    return(
      <div>
        <h2>Journal App Home</h2>
        {<p>Hello, {currentUser.first_name} </p>}
      </div>
    )
      }
}

export default App;
