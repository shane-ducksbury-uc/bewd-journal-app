import React, { useState, useEffect } from 'react'
import { Route, Link } from 'react-router-dom';
import Axios from 'axios'
import FeatherIcon from 'feather-icons-react'

import JournalEntries from '../JournalEntries/JournalEntries';
import { toast } from 'react-toastify';

function Journal() {

    const [userJournals, setUserJournals] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [currentUser, setCurrentUser] = useState();
    const [currentJournal, setCurrentJournal] = useState()

    useEffect(() => {
      async function getData(){
        const API_ENDPOINT = `http://${process.env.REACT_APP_API_ENDPOINT}/users/`
        const userId = currentUser.id
        try {
          const url = `${API_ENDPOINT}${userId}/journals`
          const response = await Axios.get(url)
          setUserJournals(response.data)
          setDataLoaded(true)
        } catch {
          toast.error(`Couldn't reach the server. Try again later.`, { autoClose:false })
        }
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
              
              <div className="journals-list">
                  {userJournals.map((journal) => {
                    return (
                      <Link
                        to={`/journals/${journal.journal_id}`}
                        key={journal.journal_id} onClick={() => handleJournalClick(journal.journal_id)}
                      >
                        <FeatherIcon icon="book-open" size="48" />
                      </Link>
                    );
                  })}
              </div>
              <div className="journal-content-wrapper">
                <Route path="/journals/:journalId">
                    <JournalEntries />
                </Route>
              </div>
              <div>

              </div>
            </div>
          </>
        );
    } else {
        return(<p>Data is still loading.</p>)
    }
}

export default Journal
