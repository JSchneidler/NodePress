var express = require('express');
var app = express();
var router = express.Router();
var jwt_middleware = require('./middleware/jwt');
var _ = require('lodash');

var Post = require(__root + '/app/models/Post');
var User = require(__root + '/app/models/User');
var Upvote = require(__root + '/app/models/Upvote');
var Comment = require(__root + '/app/models/Comment');

router.get('/post', function(req, res) {
	Post.find().limit(15).exec(function(err, posts) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		if (posts) return res.pass(posts);
		return res.fail('No posts');
	});
});

router.post('/post', jwt_middleware(true), function(req, res) {
	var body = req.body;
	if (body.title && body.body && body.author_id) {
		User.findOne({ _id: req.user._id }, function(err, user) {
			if (err) {
				console.log(err);
				return res.fail('Server error');
			}
			if (!user) return res.fail('No user with given credentials exists');
			Post.create({
				title: body.title,
				body: body.body,
				user: user._id
			}, function(err, post) {
				if (err) {
					console.log(err);
					return res.fail('Server error');
				}
				return res.pass(post);
			});
		});
	}
	return res.fail('Missing title, body, or author id');
});

router.get('/post/:id', function(req, res) {
	Post.findOne({ _id: req.params.id }, function(err, post) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		return res.pass(post);
	});
});

router.put('/post/:id', jwt_middleware(true), function(req, res) {
	var body = req.body;
	if (body) {
		Post.findOne({ _id: req.params.id }, function(err, post) {
			if (err) {
				console.log(err);
				return res.fail('Server error');
			}
			post.title = body.title;
			post.body = body.body;
			post.save(function(err, post) {
				if (err) {
					console.log(err);
					return res.fail('Server error');
				}
				return res.pass('Post updated');
			});
		});
	} else {
		return res.fail('Missing updates');
	}
});

router.delete('/post/:id', jwt_middleware(true), function(req, res) {
	Post.findOne({ _id: req.params.id }, function(err, post) {
		if (err) {
			console.log(err);
			return res.fail('Server error');
		}
		post.remove(function(err, post) {
			if (err) {
				console.log(err);
				return res.fail('Server error');
			}
			return res.pass('Post deleted successfully');
		});
	});
});

router.get('/posts/:id/upvote', function(req, res) {
	var id = req.params.id;
	var query_options = {
		where: {
			id: id
		},
		include: common_includes
	};

	// Look for already existing upvote with same PostId and IP.
	Upvote.findOne({ where: { ip: req.ip, PostId: id }}).then(function(upvote) {
		if (upvote !== null) return res.fail('Already upvoted');

		// No upvote exists, create one and associate with post
		Upvote.create({
			ip: req.ip,
			PostId: id,
		}).then(function() {
			// Re-fetch post with associations
			Post.findOne(query_options).then(function(post) {
				return res.pass(post);
			});
		}).catch(function(err) {
			console.log(err);
			return res.fail('Server error');
		});
	});
});

module.exports = router;