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
  dateDue: {
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Request', RequestSchema);
