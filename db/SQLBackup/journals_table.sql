DROP TABLE IF EXISTS journals;
CREATE TABLE journals(
    journal_id uuid,
    owner uuid,
    journal_title character varying,
    date_created timestamp without time zone
);