## To Do

### App State
- Specify the user so that we can get real context for everything (done)
- App is now crashing on different route refresh than home (something to do with redirect)

### Main Page
- Routing
- Buttons to get to different sections on Mobile?
- On Desktop - Row for journal entries, Row for Viewing Entry (almost like outlook)

### Journal Entry Page
- Box to enter journal entry
- Title
- Save Button
- Cancel
- Autosaving (extra feature)

### Journal Viewing Page
- Scrollable page on desktop - Calendar on Mobile
- Click to view (done)
- Can delete
- Can open to edit
- Refactor of the API fetch as it isn't cleaning up properly

### Overall Journal
- Ability to add new journals (done)

### Login Page

### Authentication
- OAuth??
- JWT or OAUTH (Went for JWT)
- BCRYPT for the password hashing / salting (Done)

### REST API
- Create a REST API (In Progress)
- Determine what requests will need to be set up (Basically Done)
- Need to fix up my requests to be try catches
- Fix the API so that authentication is required on all endpoints?
- Create a refresh token?
- Add env file for my db and for docker
- https://stackoverflow.com/questions/942951/rest-api-error-return-good-practices
- Install Driver for PostgreSQL (Done)
- Make Express send back errors? (Not Done - Should probably do something about this.)

### Postgres
- Work out DB Table Structure (Probably Users and Journal Entries Connected via ID of User) (mostly done)
- Update users table to remove
