import express from 'express';

import { createJournalEntry } from '../controllers/entries.js'; 

const router = express.Router()

router.post('/', createJournalEntry)

export default router;