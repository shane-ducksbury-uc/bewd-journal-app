import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Axios from 'axios';
import { toast } from 'react-toastify';
import parse from 'html-react-parser'

export const JournalEntry = ({ currentJournalId, handleForceRefresh, token }) => {
    const [journalEntry, setJournalEntry] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)

    const history = useHistory()
    const { journalEntryId } = useParams()
    const API_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/entries/`
    
    const deleteJournalEntry = async () => {
        // Replace with a modal
        const response = window.confirm('Are you sure you want to delete?')
        if (response){
            try {
                await Axios.delete(`${API_ENDPOINT}${journalEntryId}`, {
                    headers: {
                      'Authorization': `Bearer ${token.accessToken}`
                    }
                  })
                history.push(`/journals/${currentJournalId}`)
                handleForceRefresh(false)
                toast.success('Journal Entry Deleted')
            } catch (e) {
                toast.error(`Couldn't reach the server. Try again later.`, { autoClose:false })
            }
        }
    }
    
    // Realistically I don't need to go out to the API to get this
    // as I get it in the main journal entries call. Anyway, here it is.
    useEffect(() => {
        async function getData() {
            try {
                const response = await Axios.get(`${API_ENDPOINT}${journalEntryId}`, {
                    headers: {
                      'Authorization': `Bearer ${token.accessToken}`
                    }
                  })
                setJournalEntry(response.data)
                setDataLoaded(true)
            } catch (e) {
                toast.error(`Couldn't reach the server. Try again later.`, { autoClose:false })
            }
        }
        if ( !dataLoaded || journalEntryId !== journalEntry.journal_entry_id){ getData() } 
        // eslint-disable-next-line
    }, [dataLoaded, journalEntryId])
    
    if (dataLoaded) {
        return(
            <div className="journal-entry">
                <h1>{journalEntry[0].title}</h1>
                <div className="journal-entry-content">
                    {parse(journalEntry[0].content.htmlEntryText)}
                </div>
                <button onClick={deleteJournalEntry}>Delete</button>
            </div>
        )
    } else {
        return <p>Data is still loading.</p>
    }
}

export default JournalEntry