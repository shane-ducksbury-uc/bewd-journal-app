import React from 'react'

const JournalEntry = ({ journalEntry }) => {
    return (
        <div>
            <h1>{journalEntry.title}</h1>
            <p>{journalEntry.content}</p>
        </div>
    )
}

export default JournalEntry
