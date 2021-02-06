/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const Product = require('../models/product');

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
  Product.find().then((products) => {
    if (!products) {
      const error = new Error('No Content');
      error.statusCode = 204;
      throw error;
    }
    res.status(200).json(products);
  }).catch((error) => {
    errorThrower(error, next);
  });
};

// eslint-disable-next-line consistent-return
exports.postAddProduct = (req, res, next) => {
  //  validation results from admin route
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 400;
    throw error;
  }

  const {
    name,
    category,
    availableQuantity,
    price,
    description,
    thumbnailUrl,
  } = req.body;
  const product = new Product({
    name,
    category,
    availableQuantity,
    price,
    description,
    thumbnailUrl,
  });
  //  saving product to database
  product.save().then((result) => {
    res.status(201).json(result);
  }).catch((error) => {
    errorThrower(error, next);
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId).then((product) => {
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
