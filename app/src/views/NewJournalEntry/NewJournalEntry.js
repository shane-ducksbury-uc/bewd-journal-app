import React, { useState } from 'react'
import NewJournalEntryCSS from './NewJournalEntry.module.css'
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router';

function NewJournalEntry({ addJournalEntry }) {
    const history = useHistory()
    const [formData, updateFormData] = useState({'id': uuidv4()})

    // https://linguinecode.com/post/how-to-get-form-data-on-submit-in-reactjs
    const handleChange = (e) => {
      updateFormData({
        ...formData,
        [e.target.name]: e.target.value.trim(),
      });
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        addJournalEntry(formData)
        history.push('/journal')
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
