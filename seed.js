require('dotenv').config(); // Load .env first
const mongoose = require('mongoose');
const Blog = require('./model/blog.model');

const blogs = [
  {
    title: "Introduction to Node.js",
    content: "Node.js is a JavaScript runtime built on Chrome's V8 engine...",
    image: "https://example.com/images/nodejs.png",
  },
  {
    title: "Mastering MongoDB",
    content: "MongoDB is a NoSQL document database that allows you to store JSON-like data...",
    image: "https://example.com/images/mongodb.png",
  },
  {
    title: "Understanding Express.js Middleware",
    content: "Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function...",
    image: "https://example.com/images/express.png",
  },
];

const seedData = async () => {
  try {
    const dbURI = process.env.MONGO_URI;
    if (!dbURI) throw new Error("MONGODB_URI not found in .env");

    await mongoose.connect(dbURI);
    await Blog.deleteMany();
    await Blog.insertMany(blogs);
    console.log('✅ Blog data seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedData();