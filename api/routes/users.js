import express from 'express';

import { getUsers, createUser, logUserIn, getUserJournals } from '../controllers/users.js';
import { authenticateToken } from '../controllers/authentication.js';

const router = express.Router();


router.get('/', authenticateToken, getUsers)

router.post('/', createUser)

router.post('/login', logUserIn)

// Don't think I need to be able to delete user
// router.delete('/:id', deleteUser)

router.get('/:id/journals', authenticateToken, getUserJournals)

// As with most JS, export to be used elsewhere
export default router;