var express = require('express');
var router = express.Router();

router.use(function(req, res, next) {
	console.log("API request made: " + req.ip);

	// Router extensions
	res.fail = function(message) {
		res.json({
			success: false,
			message: message
		});
	}

	res.pass = function(data) {
		res.json({
			success: true,
			data: data
		});
	}

	next();
})

router.get('/', function(req, res) {
	res.send("Welcome to the API.");
});

module.exports = router;