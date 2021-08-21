# Database Layout Ideas

## Users
- id
- email
- password
- first_name
- last_name
- salt

## Journal
- journal_id
- owner
- journal_title
- date_created

## Journal Entries
- journal_entry-id
- associated_journal
- title
- content
- date_updated
- date_created