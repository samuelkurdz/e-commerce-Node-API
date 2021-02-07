/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
      },
    }],
  },
});

// userSchema.methods.addToCart = (product) => {
//   const cartProductIndex = this.cart.items.findIndex((cp) => cp.productId.toString() === product._id.toString());
//   let newQuantity = 1;
//   const updatedCartItems = [...this.cart.items];
//   // cartProductIndex throws -1 if product is not in the cart Items array
//   if (cartProductIndex >= 0) {
//     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//     updatedCartItems[cartProductIndex].quantity = newQuantity;
//   } else {
//     updatedCartItems.push({
//       productId: product._id,
//       quantity: newQuantity,
//     });
//   }

//   this.cart = {
//     items: updatedCartItems,
//   };
//   return this.save();
// };

// userSchema.methods.deleteItemFromCart = (productId) => {
//   const updatedCartItems = this.cart.items.filter((item) => item.productId.toString() !== productId.toString());
//   this.cart = {
//     items: updatedCartItems,
//   };
//   return this.save();
// };

// userSchema.methods.clearCart = () => {
//   this.cart = { items: [] };
//   return this.save();
// };

module.exports = mongoose.model('User', userSchema);
