const mongoose = require('mongoose');

const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Post'
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
