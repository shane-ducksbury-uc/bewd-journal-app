## To Do

## To Do As Priority Tonight / Tomorrow morning
- Convert DB connection into env (done)
- Convert Docker Compose variables into env (done)
- Set up linode server
- Set up NGINX
- Work out how to deploy an app to prod with React
- See if can set up automated deployment (rollup/docker?)

## Hosting
- Determine hosting location (linode)
- Set up automated deployment?
- Set up Nginx and HTTPS (tbd if publicly exposing api)

### Overall Journal
- Add button to add new journal
- Choose and make a colour palette
- Improve the input of the form data
- decide if rich-markdown-editor is the right tool
- Crashes on Network Errors (need to catch and turn into some sort of errors.)
- Ability to add new journals (done)

### Login Page
- Make the login and registration pages much nicer.
- Make a home page.


### App State
- Specify the user so that we can get real context for everything (done)
- App is now crashing on different route refresh than home (something to do with redirect) (fixed)
- Not rendering routes correctly on three pane view. (fixed)
- Need to add in a 404
- New Journal Entry Not working in third window pane (now fixed)

### Main Page
- Routing (In progress)
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
- Date?
- Can make a new journal
- Can open to edit
- Click to view (done)
- Can delete (done)
- Refactor of the API fetch as it isn't cleaning up properly (? Don't remember what this was?)


### Authentication
- OAuth??
- JWT or OAUTH (Went for JWT)
- BCRYPT for the password hashing / salting (Done)

### REST API
- Create a REST API (In Progress)
- Fix the API so that authentication is required on all endpoints?
- Create a refresh token?
- https://stackoverflow.com/questions/942951/rest-api-error-return-good-practices
- Install Driver for PostgreSQL (Done)
- Make Express send back errors? (Not Done - Should probably do something about this.)
- Determine what requests will need to be set up (Basically Done)
- Need to fix up my requests to be try catches (mostly done)
- Add env file for my db and for docker (done)

### Postgres
- Work out DB Table Structure (Probably Users and Journal Entries Connected via ID of User) (mostly done)
- Update users table to remove salt
