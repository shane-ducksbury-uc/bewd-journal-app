import express from 'express';

import { createJournal, getJournalEntries } from '../controllers/journals.js';
import { authenticateToken } from '../controllers/authentication.js';

const router = express.Router()

// Don't know if I need this one either
// router.get('/', (req, res) => {
//     console.log('Hello')
// })

// TBD What I am going to do with this one
router.post('/:userId', authenticateToken, createJournal)

router.get('/:journalId', authenticateToken, getJournalEntries)

// router.delete('/:journal-id', (req, res) => {

// })

// router.patch('/:journal-id', (req, res) => {

// })

export default router;