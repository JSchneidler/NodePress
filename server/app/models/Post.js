var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	body: String,
	date_published: { type: String, default: Date.now },
	date_updated: { type: String, default: Date.now },
	author: { type: mongoose.Schema.ObjectId, ref: 'User' },
	comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment' }],
	upvotes: [{ type: mongoose.Schema.ObjectId, ref: 'Upvote' }]
});

/*
PostSchema.pre('update', function() {
	this.update({}, { $set: { date_updated: new Date() } });
});
*/

module.exports = mongoose.model('Post', PostSchema);