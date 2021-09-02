// This inital Express Setup adapted from https://www.youtube.com/watch?v=l8WPWK9mS5M

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import helmet from 'helmet'

dotenv.config()

import usersRoutes from './routes/users.js'
import journalsRoutes from './routes/journals.js'
import entriesRoutes from './routes/entries.js'

const app = express();
const PORT = 5000;

app.use(express.json());

// The below are for security. I should probably set the CORS but don't understand it well enough.
app.use(cors())
app.use(helmet())

// Setting the below creates the root route which can then be defined in a different file
app.use('/users', usersRoutes)
app.use('/journals', journalsRoutes)
app.use('/entries', entriesRoutes)

// health endpoint for troubleshooting locally
// app.get('/health', (req, res) => res.status(200).send('Server Running'))

app.listen(PORT, () => {console.log(`Server is running on port: ${PORT}`)})
app.listen()