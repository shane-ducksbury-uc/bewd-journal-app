import React, { useState, useEffect } from "react";
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import Axios from 'axios';

function JournalEntries() {

  const [journalEntries, setJournalEntries] = useState()
  const [dataLoaded, setDataLoaded] = useState(false)
  const { journalId } = useParams()
  const { url } = useRouteMatch()

  const getJournalEntries = () => {
    // Need to refactor this to better suit the useEffect function.
    // if (userJournals){
      // const TEMP_URL = "http://localhost:5000/journals/c7d4f707-8eda-4739-ac2f-183543186542"
      const API_ENDPOINT = "http://localhost:5000/journals/"
      console.log("went to the endpoint")
      Axios.get(`${API_ENDPOINT}${journalId}`).then( response => {
        setJournalEntries(response.data)
        setDataLoaded(true)
      })
    // }
  }

  // Calling useEffect with the expected array means it will only load once. Cannot work out what the fcking linter is complaining about.
  useEffect(getJournalEntries, [dataLoaded])

  if (dataLoaded){
    return (
      <div>
        <Link to={`${url}/new`}><button>New Entry</button></Link>
        {journalEntries.map((entry) => {
          return (
            <div key={entry.journal_entry_id}>
              <Link to={`${url}/${entry.journal_entry_id}`}><h2>{entry.title}</h2></Link>
              <p>{entry.content}</p>
            </div>
          );
        })}
      </div>
    );
  } else {
    return(<p>Data not yet loaded</p>)
  }
}

export default JournalEntries;
