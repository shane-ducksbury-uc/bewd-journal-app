import { v4 as uuidv4 } from 'uuid';
import { createDbConnection } from '../config.js';

const pool = createDbConnection()

export const createJournalEntry = (req, res) => {
    const newJournalEntry = req.body
    const insertStatementContent = `'${uuidv4()}', '${newJournalEntry.associated_journal}', '${newJournalEntry.title}', '${newJournalEntry.content}', CURRENT_TIMESTAMP`.toString()
    pool.query(`INSERT INTO journal_entries (journal_entry_id, associated_journal, title, content, date_created) VALUES (${insertStatementContent});`, (error, results) => {
        if (error) {
            res.status(400).json(error.message)
        } else {
            res.status(201).send('Journal Entry Added')
        }
    })
}

export const getJournalEntry = (req, res) => {
    const { journalEntryId } = req.params;
    pool.query(
        `SELECT * FROM journal_entries WHERE journal_entry_id='${journalEntryId}';`, (error, results) => {
        if (error) {
            res.status(400).json(error.message)
        } else {
            res.status(200).json(results.rows)
        }
    })
}

export const updateJournalEntry = (req, res) => {
    const { journalEntryId } = req.params;
    const updatedJournalEntry = req.body
    pool.query(
        `UPDATE journal_entries 
        SET title='${updatedJournalEntry.title}', content='${updatedJournalEntry.content}', date_updated=CURRENT_TIMESTAMP
        WHERE journal_entry_id='${journalEntryId}';`, (error, results) => {
        if (error) {
            res.status(400).json(error.message)
        } else {
            res.status(201).send('Journal Entry Updated')
        }
    })
}

export const deleteJournalEntry = (req, res) => {
    const { journalEntryId } = req.params;
    pool.query(`DELETE FROM journal_entries WHERE journal_entry_id = '${journalEntryId}'`, (error, results) => {
        if(error) {
            res.status(400).json(error.message)
        } else {
            res.status(200).json('Success')
        }
    })
}