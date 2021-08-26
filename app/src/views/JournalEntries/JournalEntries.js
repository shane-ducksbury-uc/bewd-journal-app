import React, { useState, useEffect } from "react";
import { Route, Link, useParams, useRouteMatch, Switch } from 'react-router-dom';
import Axios from 'axios';
import JournalEntry from "../JournalEntry/JournalEntry";
import NewJournalEntry from "../NewJournalEntry/NewJournalEntry";

function JournalEntries() {

  const [journalEntries, setJournalEntries] = useState()
  const { journalId } = useParams()
  const [currentJournalId, setCurrentJournalId] = useState(journalId) 
  const [dataLoaded, setDataLoaded] = useState(false)
  const { url, path } = useRouteMatch()

  const handleForceRefresh = (e) => {
    setDataLoaded(false)
  }

  useEffect(() => {
    async function getData(){
      const API_ENDPOINT = "http://localhost:5000/journals/"
      console.log("went to the endpoint")
      const response = await Axios.get(`${API_ENDPOINT}${journalId}`)
      setJournalEntries(response.data.reverse())
      setDataLoaded(true)
    } if(!dataLoaded) getData() 
  }, [dataLoaded])

  if (dataLoaded){
    return (
      <>
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
      <div>
        <Switch>
          <Route path={`${path}/new`}>
              <NewJournalEntry handleForceRefresh={handleForceRefresh} />
            </Route>
          <Route exact path={`${path}/:journalEntryId`}>
            <JournalEntry currentJournalId={currentJournalId} handleForceRefresh={handleForceRefresh}/>
          </Route>
        </Switch>
      </div>
      </>
    );
  } else {
    return(<p>Data not yet loaded</p>)
  }
}

export default JournalEntries;
