CREATE TABLE journal_entries(
    journal_entry_id uuid,
    associated_journal uuid,
    title character varying,
    content json,
    date_created timestamp without time zone,
    date_updated timestamp without time zone
);
CREATE TABLE journals(
    journal_id uuid,
    owner uuid,
    journal_title character varying,
    date_created timestamp without time zone
);
CREATE TABLE users(
    email character varying,
    password character varying,
    first_name character varying,
    last_name character varying,
    id uuid
);