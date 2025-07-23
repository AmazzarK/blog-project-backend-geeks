// index.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
const cors = require('cors');
app.use(cors());

app.use(express.json());

// Routes
const userRoutes = require('./routes/user.route.js');
app.use('/api/users', userRoutes);

const blogRoutes = require('./routes/blog.route.js');
app.use('/api/blogs', blogRoutes);
// app.use('/api/auth', authRoutes);

const uploadRoutes = require('./routes/upload.route.js');
app.use('/api/upload', uploadRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World from Express App!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
