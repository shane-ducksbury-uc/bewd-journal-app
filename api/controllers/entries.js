import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';

const pool = new pg.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'journal-app',
    password: 'password',
    port: 5432
})

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