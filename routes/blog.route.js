const express = require('express');
const router = express.Router();
const { getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');
const upload = require('../middleware/multer'); // <-- Multer middleware
const { authenticate } = require('../middleware/AuthoBlog.Middleware');

// Get all blogs
router.get('/', getBlogs);

// Add new blog (with image)
router.post('/add-blog', createBlog);

// Update blog (optional image update)
router.put('/:id', updateBlog);

// Delete blog
router.delete('/:id',  deleteBlog);

module.exports = router;
