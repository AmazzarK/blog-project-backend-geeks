const Blog = require('../model/blog.model');
const cloudinary = require('../utils/cloudinary');
const fs = require('fs');

// @desc    Get all blogs
// @route   GET /api/blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching blogs', error });
  }
};

// @desc    Create a new blog
// @route   POST /api/blogs
// exports.createBlog = async (req, res) => {
//   try {
//     let imageUrl = '';
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path);
//       imageUrl = result.secure_url;
//       fs.unlinkSync(req.file.path); // remove temp file
//     }

//     const { title, content, author } = req.body;
//     const newBlog = new Blog({
//       title,
//       content,
//       author,
//       image: imageUrl,
//     });

//     const savedBlog = await newBlog.save();
//     res.status(201).json(savedBlog);
//   } catch (error) {
//     res.status(400).json({ message: 'Error creating blog', error });
//   }
// };
/* POST /api/blogs   (expects JSON with image URL) */
exports.createBlog = async (req, res) => {
  try {
    const { title, content, author, image } = req.body;
    if (!title || !content)
      return res.status(400).json({ message: 'Title & content required' });

    const blog = await Blog.create({ title, content, author, image });
    res.status(201).json(blog);
  } catch (err) {
    res.status(400).json({ message: 'Error creating blog', err });
  }
};

// @desc    Update a blog
// @route   PUT /api/blogs/:id
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    // Check if a new image was uploaded
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.image = result.secure_url;
      fs.unlinkSync(req.file.path); // remove local temp file
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Error updating blog', error });
  }
};

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting blog', error });
  }
};
