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

            // Send a 409 if the email exists
            const userCheck = await pool.query(`SELECT id, email FROM users WHERE email='${newUser.email.toString()}'`)
            if (userCheck.rowCount > 0){
                res.status(409).json('Email taken')
                return
            }

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
export const logUserIn = async (req, res) => {
    const userCreds = req.body
    console.log(req.body)
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

export const getUsers = async (req, res) => {
    const user = req.user
    try {
        pool.query(`SELECT email, id, first_name, last_name FROM users where id='${user.id.toString()}'`, (error, results) => {
            if(error) {
                res.status(400).send()
            } else {
                // Check token for invalid user - this is for the old token check. Can be removed at refresh token implementation.
                if (results.rowCount === 0){
                    res.sendStatus(403)
                } else {
                    res.status(200).json(results.rows)
                }
            }
        })
    } catch {
        res.status(500).send()
    }
}

export const getUserJournals = (req, res) => {
    const { id } = req.user
    try {
        pool.query(`SELECT * FROM journals WHERE owner = '${id}'`, (error, results) => {
            if(error) {
                res.status(400).json(error.message)
            } else {
                res.status(200).json(results.rows)
            }
        })
    } catch (e) {
        res.sendStatus(500)
    }

}