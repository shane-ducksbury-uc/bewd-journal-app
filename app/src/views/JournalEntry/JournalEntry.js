import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Axios from 'axios';

export const JournalEntry = () => {
    const [journalEntry, setJournalEntry] = useState()
    const [dataLoaded, setDataLoaded] = useState(false)

    const history = useHistory()
    const { journalId, journalEntryId } = useParams()
    const API_ENDPOINT = 'http://localhost:5000/entries/'
    
    const deleteJournalEntry = async () => {
        const response = window.confirm('Are you sure you want to delete?')
        if (response){
            await Axios.delete(`${API_ENDPOINT}${journalEntryId}`)
            window.alert('Journal Entry Deleted')
            history.push(`/journals/${journalId}`)
        }
    }
    
    useEffect(() => {
        async function getData() {
            const response = await Axios.get(`${API_ENDPOINT}${journalEntryId}`)
            setJournalEntry(response.data)
            setDataLoaded(true)
        }
        if (!dataLoaded){ getData() } 
        // eslint-disable-next-line
    }, [dataLoaded])
    
    if (dataLoaded) {
        return(
            <div>
                <h1>{journalEntry[0].title}</h1>
                <p>{journalEntry[0].content}</p>
                <button onClick={deleteJournalEntry}>Delete</button>
            </div>
        )
    } else {
        return <p>Data is still loading.</p>
    }
}

export default JournalEntry