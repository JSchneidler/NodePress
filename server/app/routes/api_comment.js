var express = require('express');
var app = express();
var router = express.Router();
var jwt_middleware = require('./middleware/jwt');

var Post = require(__root + '/app/models/Post');
var Comment = require(__root + '/app/models/Comment');
var User = require(__root + '/app/models/User');

router.post('/post/:id/comment', jwt_middleware(false), function(req, res) {
	if (!req.body.body) return res.fail('Missing comment body');
	var new_comment = {
		body: req.body.body
	};
	Post.findOne({ _id: req.params.id }, function(err, post) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		new_comment.post = post._id;
		if (req.user) {
			User.findOne({ username: req.user.username }, function(err, user) {
				if (err) {
					console.log(err);
					return res.fail('Server error');
				}
				if (user) new_comment.user = user._id;
				else return res.fail('No user with given username exists');
			});
		} else new_comment.author = req.body.author;
	});
	new_comment.save(function(err) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		return res.pass(new_comment);
	});
});

router.delete('/post/:id/comment/:c_id', jwt_middleware(true), function(req, res) {
	Comment.findOne({ id: req.params.c_id }, function(err, comment) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		if (req.user.username === comment.user || req.user.admin || req.user.moderator) {
			comment.remove(function(err, comment) {
				if (err) {
					console.log(err);
					return res.fail('Server error');
				}
				return res.pass('Comment deleted');
			});
		}
		return res.fail('Not enough authority to remove comment');
	});
});

module.exports = router;