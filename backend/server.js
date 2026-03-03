// Main server file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
// routes/authRoutes.js
router.post('/login', loginUser); // Results in /api/users/login
router.post('/register', registerUser); // Results in /api/users/register



const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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