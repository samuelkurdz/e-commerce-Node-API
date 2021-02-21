const express = require('express');
const { body } = require('express-validator');

const shopController = require('../controllers/shop');
const orderController = require('../controllers/order');

const router = express.Router();
const isAuthWare = require('../middlewares/is-auth');

// /products => GET
router.get('/products', shopController.getProducts);

// /products/ single product id => GET
router.get('/products/:productId', shopController.getSingleProduct);

router.get('/cart', isAuthWare, shopController.getCart);

router.put(
  '/cart',
  isAuthWare,
  [
    body('productId').trim().not().isEmpty(),
  ],
  shopController.addProductToCart,
);

router.delete('/cart/:productId', isAuthWare, shopController.deleteCartProduct);

router.post(
  '/create-order',
  isAuthWare,
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
router.get('/orders', isAuthWare, orderController.getOrders);

// i think orders (postOrder) should be created after checking out
router.get('/checkout', orderController.getCheckout);

module.exports = router;
