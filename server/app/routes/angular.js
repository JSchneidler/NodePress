var express = require('express');
var router = express.Router();

var config = require(__root + 'config');

/* GET home page. */
router.all('/*', function(req, res) {
  res.sendFile('master.html', { root: config.server.distFolder });
});

module.exports = router;
