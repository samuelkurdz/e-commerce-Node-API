const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  // prepare this data from userId after isAuthWare verification
  userData: {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  // rest of these data comes from client (frontend)
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    variationChoice: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
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
