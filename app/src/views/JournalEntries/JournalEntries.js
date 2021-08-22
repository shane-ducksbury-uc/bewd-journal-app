import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Axios from 'axios';

function JournalEntries({ journalEntries, handleJournalEntries, currentUser }) {

  const [userJournals, setUserJournals] = useState()

  const getUserJournals = async () => {
    const API_ENDPOINT = "http://localhost:5000/users/"
    const userId = currentUser.id
    const url = `${API_ENDPOINT}${userId}/journals`
    // All of these should probably be in try catch
    const response = await Axios.get(url)
    console.log(response.data)
    setUserJournals(response.data)
  }

  const getJournalEntries = () => {
    if (userJournals){
      // const TEMP_URL = "http://localhost:5000/journals/c7d4f707-8eda-4739-ac2f-183543186542"
      console.log(userJournals)
      const API_ENDPOINT = "http://localhost:5000/journals/"
      console.log("went to the endpoint")
      Axios.get(`${API_ENDPOINT}${userJournals[1].journal_id}`).then( response => {
        handleJournalEntries(response.data)
      })
    }
  }

  // Calling useEffect with the expected array means it will only load once. Cannot work out what the fcking linter is complaining about.
  useEffect(getUserJournals, [])
  useEffect(getJournalEntries, [userJournals])

  return (
    <div>
      {journalEntries.map((entry) => {
        return (
          <div key={entry.journal_entry_id}>
            <Link to={`/journal/${entry.journal_entry_id}`}><h2>{entry.title}</h2></Link>
            <p>{entry.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default JournalEntries;
