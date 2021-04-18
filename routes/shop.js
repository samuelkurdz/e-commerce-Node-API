const express = require('express');
const { body } = require('express-validator');

const productsController = require('../controllers/shop');
const orderController = require('../controllers/order');

const router = express.Router();
const isUserAuthWare = require('../middlewares/user-auth');

// /products => GET
router.get('/products', productsController.getProducts);

// /products/ single product id => GET
router.get('/products/:productId', productsController.getSingleProduct);

router.get('/cart', isUserAuthWare, productsController.getCart);

// add single product to cart => PUT
router.put(
  '/cart',
  isUserAuthWare,
  [
    body('productId').trim().not().isEmpty(),
  ],
  productsController.addProductToCart,
);

// remove single product from cart => DELETE
router.delete('/cart/:productId', isUserAuthWare, productsController.deleteCartProduct);

router.post(
  '/create-order',
  isUserAuthWare,
  [
    body('name').trim().not().isEmpty(),
    body('products').trim()
      .isLength({ min: 1 })
      .withMessage('You cannot make an order of empty products'),
    // body('email').isEmail().withMessage('Please enter a valid email address')
    //   // eslint-disable-next-line arrow-body-style
    //   .custom((value) => {
    //     return User.findOne({ email: value }).then((userDocument) => {
    //       if (userDocument) {
    //         // eslint-disable-next-line prefer-promise-reject-errors
    //         return Promise.reject('Email address already exist');
    //       }
    //       return true;
    //     });
    //   })
    //   .normalizeEmail(),
  ],
  orderController.createOrder,
);

// get only orders created by the loggedIn user
router.get('/orders', isUserAuthWare, orderController.getOrders);

// i think orders (postOrder) should be created after checking out
router.get('/checkout', orderController.getCheckout);

module.exports = router;
