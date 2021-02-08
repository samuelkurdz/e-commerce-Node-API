const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  products: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
    },
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  deliveryDetails: {
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: 'pending',
      // delivery status options
      // pending, in-review, delivery in-progress, complete
    },
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
