DROP TABLE IF EXISTS users;
CREATE TABLE users(
    email character varying,
    password character varying,
    first_name character varying,
    last_name character varying,
    salt character varying,
    id uuid
);