import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { createDbConnection } from '../config.js';

const pool = createDbConnection()

export const createUser = async (req, res) => {
    const newUser = req.body
    // Basic Error handling to stop dodgy entries getting into db
    if (newUser.email && newUser.firstName && newUser.lastName){
        try {
            const hashedPassword = await bcrypt.hash(newUser.password, 10)
            const newUserId = uuidv4()
            const userInsert = `'${newUserId}', '${newUser.email}', '${hashedPassword}', '${newUser.firstName}', '${newUser.lastName}'`.toString()
            const journalInsert = `'${uuidv4()}', '${newUserId}', 'My Daily Journal', CURRENT_TIMESTAMP`.toString()

            // Generate a new account and a new journal on account creation
            pool.query(`INSERT INTO users (id, email, password, first_name, last_name) VALUES (${userInsert});
            INSERT INTO journals (journal_id, owner, journal_title, date_created) VALUES (${journalInsert});
            `, (error, results) => {
                if (error) {
                    res.status(500).json(error.message)
                    return
                } else {
                    res.status(201).send('User Added')
                }
            })
        } catch (e) {
            res.sendStatus(500)
        }
    } else {
        res.status(400).json('Request Body was incorrect.')
    }   
}

// Should update this to use different server. Should also update to expire tokens
// and to 
export const logUserIn = async (req, res) => {
    const userCreds = req.body
    try{
        pool.query(`SELECT * from users WHERE email='${userCreds.email.toString().trim()}';`, async (error, results) => {
            if (error) {
                res.status(500).json(error.message)
            } else {
                if (results.rows.length === 0) return res.sendStatus(401)
                const user = results.rows[0]
                try {
                    // Check the password against the salted hash
                    if(await bcrypt.compare(userCreds.password, user.password)){
                        // Generate a JWT
                        delete user.password
                        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
                        res.status(200).json({ accessToken: accessToken })
                    } else {
                        res.status(401).send()
                    }
                } catch (e) {
                    res.status(500).send(e.message)
                }
            }
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

export const getUsers = (req, res) => {
    const user = req.user
    try {
        pool.query(`SELECT email, id, first_name, last_name FROM users where id='${user.id.toString()}'`, (error, results) => {
            if(error) {
                res.status(400).send()
            } else {
                res.status(200).json(results.rows)
            }
        })
    } catch {
        res.status(500).send()
    }
}


// Don't actually think I need this
export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id)

// Come back to this - there is no check to actually see if the user id was deleted.
    res.send(`User with ${id} deleted.`)
}

// Below needs to be updated to use SQL
export const updateUser = (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    
    const user = users.find(user => user.id === id);

    if(firstName){
        user.firstName = firstName
    }

    if (lastName){
        user.lastName = lastName
    }

    if (age){
        user.age = age
    }

    res.send(user)
}

export const getUserJournals = (req, res) => {
    const { id } = req.params;
    pool.query(`SELECT * FROM journals WHERE owner = '${id}'`, (error, results) => {
        // This has crap error handling. Currently there is nothing stopping this from breaking if you put the wrong thing in the route.
        if(error) {
            res.status(400).json(error.message)
        } else {
            res.status(200).json(results.rows)
        }
    })
}