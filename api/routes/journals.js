import express from 'express';

import { createJournal, getJournalEntries } from '../controllers/journals.js';

const router = express.Router()

// Don't know if I need this one either
// router.get('/', (req, res) => {
//     console.log('Hello')
// })

// TBD What I am going to do with this one
router.post('/:userId', createJournal)

router.get('/:journalId', getJournalEntries)

// router.delete('/:journal-id', (req, res) => {

// })

// router.patch('/:journal-id', (req, res) => {

// })

export default router;