/* eslint-disable no-console */
// const Product = require('../models/product');
// const User = require('../models/user');

// const errorThrower = (error, next) => {
//   if (!error.statusCode) {
//     // eslint-disable-next-line no-param-reassign
//     error.statusCode = 500;
//     // eslint-disable-next-line no-param-reassign
//     error.message = 'Internal Server Error';
//   }
//   next(error);
// };

// eslint-disable-next-line no-unused-vars
exports.createOrder = (req, res, next) => {
  res.status(200).json({ message: 'nothin is processing' });
};

// eslint-disable-next-line no-unused-vars
exports.getOrders = (req, res, next) => {
  res.status(200).json({ message: 'orders are coming right up' });
};

// eslint-disable-next-line no-unused-vars
exports.getCheckout = (req, res, next) => {
  res.status(200).json({ message: 'you are to pay for your order man' });
};