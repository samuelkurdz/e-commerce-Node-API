/* eslint-disable no-console */
const Product = require('../models/product');
const User = require('../models/user');

const errorThrower = (error, next) => {
  if (!error.statusCode) {
    // eslint-disable-next-line no-param-reassign
    error.statusCode = 500;
    // eslint-disable-next-line no-param-reassign
    error.message = 'Internal Server Error';
  }
  next(error);
};

// for all throw errors in a then block
// the remainder of the async code stops
// it moves to the catch error callback

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    }).catch((error) => {
      errorThrower(error, next);
    });
};

exports.getSingleProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => {
      if (!product) {
        const error = new Error('Could not find product');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json(product);
    }).catch((error) => {
      errorThrower(error, next);
    });
};

// eslint-disable-next-line no-unused-vars
exports.getCart = (req, res, next) => {
  const { userId } = req;
  User.findById(userId)
    .then((loggedinUser) => {
      if (!loggedinUser) {
        const error = new Error('Could not find user');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ cart: loggedinUser.cart });
    }).catch((error) => {
      errorThrower(error, next);
    });
};
