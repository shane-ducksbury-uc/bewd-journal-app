DROP TABLE IF EXISTS journal_entries;
CREATE TABLE journal_entries(
    journal_entry_id uuid,
    associated_journal uuid,
    title character varying,
    content json,
    date_created timestamp without time zone,
    date_updated timestamp without time zone
);