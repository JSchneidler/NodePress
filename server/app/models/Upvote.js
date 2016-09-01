var mongoose = require('mongoose');

var UpvoteSchema = new mongoose.Schema({
	ip: String,
	post: { type: mongoose.Schema.ObjectId, ref: 'Post'},
	comment: { type: mongoose.Schema.ObjectId, ref: 'Comment'}
});

module.exports = mongoose.model('Upvote', UpvoteSchema);