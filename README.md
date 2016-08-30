# NodePress
A CMS being created for learning, teaching, and experimentation using Node.js, MongoDB, Express, and Angular 1.

## Prereqs
* Node.js
* MongoDB, running locally
* Gulp

## Setup
1. Run `bower install` in client directory.
2. Run `npm install` in server directory.
3. Ensure `mongo.url` in `server/config.js` is correct for your instance.
4. Run `gulp` to create build assets.
5. Use nodemon or `npm start` to start the server.
6. Navigate to `localhost:3000`, you should see "This is the index page."