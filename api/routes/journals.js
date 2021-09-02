import express from 'express';

import { createJournal, getJournalEntries } from '../controllers/journals.js';
import { authenticateToken } from '../controllers/authentication.js';

const router = express.Router()

// TBD What I am going to do with this one
router.post('/:userId', authenticateToken, createJournal)

router.get('/:journalId', authenticateToken, getJournalEntries)


export default router;