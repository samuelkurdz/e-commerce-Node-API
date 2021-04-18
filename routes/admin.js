const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAdminAuthWare = require('../middlewares/is-admin-auth');

const Category = require('../models/category');

const router = express.Router();

// /admin/categories => GET (get all categories)
router.get('/categories', isAdminAuthWare, adminController.getCategories);
// /admin/categories => POST (new category)
router.post('/categories', [
  isAdminAuthWare,
  body('name')
    .custom((value) => Category.findOne({ name: value }).then((existingCategory) => {
      if (existingCategory) {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('Category already exist');
      }
      return true;
    })),
], adminController.createCategory);
// /admin/categories/categoryId => DELETE (remove existing category)
router.delete('/categories/:categoryId', isAdminAuthWare, adminController.deleteCategory);

// /admin/products => GET
router.get('/products', isAdminAuthWare, adminController.getProducts);
// /admin/add-product => POST
router.post(
  '/add-product',
  // minimal validation in place
  // will look into it later
  [
    // isAdminAuthWare,
    body('name').trim().not().isEmpty(),
  ],
  adminController.postAddProduct,
);

router.get('/edit-product/:productId', isAdminAuthWare, adminController.getSingleProduct);

// /admin/update-product => PUT
// remember to implement validation here too
router.put('/edit-product/:productId', isAdminAuthWare, adminController.postEditProduct);

// /admin/delete-product => DELETE
router.delete('/delete-product/:productId', isAdminAuthWare, adminController.postDeleteProduct);

//  get all orders
// router.get('/orders', shopController.getOrders);

//  edit orders statuses
// router.put('/orders', shopController.getOrders);

module.exports = router;
