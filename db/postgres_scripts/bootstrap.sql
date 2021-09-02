CREATE TABLE journal_entries(
    journal_entry_id uuid,
    associated_journal uuid,
    owner uuid,
    title character varying(256),
    content json,
    date_created timestamp without time zone,
    date_updated timestamp without time zone
);
CREATE TABLE journals(
    journal_id uuid,
    owner uuid,
    journal_title character varying(256),
    date_created timestamp without time zone
);
CREATE TABLE users(
    email character varying(128),
    password character varying(256),
    first_name character varying(64),
    last_name character varying(64),
    id uuid
);