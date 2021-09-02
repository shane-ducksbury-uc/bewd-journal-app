# This is my repo for Bright Mind - A1 Back End Web Design
## By Shane Ducksbury | u3113923

https://brightmind.cc

## Project Setup
The project is split into three folders
- db - Database docker container and bootstrap folder
- app - React app for the website
- api - Express app for API


## Rationale

## About the project
For my web project I decided to build a journaling app, which allows the tracking of thoughts. A person can create, edit and delete journal entries, and come back to review them later.
I'd initially intended for the app to have a small wizard each time you journaled, allowing you to rank your mood and how you had been feeling during the day, but didn't have enough time to think through the UX/UI of this properly for implementation.

## Before I begin
The [WebDevSimplified Channel on YouTube](https://www.youtube.com/channel/UCFbNIlppjAuEX4znoulh0Cw) basically helped me with the base for each of my frameworks. It would have been impossible to put all of this together without all of the videos on his channel.

## About my stack
### Main Stack
For my project I have built a PERN stack using
- [PostgreSQL](https://www.postgresql.org/) as my database
- [Express](https://expressjs.com/) as my application framework (private API)
- [React](https://reactjs.org/) as my Front End Framework
- [Node](https://nodejs.org/en/about/) / NPM as my runtime / package manager

### Deployment
I have deployed my application using a Debian VPS on Linode, using Docker, Github Actions and NGINX as a reverse proxy.
By deploying like this I can simply push to the correct branch on Github and Github will then build my docker images. Once it is finished, a program (also a docker image) on my host pulls my images and restarts them, automatically deploying my updated app. I could have also worked out how to do something like Heroku, but I was low on time. There are caveats to deploying on a VPS, like backups and security, so in the future I will do further investigation into serverless docker deployments.

### Security
- I've implemented a [JWT token](https://jwt.io/introduction) based authorisation for the app (this isn't perfect though, will talk about it later).
- I've used [BCRYPT](https://github.com/kelektiv/node.bcrypt.js/) library to generate my salted passwords, and authenticate users when they come back to login.
- I've also included [Lets Encrypt](https://letsencrypt.org/) certificates so there is encryption Client to App.

### Other Libraries
I used a few other main libraries in my app:
- [React Router](https://reactrouter.com/)
- [Axios](https://axios-http.com/docs/intro) (for my API calls)
- [react-wysiwyg-editor](https://github.com/jpuri/react-draft-wysiwyg)
- [react-hook-form](https://react-hook-form.com/)
- [Bulma CSS](https://bulma.io/)

## How did I get here
### Choosing the Frameworks and DB
I first looked at the project requirements and determined which route I wanted to take. 
I've been looking for a project to properly implement and learn React, so felt this was a good opportunity to take it for a proper test spin. As I was using a Javascript front end framework it made sense to also go with a Javascript back-end (although I am partial to Python, so would like to try Django or Flask next). 
I haven't used a relational database before, so I wanted to try that out. I chose PostgreSQL because it is open source, has a full and mature feature set and I like the community around it.

### Building the App
Before even getting started, I made a ToDo list and listed out everything that I felt I would have to do. I eventually moved this to Trello.

I started with the API Express App as I needed to learn express. It is actually pretty straightforward if I am just serving normal CRUD requests to the database. If I'm honest this was the easiest part of the application, and I found it quite easy to add, update and change different functions of the app. I did have to be careful implementing my SQL calls to ensure I was properly sanitising most of the data, as well as providing a secure endpoint.

Speaking of the database, I had to decide on a table structure. I ended up with three tables - users, journals and journal entries. A journal entry is part of a journal, and then a journal is a part of a user. This means you can have multiple journals belonging to a user.

Following this I started to build out the React front end. I did come a little more unstuck here as I had to find ways to ensure my page wasn't crashing when data wasn't available. Using the useEffect hook I was able to rerender the page and set different states based on the data returning from the API. Seems easy, but it took me a while to get the hang of calling useEffect at the right time so as not to cause a infinite loop (cue a few bad browser lockups). I also found a bit of difficulty in getting my components to render when certain routes were reached in the application. React router helps with this, but it gets a little sticky when nested routes come into the equation.

I did leave my styles for longer than I should have, and I had to quickly pull in Bulma to save the day. The app is still a little janky style wise due to some weird issues with percentage values. I suspect this is related to React and its own way of doing things in the DOM.

## What could I improve
I still have a long list of things I would like to add to this app (and will do so once it has been marked.)
- Separation of the authentication component of the app into its own distinct microservice.
- Add refresh token and something like a Redis cache for my JWT. Currently, once a JWT is issued from my app it is valid forever. This is bad because someone could theoretically steal the token from a user and then use it to authenticate with my API.
- Push better features like Autosaving.
- Include functionality like uploading of images, voice etc.
- Improvement of the general layout, and addition of a main page.
- Creation of proper distinct styles.
- Modularised styles.
- Make the site responsive.

## Why did I choose this route for the structure of my application?
I've attempted to follow a methodology for building this application called [microservices](https://www.ibm.com/cloud/learn/microservices). The basic principle is to build independent and loosely coupled smaller services. By building each component separately the app has the flexibility to be scaled and changed and improved in the future, without impacting other parts of the application. It also means better code flexibility and readability (theoretically).

## Wait - why would you bother doing this for a simple task tracker?
This was more from personal interest in this methodology. I really like the idea behind microservices and programming business concepts like continuous development. By developing a full stack application like this, I have better learned how all of this fits together. I can now mix and match different parts of the app, and try out different things like a different framework or database as I have a well functioning base full stack application.