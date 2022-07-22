import React, { useState, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom';
import Axios from 'axios'

import Header from '../../components/Header/Header';
import JournalEntries from '../JournalEntries/JournalEntries';
import { toast } from 'react-toastify';

function Journal({ handleLogout, token, currentUser }) {

    const navigate = useNavigate()

    const [userJournals, setUserJournals] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)
    const [currentJournal, setCurrentJournal] = useState()

    // This works but basically forces a full rerender of the page. Could refactor the below useEffect for better reusability.
    const forceJournalsRefresh = () => {
      setDataLoaded(false)
      setCurrentJournal()
    }

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
          const sessionCurrentJournal = sessionStorage.getItem('currentJournal')
          if (sessionCurrentJournal) {
            setCurrentJournal(sessionCurrentJournal)
          } else {
            const responseJournalId = response.data[0].journal_id
            sessionStorage.setItem('currentJournal', responseJournalId) 
            setCurrentJournal(responseJournalId)
            navigate('/')
          }
          setDataLoaded(true)
        } catch (e) {
          console.log(e.message)
          toast.error(`Couldn't reach the server. Try again later.`, { autoClose:false })
        }
      }
      if (!dataLoaded && !currentJournal && currentUser && token) getData()
    }, [currentUser, token, currentJournal])


    useEffect(() => {
      async function pushJournal(){
        navigate(`/journals/${currentJournal}`)
        }
      if (dataLoaded) pushJournal()
    }, [dataLoaded])

    if(dataLoaded && currentJournal){
        return (
          <div id="journal">
            <Header handleLogout={handleLogout} />
            <div className="current-journal-wrapper">
            </div>
            <>
            <Routes>
              <Route path="/journals/:journalId/*" element={<JournalEntries mainDataLoaded={dataLoaded} token={token} userJournals={userJournals} forceJournalsRefresh={forceJournalsRefresh} />} />
            </Routes>
            </>
          </div>
        );
    } else {
        return(<p>Data is still loading.</p>)
    }
}

export default Journal
