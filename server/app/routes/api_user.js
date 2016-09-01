var express = require('express');
var app = express();
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var jwt_middleware = require('./middleware/jwt');
var _ = require('lodash');

var formatUser = require('./functions').formatUser;
var formatUsers = require('./functions').formatUsers;

var User = require(__root + '/app/models/User');
var Post = require(__root + '/app/models/Post');
var Comment = require(__root + '/app/models/Comment');

router.get('/user', jwt_middleware(true), function(req, res) {
	User.findAll({ limit: 10 }).then(function(users) {
		return res.pass(formatUsers(users));
	}).catch(function(err) {
		console.log(err);
		return res.fail('Server error');
	});
});

router.get('/user/:username', function(req, res) {
	User.findOne({ where: { username: req.params.username } }).then(function(user) {
		if (!user) return res.fail('User not found');
		return res.pass(formatUser(user));
	}).catch(function(err) {
		console.log(err);
		return res.fail('Server error');
	});
});

router.get('/user/:userid/posts', function(req, res) {
	Post.findAll({ where: { UserId: req.params.userid } }).then(function(posts) {
		return res.pass(posts);
	}).catch(function(err) {
		console.log(err);
		return res.fail('Server error');
	});
});

router.get('/user/:userid/comments', function(req, res) {
	Comment.findAll({ where: { UserId: req.params.userid } }).then(function(comments) {
		return res.pass(comments);
	}).catch(function(err) {
		console.log(err);
		return res.fail('Server error');
	});
});

module.exports = router;