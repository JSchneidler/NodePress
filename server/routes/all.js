var express = require('express');
var router = express.Router();

var config = require('../config');

/* GET home page. */
router.all('/*', function(req, res) {
  res.sendFile('index.html', { root: config.server.distFolder });
});

module.exports = router;
