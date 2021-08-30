import { v4 as uuidv4 } from 'uuid';
import { createDbConnection } from '../config.js'

const pool = createDbConnection()

export const createJournal = (req, res) => {
    try {
        const newJournal = req.body
        const { id } = req.user
        if (!newJournal.title) res.sendStatus(400)
        const insertStatementContent = `'${uuidv4()}', '${id}', '${newJournal.title}', CURRENT_TIMESTAMP`
        pool.query(`INSERT INTO journals (journal_id, owner, journal_title, date_created) VALUES (${insertStatementContent});`, (error, results) => {
            if (error) {
                res.status(400).json(error.message)
            } else {
                res.status(201).send('Journal Added')
            }
        })
    } catch {
        res.sendStatus(500)
    }
}

export const getJournalEntries = (req, res) => {
    const { journalId } = req.params;
    const { id } = req.user

    try {
        pool.query(`SELECT * FROM journal_entries WHERE owner='${id}' AND associated_journal= 
        (SELECT journal_id FROM journals WHERE journal_id='${journalId}')`, (error, results) => {
            if(error) {
                res.status(400).json(error.message)
            } else {
                res.status(200).json(results.rows)
            }
        })
        
    } catch (e) {
        res.sendStatus(500)
    }

}