// Main server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// routes/authRoutes.js
router.post('/login', loginUser); // Results in /api/users/login
router.post('/register', registerUser); // Results in /api/users/register



const app = express();

// Middleware
// Replace app.use(cors()); with this:
app.use(cors({
  
  origin: ['https://task-manager-zt3p.onrender.com', 'http://localhost:5173'], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json()); // Allows parsing of JSON data in the body
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/tasks', taskRoutes);

// Database connection and server initialization
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });