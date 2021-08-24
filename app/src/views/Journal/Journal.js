import React, { useState, useEffect } from 'react'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import Axios from 'axios'

import JournalEntries from '../JournalEntries/JournalEntries';
import NewJournalEntry from '../NewJournalEntry/NewJournalEntry';
import JournalEntry from '../JournalEntry/JournalEntry';

function Journal() {

    const [userJournals, setUserJournals] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [currentUser, setCurrentUser] = useState();
    const [currentJournal, setCurrentJournal] = useState()

    useEffect(() => {
      async function getData(){
        const API_ENDPOINT = "http://localhost:5000/users/"
        const userId = currentUser.id
        const url = `${API_ENDPOINT}${userId}/journals`
        // All of these should probably be in try catch
        const response = await Axios.get(url)
        console.log(response.data)
        setUserJournals(response.data)
        setDataLoaded(true)
      }
      if (!dataLoaded && currentUser) getData()
    }, [currentUser])

    useEffect(() => {
      const currentUser = localStorage.getItem('currentUser')
      if (currentUser) {
        const foundUser = JSON.parse(currentUser)
        setCurrentUser(foundUser)
      }
    }, [])

    const handleJournalClick = (e) => {
      setCurrentJournal(e)
    }

    if(dataLoaded){
        return (
          <>
            <div className="journal-wrapper">
              <div>
                <ul>
                  {userJournals.map((journal) => {
                    return (
                      <Link
                        to={`/journals/${journal.journal_id}`}
                        key={journal.journal_id} onClick={() => handleJournalClick(journal.journal_id)}
                      >
                        <li>{journal.journal_title}</li>
                      </Link>
                    );
                  })}
                </ul>
              </div>
              <div>
            {/* <Switch> */}
                <Route path="/journals/:journalId">
                    <JournalEntries />
                </Route>
                <Route path="/journals/:journalId/new">
                    <NewJournalEntry />
                </Route>
            {/* </Switch> */}
              </div>
              <div>
                <Route path={`/journals/${currentJournal}/:journalEntryId`}>
                    <JournalEntry />
                </Route>
              </div>
            </div>
          </>
        );
    } else {
        return(<p>Data is still loading.</p>)
    }
}

export default Journal
