const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
  },
  content: {
    type: Boolean,
  },
  writerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
