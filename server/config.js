var path = require('path');

module.exports = {
  mongo: {
    url: 'mongodb://localhost/nodepress'
  },
  server: {
    port: 3000,
    distFolder: path.resolve(__dirname, '../build')
  },
  jwt: {
  	secret: 'greatbearrainforest'
  }
};