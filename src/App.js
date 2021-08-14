import React, { useState, useRef } from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import './App.scss';
import Header from './components/Header/Header';
import JournalEntries from './views/JournalEntries/JournalEntries';
import NewJournalEntry from './views/NewJournalEntry/NewJournalEntry'

function App() {

  const [journalEntries, setJournalEntries] = useState(
    [
      { 'id': uuidv4(),
        'title': 'First Entry',
        'content': 'This is the content for the first journal entry'},
      { 'id': uuidv4(),
        'title': 'Second Entry',
        'content': 'This is the content for the second journal entry'}
    ])

    const handleAddJournalEntry = (newJournalEntry) => {
      return setJournalEntries(prevEntries => {
        return [...prevEntries, newJournalEntry]
      })
    }

  return (
    <>
    <Router>
    <Header />
      <Switch>
        <Route path='/new-journal-entry'>
          <NewJournalEntry addJournalEntry={handleAddJournalEntry} />
        </Route>
        <Route path='/journal'>
          <JournalEntries journalEntries={journalEntries}/>
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>

    </>
  )

  function Home(){
    return <h2>Journal App Home</h2>
  }
}

export default App;
