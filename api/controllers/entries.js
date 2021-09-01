import { v4 as uuidv4 } from 'uuid';
import { createDbConnection } from '../config.js';

const pool = createDbConnection()

export const createJournalEntry = (req, res) => {
    const newJournalEntry = req.body
    const { id } = req.user
    try {
        const insertStatementContent = `'${uuidv4()}', '${newJournalEntry.associated_journal}', '${newJournalEntry.title}', '${newJournalEntry.content}', CURRENT_TIMESTAMP, '${id}'`.toString()
        pool.query(`INSERT INTO journal_entries (journal_entry_id, associated_journal, title, content, date_created, owner) VALUES (${insertStatementContent});`, (error, results) => {
            if (error) {
                res.status(400).json(error.message)
            } else {
                res.status(201).send('Journal Entry Added')
            }
        })
    } catch {
        res.sendStatus(500)
    }
}

export const getJournalEntry = (req, res) => {
    const { journalEntryId } = req.params;
    const { id } = req.user
    try {
        pool.query(
            `SELECT * FROM journal_entries WHERE journal_entry_id='${journalEntryId}' AND owner='${id}';`, (error, results) => {
            if (error) {
                res.status(400).json(error.message)
            } else {
                res.status(200).json(results.rows)
            }
        })
    } catch {
        res.sendStatus(500)
    }
}

export const updateJournalEntry = (req, res) => {
    const { journalEntryId } = req.params;
    const updatedJournalEntry = req.body
    const { id } = req.user
    pool.query(
        `UPDATE journal_entries 
        SET title='${updatedJournalEntry.title}', content='${updatedJournalEntry.content}', date_updated=CURRENT_TIMESTAMP
        WHERE journal_entry_id='${journalEntryId}' AND owner='${id}';`, (error, results) => {
        if (error) {
            res.status(400).json(error.message)
        } else {
            res.status(201).send('Journal Entry Updated')
        }
    })
}

export const deleteJournalEntry = (req, res) => {
    const { journalEntryId } = req.params;
    const { id } = req.user
    try {
        pool.query(`DELETE FROM journal_entries WHERE journal_entry_id = '${journalEntryId}' AND owner='${id}'`, (error, results) => {
            if(error) {
                res.status(400).json(error.message)
            } else {
                res.status(200).json('Success')
            }
        })
    } catch {
        res.sendStatus(500)
    }
}