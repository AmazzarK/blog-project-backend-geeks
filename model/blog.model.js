const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // This adds createdAt and updatedAt fields automatically
});

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
