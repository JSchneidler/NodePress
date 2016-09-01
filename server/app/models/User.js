var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  moderator: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  joined: { type: String, default: Date.now },
  posts: [{ type: mongoose.Schema.ObjectId, ref: 'Post'}],
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment'}]
});

module.exports = mongoose.model('User', UserSchema);