import React, { useState, useEffect } from 'react'
import { Route, Link, useHistory } from 'react-router-dom';
import Axios from 'axios'
import FeatherIcon from 'feather-icons-react'
import Dropdown from 'react-dropdown'

import Header from '../../components/Header/Header';
import JournalEntries from '../JournalEntries/JournalEntries';
import { toast } from 'react-toastify';

function Journal({ handleLogout }) {

    const history = useHistory()

    const [userJournals, setUserJournals] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [currentUser, setCurrentUser] = useState()
    const [currentJournal, setCurrentJournal] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
      async function getData(){
        const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/users/`
        const userId = currentUser.id
        try {
          const url = `${API_ENDPOINT}${userId}/journals`
          const response = await Axios.get(url, {
            headers: {
              'Authorization': `Bearer ${token.accessToken}`
            }
          })
          setUserJournals(response.data)
          setDataLoaded(true)
        } catch (e) {
          console.log(e.message)
          toast.error(`Couldn't reach the server. Try again later.`, { autoClose:false })
        }
      }
      if (!dataLoaded && currentUser) getData()
    }, [currentUser, token])

    useEffect(() => {
      const token = localStorage.getItem('userToken')
      if (token) {
        const foundToken = JSON.parse(token)
        setToken(foundToken)
      }
      const currentUser = localStorage.getItem('currentUser')
      if (currentUser) {
        const foundUser = JSON.parse(currentUser)
        setCurrentUser(foundUser)
      }
    }, [])

    useEffect(() => {
      async function pushJournal(){
          const currentJournal = userJournals[0]
          history.push(`/journals/${currentJournal.journal_id}`)
          setCurrentJournal(currentJournal)
        }
      if (dataLoaded) pushJournal()
    }, [dataLoaded])

    const generateJournalDropdown = () => {
        const journalDropdown = userJournals.map((journal) => {
          return {value: journal.journal_id,
          label: journal.journal_title}
        })
        return journalDropdown
    }

    if(dataLoaded && currentJournal){
        const journalDropdown = generateJournalDropdown()

        return (
          <>
            <Header handleLogout={handleLogout} />
            <h2>Current Journal</h2>
            <Dropdown options={journalDropdown} value={currentJournal.journal_id}/>
            <div className="journal-wrapper">
              
              <div className="journal-content-wrapper">
                <Route path="/journals/:journalId">
                    <JournalEntries token={token} />
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
