import pg from 'pg';
import dotenv from 'dotenv'

dotenv.config()

export const createDbConnection = () => {
    return new pg.Pool({
    user: `${process.env.POSTGRES_USER}`,
    host: `${process.env.POSTGRES_HOST}`,
    database: `${process.env.POSTGRES_DATABASE}`,
    password: `${process.env.POSTGRES_PASSWORD}`,
    port: `${process.env.POSTGRES_PORT}`,
})}