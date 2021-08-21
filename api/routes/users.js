import express from 'express';

import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();


router.get('/', getUsers)

router.post('/', createUser)

// Adding a colon means there could be anything on this route of :id
router.get('/:id', getUser)

router.delete('/:id', deleteUser)

// PATCH vs PUT. Patch is to update just some things. PUT is a full overwrite.
router.patch('/:id', updateUser)

// As with most JS, export to be used elsewhere
export default router;