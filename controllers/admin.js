/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const Product = require('../models/product');

function errorThrower(error, next) {
  if (!error.statusCode) {
    // eslint-disable-next-line no-param-reassign
    error.statusCode = 500;
    // eslint-disable-next-line no-param-reassign
    error.message = 'Internal Server Error';
  }
  next(error);
}

function noProductFoundError(product) {
  if (!product) {
    const error = new Error('Could not find product');
    error.statusCode = 404;
    throw error;
  }
}

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
    categories,
    availableQuantity,
    price,
    description,
    thumbnailUrls,
    variations,
  } = req.body;
  const product = new Product({
    name,
    categories,
    availableQuantity,
    price,
    description,
    thumbnailUrls,
    variations,
  });
  //  saving product to database
  product.save().then((result) => {
    res.status(201).json(result);
  }).catch((error) => {
    errorThrower(error, next);
  });
};

exports.getSingleProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId).then((product) => {
    noProductFoundError(product);
    res.status(200).json(product);
  }).catch((error) => {
    errorThrower(error, next);
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findByIdAndRemove(productId).then((result) => {
    if (!result) {
      const error = new Error('Product does not exist');
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({ message: 'Product Deleted Successfully' });
  }).catch((error) => {
    errorThrower(error, next);
  });
};

exports.postEditProduct = (req, res, next) => {
  const { productId } = req.params;
  const {
    name,
    categories,
    availableQuantity,
    price,
    description,
    thumbnailUrls,
    variations,
  } = req.body;
  Product.findById(productId).then((product) => {
    noProductFoundError(product);
    product.name = name;
    product.categories = categories;
    product.availableQuantity = availableQuantity;
    product.price = price;
    product.description = description;
    product.variations = variations;
    product.thumbnailUrls = thumbnailUrls;
    return product.save();
  }).then((updatedProduct) => {
    res.status(200).json({ message: 'Product Updated', updatedProduct });
  }).catch((error) => {
    errorThrower(error, next);
  });
};
