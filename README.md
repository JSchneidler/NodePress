# mean-spa-skeleton
A skeleton I use for SPA projects with basic MEAN technologies integrated.

## Prereqs
* Node.js
* MongoDB, running locally

## Setup
1. Run `bower install` in client directory.
2. Run `npm install` in server directory.
3. Ensure `mongo.url` in `server/config.js` is correct for your instance.
4. Use nodemon or `npm start` to start the server.
5. Navigate to `localhost:3000`, you should see "This is the index page."