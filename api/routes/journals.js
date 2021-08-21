import express from 'express';

import { getUserJournals, createJournal, getJournalEntries } from '../controllers/journals.js';

const router = express.Router()

// router.get('/', (req, res) => {
//     console.log('Hello')
// })

// For tomorrow - i think the following two should probably live elsewhere
router.get('/:userId/journals', getUserJournals)

router.post('/:userId', createJournal)

router.get('/:journalId', getJournalEntries)

// router.delete('/:journal-id', (req, res) => {

// })

// router.patch('/:journal-id', (req, res) => {

// })

export default router;