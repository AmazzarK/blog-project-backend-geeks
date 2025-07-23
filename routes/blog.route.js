const express = require('express');
const router = express.Router();
const { getBlogs, createBlog, updateBlog, deleteBlog } = require('../controllers/blog.controller');

// Example: GET all blogs
router.get('/', getBlogs);

// Example: POST a new blog
router.post('/add-blog', createBlog);

// PUT update blog
router.put('/:id', updateBlog);   

// DELETE blog
router.delete('/:id', deleteBlog);   


module.exports = router;
