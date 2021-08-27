import { v4 as uuidv4 } from 'uuid';
import { createDbConnection } from '../config.js'

const pool = createDbConnection()

export const createJournal = (req, res) => {
    const newJournal = req.body
    const { userId } = req.params
    const insertStatementContent = `'${uuidv4()}', '${userId}', '${newJournal.title}', CURRENT_TIMESTAMP`
    console.log(insertStatementContent)
    pool.query(`INSERT INTO journals (journal_id, owner, journal_title, date_created) VALUES (${insertStatementContent});`, (error, results) => {
        if (error) {
            console.log('Crap.')
            res.status(400).json(error.message)
        } else {
            res.status(201).send('Journal Added')
        }
    })
}

export const getJournalEntries = (req, res) => {
    const { journalId } = req.params;
    pool.query(`SELECT * FROM journal_entries WHERE associated_journal = '${journalId}'`, (error, results) => {
        // This has crap error handling. Currently there is nothing stopping this from breaking if you put the wrong thing in the route.
        if(error) {
            res.status(400).json(error.message)
        } else {
            res.status(200).json(results.rows)
        }
    })
}