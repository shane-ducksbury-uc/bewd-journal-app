import express from 'express';

import { getUsers, createUser, logUserIn, updateUser, getUserJournals } from '../controllers/users.js';
import { authenticateToken } from '../controllers/authentication.js';

const router = express.Router();


router.get('/', authenticateToken, getUsers)

router.post('/', createUser)

router.post('/login', logUserIn)

// Don't think I need to be able to delete user
// router.delete('/:id', deleteUser)

// PATCH vs PUT. Patch is to update just some things. PUT is a full overwrite.
router.patch('/:id', updateUser)

router.get('/:id/journals', getUserJournals)

// As with most JS, export to be used elsewhere
export default router;