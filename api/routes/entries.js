import express from 'express';

import { createJournalEntry, getJournalEntry, updateJournalEntry, deleteJournalEntry } from '../controllers/entries.js'; 

const router = express.Router()

router.post('/', createJournalEntry)

router.get('/:journalEntryId', getJournalEntry)

router.put('/:journalEntryId', updateJournalEntry)

router.delete('/:journalEntryId', deleteJournalEntry)

export default router;