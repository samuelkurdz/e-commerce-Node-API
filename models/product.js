const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({

  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  thumbnailUrls: [{
    type: String,
    required: false,
  }],
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  categories: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  variations: [{
    type: String,
    required: false,
  }],
  quantityInStock: {
    type: Number,
    required: true,
    min: 0,
    max: 50,
  },
  isFeatured: {
    type: Boolean,
    default: false,
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
