import React, { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

import './App.scss';
import Header from './components/Header/Header';
import NewJournalEntry from './views/NewJournalEntry/NewJournalEntry'

function App() {

  const [journalEntries, setJournalEntries] = useState([])
  const journalEntryRef = useRef();

  const handleAddJournalEntry = (e) => {
    alert('hello')
    const newJournalEntry = journalEntryRef.current.value
    if (newJournalEntry) {
      return setJournalEntries(prevEntries => {
        return [...prevEntries, {id: uuidv4(), title: newJournalEntry}]
      })
    }
    journalEntryRef.current.value = null 
    console.log(journalEntries)
  }

  return (
    <>
    <Header />
    <NewJournalEntry clickHandler={handleAddJournalEntry} journalEntryRef={journalEntryRef} />
    </>
  )
}

export default App;
