var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwt_config = require(__root + 'config').jwt;
var jwt_middleware = require('./middleware/jwt');
var _ = require('lodash');

var formatUser = require('./functions').formatUser;
var formatUsers = require('./functions').formatUsers;

var User = require(__root + '/app/models/User');

const salt_rounds = 10;
var tokenExpiresIn = '24h';

router.get('/ip', function(req, res) {
	return res.pass(req.ip);
});

router.get('/setup', function(req, res) {
	var username = 'jordan';
	var password = 'pass';
	bcrypt.hash(password, salt_rounds, function(err, hash) {
		User.create({
			username: username,
			password: hash,
			admin: true,
			moderator: true
		}, function(err, user) {
			if (err) {
				console.log(err);
				return res.fail(err);
			}
			return res.pass(formatUser(user));
		});
	});
});

router.get('/auth', jwt_middleware(true), function(req, res) {
	User.findOne({ id: req.user.id }, function(err, user) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		if (user === null) return res.fail('No user exists with given username');
		var token = jwt.sign(formatUser(user), jwt_config.secret, {
			expiresIn: tokenExpiresIn
		});
		return res.pass(token);
	});
});

router.post('/login', function(req, res) {
	if (!req.body.username || !req.body.password) {
		return res.fail('Missing username and/or password');
	} else {
		User.findOne({ 'username': req.body.username }, function(err, user ) {
			if (err) {
				console.log(err);
				return res.fail('Server error');
			}
			if (user === null) return res.fail('No user exists with given username');
			bcrypt.compare(req.body.password, user.password, function(err, result) {
				if (err) {
					console.log(err);
					return res.fail('Server error');
				} else if (result == true) {
					var token = jwt.sign(formatUser(user), jwt_config.secret, {
						expiresIn: tokenExpiresIn
					});
					return res.pass(token);
				} else {
					return res.fail('Incorrect password');
				}
			});
		});
	}
});

router.post('/register', function(req, res) {
	if (!req.body.username || !req.body.password) {
		return res.fail('Missing username and/or password');
	}
	User.findOne({ username: req.body.username }, function(err, user) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		if (user) return res.fail('Username already exists');
		bcrypt.hash(req.body.password, salt_rounds, function(err, hash) {
			if (err) {
				console.log(err);
				return res.fail('Server error');
			}
			User.create({
				username: req.body.username,
				password: hash
			}, function(err, user) {
				if (err) {
					console.log(err);
					return res.fail('Server error');
				}
				jwt.sign(formatUser(user), jwt_config.secret, {
					expiresIn: tokenExpiresIn
				}, function(err, token){
					if (err) {
						console.log(err);
						return res.fail('Server error');
					}
					return res.pass(token);
				});
			});
		});
	});
});

function formatUser(user) {
	return _.omit(JSON.parse(JSON.stringify(user)), ['__v', 'password']);
}

function formatUsers(users) {
	var formatted = [];
	for (var i = 0; i < users.length; i++) {
		formatted.push(formatUser(users[i]));
	}
	return formatted;
}

module.exports = router;