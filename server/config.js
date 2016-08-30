var path = require('path');

module.exports = {
  mongo: {
    url: 'mongodb://localhost/chat'
  },
  server: {
    port: 3000,
    distFolder: path.resolve(__dirname, '../client/dist')
  }
};