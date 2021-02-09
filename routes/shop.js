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
  // [
  //   body('productId').trim().not().isEmpty(),
  // ],
  orderController.createOrder,
);

// get only orders created by the loggedIn user
// router.get('/orders', isAuthWare, shopController.getOrders);

// i think orders (postOrder) should be created after checking out
// router.get('/checkout', shopController.getCheckout);

module.exports = router;
