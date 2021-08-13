import React from 'react'
import NewJournalEntryCSS from './NewJournalEntry.module.css'

function NewJournalEntry({ handleAddJournalEntry, journalEntryRef }) {
    return (
        <div className={NewJournalEntryCSS.journalEntryWrapper}>
            <h1 className={NewJournalEntryCSS.test}>New Journal Entry</h1>
            <label htmlFor="journalTitle">Title: </label>
            <input type="text" name="journalTitle" ref={journalEntryRef} />
            <label htmlFor="journalContent">Content: </label>
            <textarea name="journalContent" id="journalContent" cols="30" rows="10"></textarea>
            <div>
                <button onClick={(e) => handleAddJournalEntry(e)}>Save</button>
                <button>Cancel</button>
            </div>
        </div>
    )
}

export default NewJournalEntry
