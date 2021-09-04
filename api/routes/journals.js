import express from 'express';

import { createJournal, getJournalEntries, deleteJournal } from '../controllers/journals.js';
import { authenticateToken } from '../controllers/authentication.js';

const router = express.Router()

router.post('/', authenticateToken, createJournal)

router.get('/:journalId', authenticateToken, getJournalEntries)

router.delete('/:journalId', authenticateToken, deleteJournal)

export default router;