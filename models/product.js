const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  thumbnailUrls: [{
    type: String,
    required: true,
  }],
  description: {
    type: String,
    required: true,
  },
  categories: [{
    type: String,
    required: true,
  }],
  variations: [{
    type: String,
    required: true,
  }],
  availableQuantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: false,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
