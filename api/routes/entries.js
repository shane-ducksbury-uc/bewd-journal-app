import express from 'express';

import { createJournalEntry, getJournalEntry, updateJournalEntry, deleteJournalEntry } from '../controllers/entries.js'; 
import { authenticateToken } from '../controllers/authentication.js';

const router = express.Router()

router.post('/', authenticateToken, createJournalEntry)

router.get('/:journalEntryId', authenticateToken, getJournalEntry)

router.put('/:journalEntryId', authenticateToken, updateJournalEntry)

router.delete('/:journalEntryId', authenticateToken, deleteJournalEntry)

export default router;