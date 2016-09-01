var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	body: String,
	author: String,
	user: { type: mongoose.Schema.ObjectId, ref: 'User' },
	post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
	upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Upvote' }]
});

module.exports = mongoose.model('Comment', CommentSchema);