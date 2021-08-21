import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';

const pool = new pg.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'journal-app',
    password: 'password',
    port: 5432
})

export const getUsers = (req, res) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if(error) {
            res.status(400)
        } else {
            res.status(200).json(results.rows)
        }
    })
}

export const createUser = (req, res) => {
    const newUser = req.body
    const insertStatementContent = `'${uuidv4()}', '${newUser.email}', '${newUser.password}', '${newUser.firstName}', '${newUser.lastName}'`.toString()
    pool.query(`INSERT INTO users (id, email, password, first_name, last_name) VALUES (${insertStatementContent});`, (error, results) => {
        if (error) {
            res.status(400).json(error.message)
        } else {
            res.status(201).send('User Added')
        }
    })
}

export const getUser = (req, res) => {
    const { id } = req.params;

    pool.query(`SELECT * from users WHERE id = '${id}';`, (error, results) => {
        if (error) {
            res.status(400).json(error.message)
        } else {
            res.status(200).json(results.rows)
        }
    })
}


// Don't actually think I need this
export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id)

// Come back to this - there is no check to actually see if the user id was deleted.
    res.send(`User with ${id} deleted.`)
}

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