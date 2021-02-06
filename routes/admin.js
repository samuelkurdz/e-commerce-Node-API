const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/products => GET
router.get('/products', adminController.getProducts);

// // /admin/add-product => POST
router.post(
  '/add-product',
  // minimal validation in place
  // will look into it later
  [
    body('name').trim().not().isEmpty(),
  ],
  adminController.postAddProduct,
);

router.get('/edit-product/:productId', adminController.getProduct);
// //
// router.post('/edit-product', adminController.postEditProduct);
// //
// router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;
