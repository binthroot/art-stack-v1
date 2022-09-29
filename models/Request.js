const mongoose = require('mongoose');

const RequestSchema = new mongoose.Schema({
  requestName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  sku: {
    type: String,
  },
  descriptionTaste: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['Backlog', 'To-Do', 'In-Progress', 'Completed'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Request', RequestSchema);
