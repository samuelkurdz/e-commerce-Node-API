const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  // minimal validation in place
  // will look into it later
  [
    body('name').trim().not().isEmpty(),
  ],
  adminController.postAddProduct,
);

router.get('/edit-product/:productId', adminController.getSingleProduct);

// /admin/update-product => PUT
// remember to implement validation here too
router.put('/edit-product/:productId', adminController.postEditProduct);

// /admin/delete-product => DELETE
router.delete('/delete-product/:productId', adminController.postDeleteProduct);

module.exports = router;
