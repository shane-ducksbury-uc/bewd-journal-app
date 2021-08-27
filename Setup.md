To Deploy to new server
create .env for api then include ACCESS_TOKEN_SECRET

chmod 600

To generate token for secret.

node
require('crypto').randomBytes(64).toString('hex')



cd api
npm install
npm start

cd app
npm install
npm start
