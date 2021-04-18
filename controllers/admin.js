/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
const { validationResult } = require('express-validator');
const Product = require('../models/product');
const Category = require('../models/category');

function errorThrower(error, next) {
  if (!error.statusCode) {
    error.statusCode = 500;
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

// using async await comes with try&catch (syntactic sugar)
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();
    res.status(200).json(categories);
  } catch (error) {
    errorThrower(error, next);
  }
};

exports.createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 400;
    error.data = errors.array();
    errorThrower(error, next);
  } else {
    const {
      name, icon, color, image,
    } = req.body;
    const newCategory = new Category({
      name,
      icon: icon || '',
      color: color || '',
      image: image || '',
    });
    //  saving category to database
    try {
      const createdCategory = await newCategory.save();
      res.status(201).json({ message: 'category created', category: createdCategory });
    } catch (error) {
      errorThrower(error, next);
    }
  }
};

exports.deleteCategory = (req, res, next) => {
  const { categoryId } = req.params;
  Category.findByIdAndRemove(categoryId)
    .then((result) => {
      if (!result) {
        const error = new Error('Category does not exist');
        error.statusCode = 400;
        throw error;
      }
      res.status(200).json({ message: 'Category Deleted Successfully' });
    })
    .catch((error) => {
      errorThrower(error, next);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find().lean()
    .then((products) => {
      console.log(products);
      if (!products) {
        const error = new Error('No Content');
        error.statusCode = 204;
        throw error;
      }
      res.status(200).json(products);
    })
    .catch((error) => {
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
  product.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((error) => {
      errorThrower(error, next);
    });
};

exports.getSingleProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findById(productId).lean()
    .then((product) => {
      noProductFoundError(product);
      res.status(200).json(product);
    })
    .catch((error) => {
      errorThrower(error, next);
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findByIdAndRemove(productId)
    .then((result) => {
      if (!result) {
        const error = new Error('Product does not exist');
        error.statusCode = 400;
        throw error;
      }
      res.status(200).json({ message: 'Product Deleted Successfully' });
    })
    .catch((error) => {
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
  Product.findById(productId)
    .then((product) => {
      noProductFoundError(product);
      product.name = name;
      product.categories = categories;
      product.availableQuantity = availableQuantity;
      product.price = price;
      product.description = description;
      product.variations = variations;
      product.thumbnailUrls = thumbnailUrls;
      return product.save();
    })
    .then((updatedProduct) => {
      res.status(200).json({ message: 'Product Updated', updatedProduct });
    })
    .catch((error) => {
      errorThrower(error, next);
    });
};
