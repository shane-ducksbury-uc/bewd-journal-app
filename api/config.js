import pg from 'pg';
import dotenv from 'dotenv'

dotenv.config()

// This file creates a connection to the database, to be imported once by other functions
export const createDbConnection = () => {
    return new pg.Pool({
    user: `${process.env.POSTGRES_USER}`,
    host: `${process.env.POSTGRES_HOST}`,
    database: `${process.env.POSTGRES_DATABASE}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    port: 5432,
})}