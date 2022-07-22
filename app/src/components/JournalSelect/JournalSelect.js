import React, { useState, useEffect } from 'react'
// import Dropdown from 'react-dropdown'
import { useNavigate } from 'react-router-dom'
import FeatherIcon from 'feather-icons-react'

import NewJournal from '../partials/NewJournal/NewJournal'
import DeleteJournal from '../partials/DeleteJournal/DeleteJournal'

function JournalSelect({ userJournals, currentJournalId, token, forceJournalsRefresh, forceEntriesRefresh }) {

    const [newJournalModalIsOpen, setNewJournalModalIsOpen] = useState(false)
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
    const [selectedJournal, setSelectedJournal] = useState()
    const [journalDropdown, setDropdownContent] = useState()

    const history = useNavigate()

    const refreshOnJournalSelection = (data) => {
        sessionStorage.setItem('currentJournal', data.value)
        history.push(`/journals/${data.value}`)
        forceEntriesRefresh()
    }

    const generateJournalDropdown = () => {
        const journalDropdown = userJournals.map((journal) => {
          return {value: journal.journal_id,
          label: journal.journal_title}
        })
        return journalDropdown
    }
    
    useEffect(() => {
        setDropdownContent(generateJournalDropdown())
        setSelectedJournal(currentJournalId)
    }, [])

    if (userJournals){
        return (
            <div className="current-journal-selector">
            <p>Current Journal</p>
            <div className="current-journal-selector-controls">
                {/* <Dropdown options={journalDropdown} value={selectedJournal} onChange={refreshOnJournalSelection} /> */}
                <NewJournal newJournalModalIsOpen={newJournalModalIsOpen} setNewJournalModalIsOpen={setNewJournalModalIsOpen} token={token} forceJournalsRefresh={forceJournalsRefresh} forceEntriesRefresh={forceEntriesRefresh} />
                <DeleteJournal deleteModalIsOpen={deleteModalIsOpen} setDeleteModalIsOpen={setDeleteModalIsOpen} token={token} journalId={currentJournalId} forceJournalsRefresh={forceJournalsRefresh} />
                <button className="button is-link" onClick={() => {setNewJournalModalIsOpen(true)}}><FeatherIcon icon="plus-circle" /></button>
                {userJournals.length > 1 ? <button className="button is-danger" onClick={() => {setDeleteModalIsOpen(true)}}><FeatherIcon icon="trash-2" /></button> : null}
            </div>
          </div>
        )
    } else {
        <p>Journals are still loading...</p>
    }
}

export default JournalSelect
