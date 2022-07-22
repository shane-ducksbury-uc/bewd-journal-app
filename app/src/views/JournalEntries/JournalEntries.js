import React, { useState, useEffect } from "react"
import { Route, Link, NavLink, useParams, useMatch, Routes, Navigate } from 'react-router-dom';
import Axios from 'axios'
import JournalEntry from "../JournalEntry/JournalEntry"
import NewJournalEntry from "../NewJournalEntry/NewJournalEntry"
import FeatherIcon from 'feather-icons-react'
import { toast } from 'react-toastify'
import JournalSelect from "../../components/JournalSelect/JournalSelect";

function JournalEntries({ userJournals, token, forceJournalsRefresh }) {

  const [journalEntries, setJournalEntries] = useState()
  const { journalId } = useParams()
  const [currentJournalId, setCurrentJournalId] = useState(journalId) 
  const [dataLoaded, setDataLoaded] = useState(false)
  const { url, path } = useMatch()

  const handleForceRefresh = (e) => {
    setDataLoaded(false)
    setJournalEntries()
    setCurrentJournalId()
  }

  useEffect(() => {
    async function getData(){
      try {
        const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/journals/`
        const response = await Axios.get(`${API_ENDPOINT}${journalId}`, {
          headers: {
            'Authorization': `Bearer ${token.accessToken}`
          }
        })
        setJournalEntries(response.data.reverse())
        setDataLoaded(true)
        setCurrentJournalId(journalId)
      } catch (e){
        toast.error(`Something went wrong. Try again later.`, { autoClose:false })
      }
    } if(!dataLoaded) getData()
  }, [dataLoaded])

  if (dataLoaded){
    return (
      <>
      <div className="journal-entries-list">
        <JournalSelect userJournals={userJournals} currentJournalId={journalId} token={token} forceJournalsRefresh={forceJournalsRefresh} forceEntriesRefresh={handleForceRefresh}/>
        <Link to={`${url}/new`} className="new-journal-entry-button"><FeatherIcon icon="plus"/>New Entry</Link>
        {journalEntries.map((entry) => {
          return (
            <NavLink to={`${url}/${entry.journal_entry_id}`} key={entry.journal_entry_id} className="journal-entry-menu-item" activeClassName="selected">
                <div className="card">
                  <div className="card-header">
                    <div className="card-header-title">{entry.title}</div>
                  </div>
                  <div className="card-content">{entry.content.plainEntryText.substring(0, 100)}{entry.content.plainEntryText.length > 100 ? '...' : ''}</div>
                </div>
                </NavLink>
          );
        })}
      </div>
      <div className="journal-entry-container">
        <Routes>
          <Route path={`${path}/new`} element={<NewJournalEntry handleForceRefresh={handleForceRefresh} journalEntries={journalEntries} token={token}/>} />
          <Route path={`${path}/:journalEntryId`} element={<JournalEntry currentJournalId={currentJournalId} handleForceRefresh={handleForceRefresh} token={token}/>} />
        </Routes>
        {journalEntries.length < 1 ? <Navigate to={`${url}/new`} /> : null }
      </div>
      </>
    )
  } else {
    return(<p>Data not yet loaded</p>)
  }
}

export default JournalEntries;
