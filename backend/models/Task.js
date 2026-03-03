// Task model
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // Ties the task to a specific user
  },
  title: { type: String, required: true },
  description: { type: String },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);