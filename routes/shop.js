const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();
const isAuthWare = require('../middlewares/is-auth');

// /products => GET
router.get('/products', shopController.getProducts);

// /products/ single product id => GET
router.get('/products/:productId', shopController.getSingleProduct);

router.get('/cart', isAuthWare, shopController.getCart);

router.put('/cart', isAuthWare, shopController.addProductToCart);

router.delete('/cart/:productId', isAuthWare, shopController.deleteCartProduct);

// router.post('/create-order', shopController.postOrder);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
