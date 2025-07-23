const jwt = require('jsonwebtoken');
const User = require('../model/user.model'); 

// Middleware to protect routes (require authentication)
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user; 
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token', error });
  }
};


const authorizeBlogAuthor = (getBlogById) => {
  return async (req, res, next) => {
    const blogId = req.params.id;

    try {
      const blog = await getBlogById(blogId);

      if (!blog) return res.status(404).json({ message: 'Blog not found' });

      const isOwner = blog.author.toString() === req.user._id.toString();
      const isAdmin = req.user.role === 'admin';

      if (!isOwner && !isAdmin)
        return res.status(403).json({ message: 'Unauthorized to access this blog' });

      req.blog = blog; 
      next();
    } catch (error) {
      res.status(500).json({ message: 'Authorization check failed', error });
    }
  };
};

module.exports = { authenticate, authorizeBlogAuthor };
