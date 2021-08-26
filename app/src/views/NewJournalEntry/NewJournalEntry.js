import React, { useState } from 'react'
import Axios from 'axios';
import NewJournalEntryCSS from './NewJournalEntry.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useHistory, useParams } from 'react-router-dom';

function NewJournalEntry({ handleForceRefresh }) {
    const history = useHistory()
    // May not need the below id field?
    const [formData, updateFormData] = useState({'id': uuidv4()})
    const { journalId } = useParams()

    // https://linguinecode.com/post/how-to-get-form-data-on-submit-in-reactjs
    // Make this so that it is saved in local storage until submitted.
    const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    };

    const addJournalEntry = (formData) => {
        const newJournalURL = 'http://localhost:5000/entries/'
        const journalData = {
            "associated_journal": journalId,
            "title": formData.title,
            "content": formData.content
        }
        return Axios.post(newJournalURL, journalData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await addJournalEntry(formData)
        if(response.status === 201) {
            handleForceRefresh(false)
            history.push(`/journals/${journalId}`) 
        } else {
            console.log('Something didnt work, need to put an error in here.')
        }
    }

    return (
        <div className={NewJournalEntryCSS.journalEntryWrapper}>
            <h1 className={NewJournalEntryCSS.test}>New Journal Entry</h1>
            <label htmlFor="title">Title: </label>
            <input type="text" name="title" onChange={handleChange} />
            <label htmlFor="content">Content: </label>
            <textarea name="content" cols="30" rows="10" onChange={handleChange}></textarea>
            <div>
                <button onClick={handleSubmit}>Save</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

export default NewJournalEntry
